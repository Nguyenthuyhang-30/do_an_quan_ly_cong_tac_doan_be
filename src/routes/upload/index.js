"use strict";

const express = require("express");
const router = express.Router();
const uploadController = require("../../controllers/upload.controller");
const {
  uploadSingle,
  uploadMultiple,
  handleUploadError,
} = require("../../middlewares/upload.middleware");
// const { authentication } = require("../../middlewares/auth.middleware"); // Uncomment nếu cần auth

/**
 * Upload Routes
 * Tất cả các API upload file
 */

/**
 * @swagger
 * /upload/single:
 *   post:
 *     summary: Upload single file
 *     tags: [Upload]
 *     description: Upload một file và lưu metadata vào database
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               memberId:
 *                 type: integer
 *                 description: ID đoàn viên
 *               branchId:
 *                 type: integer
 *                 description: ID chi đoàn
 *               description:
 *                 type: string
 *                 description: Mô tả file
 *               folder:
 *                 type: string
 *                 description: Tên folder (general, documents, reports, avatars, etc)
 *                 default: general
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 */
router.post(
  "/upload/single",
  uploadSingle,
  handleUploadError,
  uploadController.uploadSingleFile
);

/**
 * @swagger
 * /upload/multiple:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     description: Upload nhiều files cùng lúc (max 10 files)
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of files to upload (max 10)
 *               memberId:
 *                 type: integer
 *               branchId:
 *                 type: integer
 *               folder:
 *                 type: string
 *                 default: general
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 */
router.post(
  "/upload/multiple",
  uploadMultiple,
  handleUploadError,
  uploadController.uploadMultipleFiles
);

/**
 * @swagger
 * /upload/avatar:
 *   post:
 *     summary: Upload avatar image
 *     tags: [Upload]
 *     description: Upload avatar cho đoàn viên (lưu vào folder avatars)
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - memberId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Avatar image file
 *               memberId:
 *                 type: integer
 *                 description: ID đoàn viên (required)
 */
router.post(
  "/upload/avatar",
  uploadSingle,
  handleUploadError,
  uploadController.uploadAvatar
);

/**
 * @swagger
 * /upload/statistics:
 *   get:
 *     summary: Get upload statistics
 *     tags: [Upload]
 *     description: Lấy thống kê về files đã upload
 */
router.get("/upload/statistics", uploadController.getUploadStatistics);

/**
 * @swagger
 * /upload/{id}:
 *   delete:
 *     summary: Delete uploaded file
 *     tags: [Upload]
 *     description: Xóa file (cả storage và database record)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/upload/:id", uploadController.deleteFile);

module.exports = router;
