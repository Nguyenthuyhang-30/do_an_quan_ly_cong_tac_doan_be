"use strict";

const db = require("../models");
const Key = db.Key;
const MemberToken = db.MemberToken;
const crypto = require("crypto");

/**
 * KeyTokenService - Quản lý keys và tokens cho authentication
 * Sử dụng PostgreSQL models: keys và member_tokens
 */
class KeyTokenService {
  /**
   * Tạo key token cho member (JWT refresh token)
   * @param {Object} params
   * @param {number} params.memberId - ID của youth_union_member
   * @param {string} params.token - JWT refresh token
   * @param {Date} params.expires - Thời gian hết hạn
   * @returns {Promise<Object>}
   */
  static createKeyToken = async ({ memberId, token, expires }) => {
    try {
      // Revoke các token cũ của member này
      await Key.update(
        { is_revoke: true, is_active: false },
        { where: { member_id: memberId, is_revoke: false } }
      );

      // Tạo token mới
      const keyToken = await Key.create({
        member_id: memberId,
        token: token,
        is_revoke: false,
        is_use: false,
        is_active: true,
        expires: expires,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return keyToken ? keyToken : null;
    } catch (error) {
      console.error("Error creating key token:", error);
      throw error;
    }
  };

  /**
   * Tạo member token (access token, refresh token storage)
   * @param {Object} params
   * @param {number} params.memberId
   * @param {string} params.name - Tên token (e.g., "access_token", "refresh_token")
   * @param {string} params.loginProvider - Provider (e.g., "local", "google", "facebook")
   * @param {string} params.value - Giá trị token
   * @returns {Promise<Object>}
   */
  static createMemberToken = async ({
    memberId,
    name,
    loginProvider = "local",
    value,
  }) => {
    try {
      // Xóa token cũ cùng type
      await MemberToken.destroy({
        where: { member_id: memberId, name: name },
      });

      // Tạo token mới
      const memberToken = await MemberToken.create({
        member_id: memberId,
        name: name,
        login_provider: loginProvider,
        value: value,
        modified_at: new Date(),
      });

      return memberToken;
    } catch (error) {
      console.error("Error creating member token:", error);
      throw error;
    }
  };

  /**
   * Tìm key token theo token string
   * @param {string} token
   * @returns {Promise<Object|null>}
   */
  static findByToken = async (token) => {
    try {
      const keyToken = await Key.findOne({
        where: {
          token: token,
          is_revoke: false,
          is_active: true,
        },
      });

      return keyToken;
    } catch (error) {
      console.error("Error finding token:", error);
      return null;
    }
  };

  /**
   * Đánh dấu token đã được sử dụng
   * @param {number} id - ID của key
   * @returns {Promise<boolean>}
   */
  static markTokenAsUsed = async (id) => {
    try {
      await Key.update({ is_use: true }, { where: { id: id } });
      return true;
    } catch (error) {
      console.error("Error marking token as used:", error);
      return false;
    }
  };

  /**
   * Revoke token
   * @param {number} id - ID của key
   * @returns {Promise<boolean>}
   */
  static revokeToken = async (id) => {
    try {
      await Key.update(
        { is_revoke: true, is_active: false, updated_at: new Date() },
        { where: { id: id } }
      );
      return true;
    } catch (error) {
      console.error("Error revoking token:", error);
      return false;
    }
  };

  /**
   * Revoke tất cả tokens của member
   * @param {number} memberId
   * @returns {Promise<number>} - Số lượng tokens đã revoke
   */
  static revokeAllTokensByMember = async (memberId) => {
    try {
      const result = await Key.update(
        { is_revoke: true, is_active: false, updated_at: new Date() },
        { where: { member_id: memberId, is_revoke: false } }
      );

      return result[0]; // Số dòng đã update
    } catch (error) {
      console.error("Error revoking all tokens:", error);
      return 0;
    }
  };

  /**
   * Lấy member token theo name
   * @param {number} memberId
   * @param {string} name
   * @returns {Promise<Object|null>}
   */
  static getMemberToken = async (memberId, name) => {
    try {
      const memberToken = await MemberToken.findOne({
        where: { member_id: memberId, name: name },
      });

      return memberToken;
    } catch (error) {
      console.error("Error getting member token:", error);
      return null;
    }
  };

  /**
   * Xóa member token
   * @param {number} memberId
   * @param {string} name
   * @returns {Promise<boolean>}
   */
  static deleteMemberToken = async (memberId, name) => {
    try {
      await MemberToken.destroy({
        where: { member_id: memberId, name: name },
      });
      return true;
    } catch (error) {
      console.error("Error deleting member token:", error);
      return false;
    }
  };
}

module.exports = KeyTokenService;
