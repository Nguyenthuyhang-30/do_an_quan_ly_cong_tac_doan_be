/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API xác thực và phân quyền
 */

/**
 * @swagger
 * /access/signup:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     description: Tạo tài khoản mới với email, password và thông tin cá nhân
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/SignUpSuccess'
 *       400:
 *         $ref: '#/components/responses/AuthBadRequest'
 */

/**
 * @swagger
 * /access/signin:
 *   post:
 *     summary: Đăng nhập
 *     description: Đăng nhập với email và password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SignInSuccess'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 */

/**
 * @swagger
 * /access/signout:
 *   post:
 *     summary: Đăng xuất
 *     description: Đăng xuất người dùng hiện tại
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SignOutSuccess'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 */

/**
 * @swagger
 * /access/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Lấy access token mới dựa trên refresh token hợp lệ
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RefreshTokenSuccess'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 */

"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { authenticate } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post("/access/signup", accessController.signUp);
router.post("/access/signin", accessController.signIn);
router.post("/access/signout", authenticate, accessController.signOut);
router.post("/access/refresh", accessController.refreshToken);

module.exports = router;
