/**
 * @swagger
 * tags:
 *   name: File Upload
 *   description: Quản lý file upload
 */

"use strict";

const express = require("express");
const fileUploadController = require("../../controllers/file_upload.controller");
const router = express.Router();

/**
 * @swagger
 * /file-upload/get-all:
 *   get:
 *     summary: Lấy tất cả file upload
 *     tags: [File Upload]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get("/file-upload/get-all", fileUploadController.getAllFileUploads);

/**
 * @swagger
 * /file-upload/get-list:
 *   get:
 *     summary: Lấy danh sách file có phân trang
 *     tags: [File Upload]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: integer
 *         description: Lọc theo đoàn viên
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: integer
 *         description: Lọc theo chi đoàn
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get("/file-upload/get-list", fileUploadController.getListFileUploads);

/**
 * @swagger
 * /file-upload/search:
 *   get:
 *     summary: Tìm kiếm file nâng cao
 *     tags: [File Upload]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: integer
 *         description: Lọc theo đoàn viên
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: integer
 *         description: Lọc theo chi đoàn
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
router.get("/file-upload/search", fileUploadController.searchFileUploads);

/**
 * @swagger
 * /file-upload/statistics:
 *   get:
 *     summary: Lấy thống kê file upload
 *     tags: [File Upload]
 *     responses:
 *       200:
 *         description: Lấy thống kê thành công
 */
router.get(
  "/file-upload/statistics",
  fileUploadController.getFileUploadStatistics
);

/**
 * @swagger
 * /file-upload/member/{memberId}:
 *   get:
 *     summary: Lấy danh sách file theo đoàn viên
 *     tags: [File Upload]
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
 *         description: Lấy danh sách file thành công
 */
router.get(
  "/file-upload/member/:memberId",
  fileUploadController.getFilesByMember
);

/**
 * @swagger
 * /file-upload/branch/{branchId}:
 *   get:
 *     summary: Lấy danh sách file theo chi đoàn
 *     tags: [File Upload]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Lấy danh sách file thành công
 */
router.get(
  "/file-upload/branch/:branchId",
  fileUploadController.getFilesByBranch
);

/**
 * @swagger
 * /file-upload/{id}:
 *   get:
 *     summary: Lấy file theo ID
 *     tags: [File Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy thông tin file thành công
 *       404:
 *         $ref: '#/components/responses/404'
 */
router.get("/file-upload/:id", fileUploadController.getFileUploadById);

/**
 * @swagger
 * /file-upload:
 *   post:
 *     summary: Upload file mới
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileUrl
 *             properties:
 *               memberId:
 *                 type: integer
 *                 example: 1
 *               branchId:
 *                 type: integer
 *                 example: 1
 *               fileName:
 *                 type: string
 *                 example: "document.pdf"
 *               fileUrl:
 *                 type: string
 *                 example: "https://cdn.example.com/files/document.pdf"
 *               description:
 *                 type: string
 *                 example: "Tài liệu quan trọng"
 *               uploadedBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Upload thành công
 */
router.post("/file-upload", fileUploadController.createFileUpload);

/**
 * @swagger
 * /file-upload/batch:
 *   post:
 *     summary: Upload nhiều file cùng lúc
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - fileName
 *                     - fileUrl
 *                   properties:
 *                     memberId:
 *                       type: integer
 *                     branchId:
 *                       type: integer
 *                     fileName:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       201:
 *         description: Batch upload thành công
 */
router.post("/file-upload/batch", fileUploadController.batchUploadFiles);

/**
 * @swagger
 * /file-upload/{id}:
 *   put:
 *     summary: Cập nhật thông tin file
 *     tags: [File Upload]
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
 *               fileName:
 *                 type: string
 *               description:
 *                 type: string
 *               memberId:
 *                 type: integer
 *               branchId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/file-upload/:id", fileUploadController.updateFileUpload);

/**
 * @swagger
 * /file-upload/{id}:
 *   delete:
 *     summary: Xóa file
 *     tags: [File Upload]
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
router.delete("/file-upload/:id", fileUploadController.deleteFileUpload);

/**
 * @swagger
 * /file-upload:
 *   delete:
 *     summary: Xóa nhiều file
 *     tags: [File Upload]
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
router.delete("/file-upload", fileUploadController.deleteManyFileUploads);

module.exports = router;
