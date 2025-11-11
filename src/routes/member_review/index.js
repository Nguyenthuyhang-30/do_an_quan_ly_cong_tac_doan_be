"use strict";

const express = require("express");
const router = express.Router();
const MemberReviewController = require("../../controllers/member_review.controller");

/**
 * @swagger
 * /member-review/get-all:
 *   get:
 *     summary: Lấy tất cả đánh giá đoàn viên
 *     tags: [Member Review]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/get-all",
  MemberReviewController.getAllMemberReviews
);

/**
 * @swagger
 * /member-review/get-list:
 *   get:
 *     summary: Lấy danh sách đánh giá với phân trang
 *     tags: [Member Review]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/search'
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: integer
 *         description: Lọc theo đoàn viên
 *       - in: query
 *         name: reviewType
 *         schema:
 *           type: string
 *         description: Lọc theo loại đánh giá
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/get-list",
  MemberReviewController.getListMemberReviews
);

/**
 * @swagger
 * /member-review/get-select:
 *   get:
 *     summary: Lấy danh sách đánh giá cho dropdown
 *     tags: [Member Review]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewSelectResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/get-select",
  MemberReviewController.getSelectMemberReviews
);

/**
 * @swagger
 * /member-review/search:
 *   get:
 *     summary: Tìm kiếm đánh giá nâng cao
 *     tags: [Member Review]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/search'
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: integer
 *         description: ID đoàn viên
 *       - in: query
 *         name: reviewType
 *         schema:
 *           type: string
 *         description: Loại đánh giá
 *       - in: query
 *         name: minPoint
 *         schema:
 *           type: integer
 *         description: Điểm tối thiểu
 *       - in: query
 *         name: maxPoint
 *         schema:
 *           type: integer
 *         description: Điểm tối đa
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Từ ngày
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Đến ngày
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/member-review/search", MemberReviewController.searchMemberReviews);

/**
 * @swagger
 * /member-review/statistics:
 *   get:
 *     summary: Lấy thống kê đánh giá
 *     tags: [Member Review]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewStatisticsResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/statistics",
  MemberReviewController.getMemberReviewStatistics
);

/**
 * @swagger
 * /member-review/member/{memberId}:
 *   get:
 *     summary: Lấy đánh giá của một đoàn viên
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đoàn viên
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewListResponse'
 *       404:
 *         $ref: '#/components/responses/MemberReviewNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/member/:memberId",
  MemberReviewController.getReviewsByMember
);

/**
 * @swagger
 * /member-review/member/{memberId}/total-points:
 *   get:
 *     summary: Lấy tổng điểm đánh giá của đoàn viên
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đoàn viên
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewTotalPointsResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/member/:memberId/total-points",
  MemberReviewController.getMemberTotalPoints
);

/**
 * @swagger
 * /member-review/member/{memberId}/history:
 *   get:
 *     summary: Lấy lịch sử đánh giá của đoàn viên
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đoàn viên
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Năm
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: Tháng (1-12)
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewHistoryResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/member/:memberId/history",
  MemberReviewController.getMemberReviewHistory
);

/**
 * @swagger
 * /member-review/type/{type}:
 *   get:
 *     summary: Lấy đánh giá theo loại
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Loại đánh giá (khen-thuong, ky-luat, thi-dua, etc.)
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/member-review/type/:type",
  MemberReviewController.getReviewsByType
);

/**
 * @swagger
 * /member-review/{id}:
 *   get:
 *     summary: Lấy thông tin đánh giá theo ID
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đánh giá
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewResponse'
 *       404:
 *         $ref: '#/components/responses/MemberReviewNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/member-review/:id", MemberReviewController.getMemberReviewById);

/**
 * @swagger
 * /member-review:
 *   post:
 *     summary: Tạo đánh giá mới
 *     tags: [Member Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberReviewInput'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/MemberReviewCreatedResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/member-review", MemberReviewController.createMemberReview);

/**
 * @swagger
 * /member-review/batch:
 *   post:
 *     summary: Tạo nhiều đánh giá cùng lúc
 *     tags: [Member Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberReviewBatchInput'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/MemberReviewBatchCreatedResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/member-review/batch", MemberReviewController.batchCreateReviews);

/**
 * @swagger
 * /member-review/{id}:
 *   put:
 *     summary: Cập nhật đánh giá
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đánh giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberReviewInput'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewUpdatedResponse'
 *       404:
 *         $ref: '#/components/responses/MemberReviewNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put("/member-review/:id", MemberReviewController.updateMemberReview);

/**
 * @swagger
 * /member-review/{id}/point:
 *   put:
 *     summary: Cập nhật điểm đánh giá
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đánh giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - point
 *             properties:
 *               point:
 *                 type: integer
 *                 description: Điểm mới
 *                 example: 10
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewUpdatedResponse'
 *       404:
 *         $ref: '#/components/responses/MemberReviewNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
  "/member-review/:id/point",
  MemberReviewController.updateReviewPoint
);

/**
 * @swagger
 * /member-review/{id}:
 *   delete:
 *     summary: Xóa đánh giá
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đánh giá
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewDeletedResponse'
 *       404:
 *         $ref: '#/components/responses/MemberReviewNotFoundResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/member-review/:id", MemberReviewController.deleteMemberReview);

/**
 * @swagger
 * /member-review:
 *   delete:
 *     summary: Xóa nhiều đánh giá
 *     tags: [Member Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Mảng ID các đánh giá cần xóa
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewDeletedResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete("/member-review", MemberReviewController.deleteManyMemberReviews);

/**
 * @swagger
 * /member-review/member/{memberId}:
 *   delete:
 *     summary: Xóa tất cả đánh giá của đoàn viên
 *     tags: [Member Review]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID đoàn viên
 *     responses:
 *       200:
 *         $ref: '#/components/responses/MemberReviewDeletedResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete(
  "/member-review/member/:memberId",
  MemberReviewController.deleteReviewsByMember
);

module.exports = router;
