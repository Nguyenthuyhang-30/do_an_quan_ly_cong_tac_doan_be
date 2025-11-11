/**
 * @swagger
 * tags:
 *   name: Member Transfer
 *   description: Quản lý điều chuyển công tác
 */

"use strict";

const express = require("express");
const transferController = require("../../controllers/member_transfer.controller");
const router = express.Router();

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Điều chuyển đoàn viên
 *     tags: [Member Transfer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *               - branchId
 *             properties:
 *               memberId:
 *                 type: integer
 *               branchId:
 *                 type: integer
 *               position:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/transfer", transferController.transferMember);

/**
 * @swagger
 * /transfer/member/{memberId}:
 *   get:
 *     summary: Lấy lịch sử điều chuyển của đoàn viên
 *     tags: [Member Transfer]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/transfer/member/:memberId",
  transferController.getMemberTransferHistory
);

/**
 * @swagger
 * /transfer/member/{memberId}/current:
 *   get:
 *     summary: Lấy chi đoàn hiện tại của đoàn viên
 *     tags: [Member Transfer]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/transfer/member/:memberId/current",
  transferController.getCurrentBranch
);

/**
 * @swagger
 * /transfer/member/{memberId}/end:
 *   post:
 *     summary: Kết thúc điều chuyển hiện tại
 *     tags: [Member Transfer]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  "/transfer/member/:memberId/end",
  transferController.endCurrentTransfer
);

/**
 * @swagger
 * /transfer/{id}:
 *   put:
 *     summary: Cập nhật thông tin điều chuyển
 *     tags: [Member Transfer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/transfer/:id", transferController.updateTransferHistory);

/**
 * @swagger
 * /transfer/search:
 *   get:
 *     summary: Tìm kiếm điều chuyển theo thời gian
 *     tags: [Member Transfer]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/transfer/search", transferController.getTransfersByDateRange);

/**
 * @swagger
 * /transfer/statistics:
 *   get:
 *     summary: Thống kê điều chuyển
 *     tags: [Member Transfer]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/transfer/statistics", transferController.getTransferStatistics);

module.exports = router;
