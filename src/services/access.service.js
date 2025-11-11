"use strict";

const db = require("../models");
const YouthUnionMember = db.YouthUnionMember;
const Role = db.Role;
const MemberRole = db.member_role;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const keyTokenService = require("./keyToken.service");

/**
 * AccessService - Xử lý authentication và authorization
 * Sử dụng PostgreSQL models: youth_union_members, roles, keys, member_tokens
 */

// Define member status (INTEGER trong database)
const MemberStatus = {
  INACTIVE: 0, // Chưa kích hoạt
  ACTIVE: 1, // Đang hoạt động
  SUSPENDED: 2, // Bị tạm khóa
  PENDING: 3, // Đang chờ duyệt
};

// Define default roles
const MemberRoles = {
  MEMBER: 1,
  ADMIN: 2,
  MODERATOR: 3,
  SECRETARY: 4,
};

class AccessService {
  /**
   * Đăng ký tài khoản mới
   * @param {Object} params
   * @param {string} params.email - Email
   * @param {string} params.password - Password
   * @param {string} params.userName - Username
   * @param {string} params.fullName - Họ và tên
   * @param {string} params.phoneNumber - Số điện thoại
   * @returns {Promise<Object>}
   */
  static signUp = async ({
    email,
    password,
    userName,
    fullName,
    phoneNumber,
  }) => {
    try {
      // Step 1: Kiểm tra email đã tồn tại
      const existingMember = await YouthUnionMember.findOne({
        where: { email: email },
        raw: true,
      });

      if (existingMember) {
        return {
          code: "4001",
          message: "Email đã được sử dụng",
          status: "error",
        };
      }

      // Kiểm tra username đã tồn tại
      if (userName) {
        const existingUserName = await YouthUnionMember.findOne({
          where: { user_name: userName },
          raw: true,
        });

        if (existingUserName) {
          return {
            code: "4002",
            message: "Username đã được sử dụng",
            status: "error",
          };
        }
      }

      // Step 2: Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Step 3: Tạo member mới
      const newMember = await YouthUnionMember.create({
        email: email,
        password_hash: passwordHash,
        user_name: userName,
        full_name: fullName,
        phone_number: phoneNumber,
        status: MemberStatus.PENDING,
        is_email_confirmed: false,
        join_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (newMember) {
        // Step 4: Tạo JWT tokens
        const accessToken = this.generateAccessToken(newMember.id, email);
        const refreshToken = this.generateRefreshToken(newMember.id, email);

        // Step 5: Lưu refresh token vào database
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 7); // 7 ngày

        await keyTokenService.createKeyToken({
          memberId: newMember.id,
          token: refreshToken,
          expires: expiresDate,
        });

        // Step 6: Lưu access token vào member_tokens
        await keyTokenService.createMemberToken({
          memberId: newMember.id,
          name: "access_token",
          loginProvider: "local",
          value: accessToken,
        });

        // Step 7: Assign default role (MEMBER role)
        await MemberRole.create({
          member_id: newMember.id,
          role_id: MemberRoles.MEMBER, // Default member role
          assigned_at: new Date(),
        });

        // Step 8: Fetch member với roles
        const memberWithRoles = await YouthUnionMember.findOne({
          where: { id: newMember.id },
          include: [
            {
              model: MemberRole,
              as: "roles",
              include: [
                {
                  model: Role,
                  as: "role",
                  attributes: ["id", "role_name", "role_description"],
                },
              ],
            },
          ],
        });

        // Step 9: Format roles data
        const roles = memberWithRoles.roles
          ? memberWithRoles.roles.map((memberRole) => ({
              id: memberRole.role?.id,
              roleName: memberRole.role?.role_name,
              roleDescription: memberRole.role?.role_description,
              assignedAt: memberRole.assigned_at,
            }))
          : [];

        // Step 10: Trả về response
        return {
          code: "0000",
          message: "Đăng ký thành công",
          status: "success",
          data: {
            member: {
              id: newMember.id,
              email: newMember.email,
              userName: newMember.user_name,
              fullName: newMember.full_name,
              status: newMember.status,
              roles: roles,
            },
            tokens: {
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          },
        };
      }
    } catch (error) {
      console.error("SignUp error:", error);
      return {
        code: "5000",
        message: error.message,
        status: "error",
      };
    }
  };

  /**
   * Đăng nhập
   * @param {Object} params
   * @param {string} params.email - Email
   * @param {string} params.password - Password
   * @returns {Promise<Object>}
   */
  static signIn = async ({ email, password }) => {
    try {
      // Step 1: Tìm member theo email và include roles
      const member = await YouthUnionMember.findOne({
        where: { email: email },
        include: [
          {
            model: MemberRole,
            as: "roles",
            include: [
              {
                model: Role,
                as: "role",
                attributes: ["id", "role_name", "role_description"],
              },
            ],
          },
        ],
      });

      if (!member) {
        return {
          code: "4003",
          message: "Email hoặc mật khẩu không đúng",
          status: "error",
        };
      }

      // Step 2: Kiểm tra trạng thái tài khoản
      if (member.status === MemberStatus.SUSPENDED) {
        return {
          code: "4004",
          message: "Tài khoản đã bị tạm khóa",
          status: "error",
        };
      }

      if (member.status === MemberStatus.INACTIVE) {
        return {
          code: "4005",
          message: "Tài khoản chưa được kích hoạt",
          status: "error",
        };
      }

      // Step 3: Kiểm tra password
      const isPasswordValid = await bcrypt.compare(
        password,
        member.password_hash
      );

      if (!isPasswordValid) {
        return {
          code: "4003",
          message: "Email hoặc mật khẩu không đúng",
          status: "error",
        };
      }

      // Step 4: Revoke các token cũ
      await keyTokenService.revokeAllTokensByMember(member.id);

      // Step 5: Tạo JWT tokens mới
      const accessToken = this.generateAccessToken(member.id, member.email);
      const refreshToken = this.generateRefreshToken(member.id, member.email);

      // Step 6: Lưu refresh token
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 7);

      await keyTokenService.createKeyToken({
        memberId: member.id,
        token: refreshToken,
        expires: expiresDate,
      });

      // Step 7: Lưu access token
      await keyTokenService.createMemberToken({
        memberId: member.id,
        name: "access_token",
        loginProvider: "local",
        value: accessToken,
      });

      // Step 8: Format roles data
      const roles = member.roles
        ? member.roles.map((memberRole) => ({
            id: memberRole.role?.id,
            roleName: memberRole.role?.role_name,
            roleDescription: memberRole.role?.role_description,
            assignedAt: memberRole.assigned_at,
          }))
        : [];

      // Step 9: Trả về response
      return {
        code: "0000",
        message: "Đăng nhập thành công",
        status: "success",
        data: {
          member: {
            id: member.id,
            email: member.email,
            userName: member.user_name,
            fullName: member.full_name,
            status: member.status,
            roles: roles,
          },
          tokens: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        },
      };
    } catch (error) {
      console.error("SignIn error:", error);
      return {
        code: "5000",
        message: error.message,
        status: "error",
      };
    }
  };

  /**
   * Đăng xuất
   * @param {number} memberId
   * @returns {Promise<Object>}
   */
  static signOut = async (memberId) => {
    try {
      // Revoke tất cả tokens của member
      await keyTokenService.revokeAllTokensByMember(memberId);

      // Xóa member tokens
      await keyTokenService.deleteMemberToken(memberId, "access_token");

      return {
        code: "0000",
        message: "Đăng xuất thành công",
        status: "success",
      };
    } catch (error) {
      console.error("SignOut error:", error);
      return {
        code: "5000",
        message: error.message,
        status: "error",
      };
    }
  };

  /**
   * Refresh access token
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   */
  static refreshToken = async (refreshToken) => {
    try {
      // Step 1: Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || "refresh_secret_key"
      );

      // Step 2: Tìm token trong database
      const keyToken = await keyTokenService.findByToken(refreshToken);

      if (!keyToken) {
        return {
          code: "4006",
          message: "Refresh token không hợp lệ hoặc đã hết hạn",
          status: "error",
        };
      }

      // Step 3: Kiểm tra token đã được sử dụng chưa
      if (keyToken.is_use) {
        return {
          code: "4007",
          message: "Refresh token đã được sử dụng",
          status: "error",
        };
      }

      // Step 4: Đánh dấu token đã sử dụng
      await keyTokenService.markTokenAsUsed(keyToken.id);

      // Step 5: Tạo tokens mới
      const newAccessToken = this.generateAccessToken(
        decoded.memberId,
        decoded.email
      );
      const newRefreshToken = this.generateRefreshToken(
        decoded.memberId,
        decoded.email
      );

      // Step 6: Lưu refresh token mới
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 7);

      await keyTokenService.createKeyToken({
        memberId: decoded.memberId,
        token: newRefreshToken,
        expires: expiresDate,
      });

      // Step 7: Lưu access token mới
      await keyTokenService.createMemberToken({
        memberId: decoded.memberId,
        name: "access_token",
        loginProvider: "local",
        value: newAccessToken,
      });

      return {
        code: "0000",
        message: "Refresh token thành công",
        status: "success",
        data: {
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        },
      };
    } catch (error) {
      console.error("RefreshToken error:", error);
      return {
        code: "4006",
        message: "Refresh token không hợp lệ",
        status: "error",
      };
    }
  };

  /**
   * Tạo access token
   * @param {number} memberId
   * @param {string} email
   * @returns {string}
   */
  static generateAccessToken(memberId, email) {
    return jwt.sign(
      { memberId, email },
      process.env.JWT_ACCESS_SECRET || "access_secret_key",
      { expiresIn: "15m" } // 15 phút
    );
  }

  /**
   * Tạo refresh token
   * @param {number} memberId
   * @param {string} email
   * @returns {string}
   */
  static generateRefreshToken(memberId, email) {
    return jwt.sign(
      { memberId, email },
      process.env.JWT_REFRESH_SECRET || "refresh_secret_key",
      { expiresIn: "7d" } // 7 ngày
    );
  }

  /**
   * Verify access token
   * @param {string} token
   * @returns {Object|null}
   */
  static verifyAccessToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || "access_secret_key"
      );
    } catch (error) {
      return null;
    }
  }
}

module.exports = AccessService;
