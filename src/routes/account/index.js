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

/**
 * @swagger
 * /account/profile:
 *   get:
 *     summary: Lấy profile của tài khoản hiện tại
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetProfileSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.get("/account/profile", accountController.getProfile);

/**
 * @swagger
 * /account/{memberId}/profile:
 *   get:
 *     summary: Lấy profile theo ID (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetProfileSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.get("/account/:memberId/profile", accountController.getProfile);

/**
 * @swagger
 * /account/profile:
 *   put:
 *     summary: Cập nhật profile
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateProfileSuccess'
 *       400:
 *         $ref: '#/components/responses/AccountBadRequest'
 */
router.put("/account/profile", accountController.updateProfile);

/**
 * @swagger
 * /account/{memberId}/profile:
 *   put:
 *     summary: Cập nhật profile (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateProfileSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.put("/account/:memberId/profile", accountController.updateProfile);

/**
 * @swagger
 * /account/change-password:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ChangePasswordSuccess'
 *       400:
 *         $ref: '#/components/responses/InvalidOldPassword'
 */
router.post("/account/change-password", accountController.changePassword);

/**
 * @swagger
 * /account/{memberId}/change-password:
 *   post:
 *     summary: Đổi mật khẩu (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ChangePasswordSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.post(
  "/account/:memberId/change-password",
  accountController.changePassword
);

/**
 * @swagger
 * /account/{memberId}/reset-password:
 *   post:
 *     summary: Reset mật khẩu (admin only)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ResetPasswordSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.post(
  "/account/:memberId/reset-password",
  accountController.resetPassword
);

/**
 * @swagger
 * /account/avatar:
 *   put:
 *     summary: Cập nhật avatar
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAvatarRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateAvatarSuccess'
 */
router.put("/account/avatar", accountController.updateAvatar);

/**
 * @swagger
 * /account/{memberId}/avatar:
 *   put:
 *     summary: Cập nhật avatar (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAvatarRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateAvatarSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.put("/account/:memberId/avatar", accountController.updateAvatar);

/**
 * @swagger
 * /account/email:
 *   put:
 *     summary: Cập nhật email
 *     tags: [Account Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmailRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateEmailSuccess'
 *       409:
 *         $ref: '#/components/responses/EmailAlreadyExists'
 */
router.put("/account/email", accountController.updateEmail);

/**
 * @swagger
 * /account/{memberId}/email:
 *   put:
 *     summary: Cập nhật email (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmailRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateEmailSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 *       409:
 *         $ref: '#/components/responses/EmailAlreadyExists'
 */
router.put("/account/:memberId/email", accountController.updateEmail);

/**
 * @swagger
 * /account/confirm-email:
 *   post:
 *     summary: Xác nhận email
 *     tags: [Account Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmEmailRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ConfirmEmailSuccess'
 *       400:
 *         $ref: '#/components/responses/InvalidConfirmationToken'
 */
router.post("/account/confirm-email", accountController.confirmEmail);

/**
 * @swagger
 * /account/{memberId}/confirm-email:
 *   post:
 *     summary: Xác nhận email (admin)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmEmailRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ConfirmEmailSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.post("/account/:memberId/confirm-email", accountController.confirmEmail);

/**
 * @swagger
 * /account/{memberId}/deactivate:
 *   post:
 *     summary: Vô hiệu hóa tài khoản (admin only)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/DeactivateAccountSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.post(
  "/account/:memberId/deactivate",
  accountController.deactivateAccount
);

/**
 * @swagger
 * /account/{memberId}/activate:
 *   post:
 *     summary: Kích hoạt tài khoản (admin only)
 *     tags: [Account Management]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivateAccountSuccess'
 *       404:
 *         $ref: '#/components/responses/AccountNotFound'
 */
router.post("/account/:memberId/activate", accountController.activateAccount);

module.exports = router;
