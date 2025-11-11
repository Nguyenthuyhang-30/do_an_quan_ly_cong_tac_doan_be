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
 *             $ref: '#/components/schemas/TransferMemberRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TransferMemberSuccess'
 *       400:
 *         $ref: '#/components/responses/TransferBadRequest'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
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
 *         $ref: '#/components/responses/GetTransferHistorySuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
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
 *         $ref: '#/components/responses/GetCurrentBranchSuccess'
 *       404:
 *         $ref: '#/components/responses/NoCurrentTransfer'
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
 *             $ref: '#/components/schemas/EndTransferRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EndTransferSuccess'
 *       404:
 *         $ref: '#/components/responses/NoCurrentTransfer'
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTransferRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateTransferSuccess'
 *       404:
 *         $ref: '#/components/responses/TransferNotFound'
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
 *         $ref: '#/components/responses/SearchTransfersSuccess'
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
 *         $ref: '#/components/responses/GetTransferStatisticsSuccess'
 */
router.get("/transfer/statistics", transferController.getTransferStatistics);

module.exports = router;
