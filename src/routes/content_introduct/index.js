/**
 * @swagger
 * tags:
 *   name: Content Introduct
 *   description: Quản lý nội dung giới thiệu
 */

"use strict";

const express = require("express");
const contentIntroductController = require("../../controllers/content_introduct.controller");
const router = express.Router();

/**
 * @swagger
 * /content-introduct/get-all:
 *   get:
 *     summary: Lấy tất cả nội dung giới thiệu
 *     tags: [Content Introduct]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get(
  "/content-introduct/get-all",
  contentIntroductController.getAllContentIntroducts
);

/**
 * @swagger
 * /content-introduct/get-list:
 *   get:
 *     summary: Lấy danh sách nội dung có phân trang
 *     tags: [Content Introduct]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get(
  "/content-introduct/get-list",
  contentIntroductController.getListContentIntroducts
);

/**
 * @swagger
 * /content-introduct/get-select:
 *   get:
 *     summary: Lấy danh sách nội dung cho dropdown
 *     tags: [Content Introduct]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/content-introduct/get-select",
  contentIntroductController.getSelectContentIntroducts
);

/**
 * @swagger
 * /content-introduct/home:
 *   get:
 *     summary: Lấy nội dung cho trang chủ
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: query
 *         name: codes
 *         schema:
 *           type: string
 *         description: Danh sách code cách nhau bởi dấu phẩy (ví dụ about-us,mission,vision)
 *     responses:
 *       200:
 *         description: Lấy nội dung trang chủ thành công
 */
router.get(
  "/content-introduct/home",
  contentIntroductController.getHomePageContents
);

/**
 * @swagger
 * /content-introduct/search:
 *   get:
 *     summary: Tìm kiếm nội dung nâng cao
 *     tags: [Content Introduct]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
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
 *         description: Tìm kiếm thành công
 */
router.get(
  "/content-introduct/search",
  contentIntroductController.searchContentIntroducts
);

/**
 * @swagger
 * /content-introduct/statistics:
 *   get:
 *     summary: Lấy thống kê nội dung
 *     tags: [Content Introduct]
 *     responses:
 *       200:
 *         description: Lấy thống kê thành công
 */
router.get(
  "/content-introduct/statistics",
  contentIntroductController.getContentStatistics
);

/**
 * @swagger
 * /content-introduct/code/{code}:
 *   get:
 *     summary: Lấy nội dung theo code
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         example: "about-us"
 *     responses:
 *       200:
 *         description: Lấy nội dung thành công
 *       404:
 *         description: Không tìm thấy nội dung
 */
router.get(
  "/content-introduct/code/:code",
  contentIntroductController.getContentByCode
);

/**
 * @swagger
 * /content-introduct/{id}:
 *   get:
 *     summary: Lấy nội dung theo ID
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get(
  "/content-introduct/:id",
  contentIntroductController.getContentIntroductById
);

/**
 * @swagger
 * /content-introduct:
 *   post:
 *     summary: Tạo nội dung giới thiệu mới
 *     tags: [Content Introduct]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               code:
 *                 type: string
 *                 example: "about-us"
 *               title:
 *                 type: string
 *                 example: "Giới thiệu về chúng tôi"
 *               content:
 *                 type: string
 *                 example: "<p>Nội dung giới thiệu...</p>"
 *     responses:
 *       201:
 *         description: Tạo mới thành công
 */
router.post(
  "/content-introduct",
  contentIntroductController.createContentIntroduct
);

/**
 * @swagger
 * /content-introduct/{id}:
 *   put:
 *     summary: Cập nhật nội dung
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put(
  "/content-introduct/:id",
  contentIntroductController.updateContentIntroduct
);

/**
 * @swagger
 * /content-introduct/code/{code}:
 *   put:
 *     summary: Cập nhật nội dung theo code
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       201:
 *         description: Tạo mới thành công (nếu chưa tồn tại)
 */
router.put(
  "/content-introduct/code/:code",
  contentIntroductController.updateContentByCode
);

/**
 * @swagger
 * /content-introduct/{id}/duplicate:
 *   post:
 *     summary: Nhân bản nội dung
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Nhân bản thành công
 */
router.post(
  "/content-introduct/:id/duplicate",
  contentIntroductController.duplicateContent
);

/**
 * @swagger
 * /content-introduct/{id}:
 *   delete:
 *     summary: Xóa nội dung
 *     tags: [Content Introduct]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete(
  "/content-introduct/:id",
  contentIntroductController.deleteContentIntroduct
);

/**
 * @swagger
 * /content-introduct:
 *   delete:
 *     summary: Xóa nhiều nội dung
 *     tags: [Content Introduct]
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
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete(
  "/content-introduct",
  contentIntroductController.deleteManyContentIntroducts
);

module.exports = router;
