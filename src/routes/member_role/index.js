/**
 * @swagger
 * tags:
 *   name: Member Role
 *   description: Quản lý vai trò đoàn viên
 */

"use strict";

const express = require("express");
const roleController = require("../../controllers/member_role.controller");
const router = express.Router();

// Gán vai trò cho đoàn viên
router.post("/role/assign", roleController.assignRole);

// Gán nhiều vai trò cho đoàn viên
router.post("/role/assign-multiple", roleController.assignMultipleRoles);

// Thay đổi vai trò
router.post("/role/change", roleController.changeRole);

// Gỡ vai trò
router.delete("/role/member/:memberId/role/:roleId", roleController.removeRole);

// Lấy danh sách vai trò của đoàn viên
router.get("/role/member/:memberId", roleController.getMemberRoles);

// Lấy danh sách đoàn viên theo vai trò
router.get("/role/:roleId/members", roleController.getMembersByRole);

// Thống kê vai trò
router.get("/role/statistics", roleController.getRoleStatistics);

module.exports = router;
