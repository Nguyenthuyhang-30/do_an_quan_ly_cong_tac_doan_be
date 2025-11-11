/**
 * @swagger
 * tags:
 *   name: Account Management
 *   description: Quản lý tài khoản cá nhân
 */

"use strict";

const express = require("express");
const accountController = require("../../controllers/account.controller");
const router = express.Router();

// Lấy profile
router.get("/account/profile", accountController.getProfile);
router.get("/account/:memberId/profile", accountController.getProfile);

// Cập nhật profile
router.put("/account/profile", accountController.updateProfile);
router.put("/account/:memberId/profile", accountController.updateProfile);

// Đổi mật khẩu
router.post("/account/change-password", accountController.changePassword);
router.post(
  "/account/:memberId/change-password",
  accountController.changePassword
);

// Reset mật khẩu (admin)
router.post(
  "/account/:memberId/reset-password",
  accountController.resetPassword
);

// Cập nhật avatar
router.put("/account/avatar", accountController.updateAvatar);
router.put("/account/:memberId/avatar", accountController.updateAvatar);

// Cập nhật email
router.put("/account/email", accountController.updateEmail);
router.put("/account/:memberId/email", accountController.updateEmail);

// Xác nhận email
router.post("/account/confirm-email", accountController.confirmEmail);
router.post("/account/:memberId/confirm-email", accountController.confirmEmail);

// Vô hiệu hóa/Kích hoạt tài khoản
router.post(
  "/account/:memberId/deactivate",
  accountController.deactivateAccount
);
router.post("/account/:memberId/activate", accountController.activateAccount);

module.exports = router;
