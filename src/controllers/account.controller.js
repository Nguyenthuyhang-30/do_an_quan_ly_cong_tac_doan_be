"use strict";

const AccountManagementService = require("../services/account.service");

class AccountManagementController {
  // Đổi mật khẩu
  changePassword = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId; // Từ middleware auth hoặc param
      const { oldPassword, newPassword } = req.body;

      const result = await AccountManagementService.changePassword(
        memberId,
        oldPassword,
        newPassword
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Reset mật khẩu (admin only)
  resetPassword = async (req, res) => {
    try {
      const { memberId } = req.params;
      const { newPassword } = req.body;

      const result = await AccountManagementService.resetPassword(
        memberId,
        newPassword
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Cập nhật thông tin cá nhân
  updateProfile = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId;
      const result = await AccountManagementService.updateProfile(
        memberId,
        req.body
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy thông tin profile
  getProfile = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId;
      const result = await AccountManagementService.getProfile(memberId);

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Cập nhật avatar
  updateAvatar = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId;
      const { avatarUrl } = req.body;

      const result = await AccountManagementService.updateAvatar(
        memberId,
        avatarUrl
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Xác nhận email
  confirmEmail = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId;
      const result = await AccountManagementService.confirmEmail(memberId);

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Cập nhật email
  updateEmail = async (req, res) => {
    try {
      const memberId = req.user?.id || req.params.memberId;
      const { newEmail } = req.body;

      const result = await AccountManagementService.updateEmail(
        memberId,
        newEmail
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Vô hiệu hóa tài khoản
  deactivateAccount = async (req, res) => {
    try {
      const { memberId } = req.params;
      const result = await AccountManagementService.deactivateAccount(memberId);

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Kích hoạt tài khoản
  activateAccount = async (req, res) => {
    try {
      const { memberId } = req.params;
      const result = await AccountManagementService.activateAccount(memberId);

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
}

module.exports = new AccountManagementController();
