/**
 * @swagger
 * tags:
 *   name: YouthUnionBranches
 *   description: Quản lý chi đoàn thanh niên
 *
 * /youth-union-branch/get-all:
 *   get:
 *     summary: Lấy tất cả youth union branches
 *     description: Retrieve all youth union branches without pagination
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
 *     summary: Lấy danh sách youth union branches có phân trang
 *     description: Retrieve youth union branches with pagination and search functionality
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
 *     summary: Lấy danh sách youth union branches cho dropdown/select
 *     description: Retrieve simplified youth union branch data for dropdown/select components
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
 *     summary: Lấy youth union branch theo ID
 *     description: Retrieve a specific youth union branch by its ID
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
 *     summary: Cập nhật youth union branch theo ID
 *     description: Update an existing youth union branch by its ID
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
 *     summary: Xóa youth union branch theo ID
 *     description: Delete a specific youth union branch by its ID
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
 *     summary: Tạo youth union branch mới
 *     description: Create a new youth union branch
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
 *     summary: Xóa nhiều youth union branches
 *     description: Delete multiple youth union branches by their IDs
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
