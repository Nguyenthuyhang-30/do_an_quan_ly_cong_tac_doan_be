/**
 * @swagger
 * tags:
 *   name: Slider Banner
 *   description: Quản lý Slider/Banner trang chủ
 */

"use strict";

const express = require("express");
const sliderBannerController = require("../../controllers/slider_banner.controller");
const router = express.Router();

/**
 * @swagger
 * /slider-banner/get-all:
 *   get:
 *     summary: Lấy tất cả slider/banner
 *     tags: [Slider Banner]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *       500:
 *         $ref: '#/components/responses/500'
 */
router.get(
  "/slider-banner/get-all",
  sliderBannerController.getAllSliderBanners
);

/**
 * @swagger
 * /slider-banner/get-list:
 *   get:
 *     summary: Lấy danh sách slider/banner có phân trang
 *     tags: [Slider Banner]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get(
  "/slider-banner/get-list",
  sliderBannerController.getListSliderBanners
);

/**
 * @swagger
 * /slider-banner/get-select:
 *   get:
 *     summary: Lấy danh sách slider/banner cho dropdown
 *     tags: [Slider Banner]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/slider-banner/get-select",
  sliderBannerController.getSelectSliderBanners
);

/**
 * @swagger
 * /slider-banner/home:
 *   get:
 *     summary: Lấy slider cho trang chủ
 *     tags: [Slider Banner]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Số lượng slider tối đa
 *     responses:
 *       200:
 *         description: Lấy danh sách slider trang chủ thành công
 */
router.get(
  "/slider-banner/home",
  sliderBannerController.getActiveSlidersForHome
);

/**
 * @swagger
 * /slider-banner/search:
 *   get:
 *     summary: Tìm kiếm slider/banner nâng cao
 *     tags: [Slider Banner]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - in: query
 *         name: hasImage
 *         schema:
 *           type: boolean
 *         description: Lọc theo có hình ảnh hay không
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
router.get("/slider-banner/search", sliderBannerController.searchSliderBanners);

/**
 * @swagger
 * /slider-banner/statistics:
 *   get:
 *     summary: Lấy thống kê slider/banner
 *     tags: [Slider Banner]
 *     responses:
 *       200:
 *         description: Lấy thống kê thành công
 */
router.get(
  "/slider-banner/statistics",
  sliderBannerController.getSliderBannerStatistics
);

/**
 * @swagger
 * /slider-banner/{id}:
 *   get:
 *     summary: Lấy slider/banner theo ID
 *     tags: [Slider Banner]
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
router.get("/slider-banner/:id", sliderBannerController.getSliderBannerById);

/**
 * @swagger
 * /slider-banner:
 *   post:
 *     summary: Tạo slider/banner mới
 *     tags: [Slider Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SLIDER_001"
 *               name:
 *                 type: string
 *                 example: "Banner chào mừng"
 *               image:
 *                 type: string
 *                 example: "https://cdn.example.com/banner.jpg"
 *     responses:
 *       201:
 *         description: Tạo mới thành công
 */
router.post("/slider-banner", sliderBannerController.createSliderBanner);

/**
 * @swagger
 * /slider-banner/{id}:
 *   put:
 *     summary: Cập nhật slider/banner
 *     tags: [Slider Banner]
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
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/slider-banner/:id", sliderBannerController.updateSliderBanner);

/**
 * @swagger
 * /slider-banner/{id}/image:
 *   put:
 *     summary: Cập nhật hình ảnh slider/banner
 *     tags: [Slider Banner]
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
 *             required:
 *               - imageUrl
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://cdn.example.com/new-banner.jpg"
 *     responses:
 *       200:
 *         description: Cập nhật hình ảnh thành công
 */
router.put(
  "/slider-banner/:id/image",
  sliderBannerController.updateSliderImage
);

/**
 * @swagger
 * /slider-banner/order:
 *   put:
 *     summary: Cập nhật thứ tự slider/banner
 *     tags: [Slider Banner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderData
 *             properties:
 *               orderData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     order:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thứ tự thành công
 */
router.put("/slider-banner/order", sliderBannerController.updateSliderOrder);

/**
 * @swagger
 * /slider-banner/{id}:
 *   delete:
 *     summary: Xóa slider/banner
 *     tags: [Slider Banner]
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
router.delete("/slider-banner/:id", sliderBannerController.deleteSliderBanner);

/**
 * @swagger
 * /slider-banner:
 *   delete:
 *     summary: Xóa nhiều slider/banner
 *     tags: [Slider Banner]
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
router.delete("/slider-banner", sliderBannerController.deleteManySliderBanners);

module.exports = router;
