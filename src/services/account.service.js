"use strict";

const db = require("../models");
const bcrypt = require("bcrypt");
const YouthUnionMember = db.YouthUnionMember;

/**
 * AccountManagementService - Service quản lý tài khoản
 * Tách biệt với Member để quản lý authentication và profile cá nhân
 */
class AccountManagementService {
  /**
   * Đổi mật khẩu
   * @param {number} memberId - ID đoàn viên
   * @param {string} oldPassword - Mật khẩu cũ
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<Object>}
   */
  static changePassword = async (memberId, oldPassword, newPassword) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      // Kiểm tra mật khẩu cũ
      const isValidPassword = await bcrypt.compare(
        oldPassword,
        member.password_hash
      );

      if (!isValidPassword) {
        return {
          code: 400,
          success: false,
          message: "Mật khẩu cũ không đúng",
          data: null,
        };
      }

      // Hash mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Cập nhật mật khẩu
      await member.update({
        password_hash: hashedPassword,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Đổi mật khẩu thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi đổi mật khẩu: ${error.message}`);
    }
  };

  /**
   * Reset mật khẩu (bởi admin)
   * @param {number} memberId - ID đoàn viên
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<Object>}
   */
  static resetPassword = async (memberId, newPassword) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      // Hash mật khẩu mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Cập nhật mật khẩu
      await member.update({
        password_hash: hashedPassword,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Reset mật khẩu thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi reset mật khẩu: ${error.message}`);
    }
  };

  /**
   * Cập nhật thông tin cá nhân (profile)
   * @param {number} memberId - ID đoàn viên
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise<Object>}
   */
  static updateProfile = async (memberId, data) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      // Chỉ cho phép cập nhật một số trường cụ thể
      const allowedFields = [
        "full_name",
        "phone_number",
        "address",
        "avatar_url",
        "facebook_url",
        "zalo",
        "date_of_birth",
        "gender",
      ];

      const updateData = {};
      for (const field of allowedFields) {
        if (data[field] !== undefined) {
          updateData[field] = data[field];
        }
      }

      updateData.modified_at = new Date();

      await member.update(updateData);

      // Trả về thông tin đã cập nhật (không bao gồm password)
      const updatedMember = await YouthUnionMember.findByPk(memberId, {
        attributes: { exclude: ["password_hash"] },
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật thông tin cá nhân thành công",
        data: updatedMember,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật thông tin cá nhân: ${error.message}`);
    }
  };

  /**
   * Lấy thông tin profile
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static getProfile = async (memberId) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId, {
        attributes: { exclude: ["password_hash"] },
        include: [
          {
            model: db.MemberRole,
            as: "roles",
            include: [
              {
                model: db.Role,
                as: "role",
                attributes: ["id", "name", "description"],
              },
            ],
          },
          {
            model: db.YouthUnionMemberBranchHistory,
            as: "branch_histories",
            where: { status: 1 },
            required: false,
            include: [
              {
                model: db.YouthUnionBranch,
                as: "branch",
                attributes: ["id", "code", "name"],
              },
            ],
          },
        ],
      });

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: "Lấy thông tin profile thành công",
        data: member,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin profile: ${error.message}`);
    }
  };

  /**
   * Cập nhật avatar
   * @param {number} memberId - ID đoàn viên
   * @param {string} avatarUrl - URL avatar mới
   * @returns {Promise<Object>}
   */
  static updateAvatar = async (memberId, avatarUrl) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      await member.update({
        avatar_url: avatarUrl,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật avatar thành công",
        data: { avatar_url: avatarUrl },
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật avatar: ${error.message}`);
    }
  };

  /**
   * Xác nhận email
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static confirmEmail = async (memberId) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      if (member.is_email_confirmed) {
        return {
          code: 400,
          success: false,
          message: "Email đã được xác nhận rồi",
          data: null,
        };
      }

      await member.update({
        is_email_confirmed: true,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Xác nhận email thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi xác nhận email: ${error.message}`);
    }
  };

  /**
   * Cập nhật email
   * @param {number} memberId - ID đoàn viên
   * @param {string} newEmail - Email mới
   * @returns {Promise<Object>}
   */
  static updateEmail = async (memberId, newEmail) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      // Kiểm tra email đã tồn tại chưa
      const existingMember = await YouthUnionMember.findOne({
        where: { email: newEmail },
      });

      if (existingMember && existingMember.id !== memberId) {
        return {
          code: 400,
          success: false,
          message: "Email đã được sử dụng",
          data: null,
        };
      }

      await member.update({
        email: newEmail,
        is_email_confirmed: false, // Reset trạng thái xác nhận
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật email thành công. Vui lòng xác nhận email mới.",
        data: { email: newEmail },
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật email: ${error.message}`);
    }
  };

  /**
   * Vô hiệu hóa tài khoản
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static deactivateAccount = async (memberId) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      await member.update({
        status: 0, // Inactive
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Vô hiệu hóa tài khoản thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi vô hiệu hóa tài khoản: ${error.message}`);
    }
  };

  /**
   * Kích hoạt tài khoản
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static activateAccount = async (memberId) => {
    try {
      const member = await YouthUnionMember.findByPk(memberId);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy tài khoản",
          data: null,
        };
      }

      await member.update({
        status: 1, // Active
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Kích hoạt tài khoản thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi kích hoạt tài khoản: ${error.message}`);
    }
  };
}

module.exports = AccountManagementService;
