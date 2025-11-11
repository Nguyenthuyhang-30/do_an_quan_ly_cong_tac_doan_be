/**
 * @swagger
 * tags:
 *   name: YouthUnionBranches
 *   description: Quản lý chi đoàn thanh niên
 *
 * /youth-union-branch/get-all:
 *   get:
 *     summary: Lấy tất cả chi đoàn không phân trang
 *     description: Lấy tất cả chi đoàn thanh niên mà không cần phân trang
 *     tags: [YouthUnionBranches]
 *     responses:
 *       200:
 *         description: Successfully retrieved all youth union branches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /youth-union-branch/get-list:
 *   get:
 *     summary: Lấy danh sách chi đoàn có phân trang
 *     description: Lấy danh sách chi đoàn thanh niên với phân trang, tìm kiếm và lọc
 *     tags: [YouthUnionBranches]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Successfully retrieved youth union branch list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /youth-union-branch/get-select:
 *   get:
 *     summary: Lấy danh sách chi đoàn cho dropdown/select
 *     description: Lấy danh sách chi đoàn thanh niên để hiển thị trong dropdown hoặc select
 *     tags: [YouthUnionBranches]
 *     responses:
 *       200:
 *         description: Successfully retrieved youth union branch select options
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchSelectResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /youth-union-branch/{id}:
 *   get:
 *     summary: Lấy chi đoàn theo ID
 *     description: Lấy thông tin một chi đoàn thanh niên bằng ID
 *     tags: [YouthUnionBranches]
 *     parameters:
 *       - $ref: '#/components/parameters/YouthUnionBranchId'
 *     responses:
 *       200:
 *         description: Successfully retrieved youth union branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Cập nhật chi đoàn theo ID
 *     description: Cập nhật thông tin một chi đoàn thanh niên bằng ID
 *     tags: [YouthUnionBranches]
 *     parameters:
 *       - $ref: '#/components/parameters/YouthUnionBranchId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YouthUnionBranchUpdate'
 *     responses:
 *       200:
 *         description: Successfully updated youth union branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa chi đoàn theo ID
 *     description: Xóa một chi đoàn thanh niên bằng ID
 *     tags: [YouthUnionBranches]
 *     parameters:
 *       - $ref: '#/components/parameters/YouthUnionBranchId'
 *     responses:
 *       200:
 *         description: Successfully deleted youth union branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /youth-union-branch:
 *   post:
 *     summary: Tạo chi đoàn mới
 *     description: Tạo chi đoàn mới
 *     tags: [YouthUnionBranches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YouthUnionBranchCreate'
 *     responses:
 *       201:
 *         description: Successfully created youth union branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YouthUnionBranchResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa nhiều chi đoàn
 *     description: Xóa nhiều chi đoàn bằng danh sách ids
 *     tags: [YouthUnionBranches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteManyRequest'
 *     responses:
 *       200:
 *         description: Successfully deleted youth union branches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */

"use strict";

const express = require("express");
const youthUnionBranchController = require("../../controllers/youth_union_branch.controller");
const router = express.Router();

// GET routes
router.get(
  "/youth-union-branch/get-all",
  youthUnionBranchController.getAllYouthUnionBranchs
);
router.get(
  "/youth-union-branch/get-list",
  youthUnionBranchController.getListYouthUnionBranchs
);
router.get(
  "/youth-union-branch/get-select",
  youthUnionBranchController.getSelectYouthUnionBranchs
);
router.get(
  "/youth-union-branch/:id",
  youthUnionBranchController.getYouthUnionBranchById
);

// POST routes
router.post(
  "/youth-union-branch",
  youthUnionBranchController.createYouthUnionBranch
);

// PUT routes
router.put(
  "/youth-union-branch/:id",
  youthUnionBranchController.updateYouthUnionBranch
);

// DELETE routes
router.delete(
  "/youth-union-branch/:id",
  youthUnionBranchController.deleteYouthUnionBranch
);
router.delete(
  "/youth-union-branch",
  youthUnionBranchController.deleteManyYouthUnionBranchs
);

module.exports = router;
