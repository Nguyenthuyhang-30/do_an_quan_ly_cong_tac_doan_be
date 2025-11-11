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

/**
 * @swagger
 * /role/assign:
 *   post:
 *     summary: Gán vai trò cho đoàn viên
 *     tags: [Member Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRoleRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AssignRoleSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *       409:
 *         $ref: '#/components/responses/RoleAlreadyAssigned'
 */
router.post("/role/assign", roleController.assignRole);

/**
 * @swagger
 * /role/assign-multiple:
 *   post:
 *     summary: Gán nhiều vai trò cho đoàn viên
 *     tags: [Member Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignMultipleRolesRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AssignMultipleRolesSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 */
router.post("/role/assign-multiple", roleController.assignMultipleRoles);

/**
 * @swagger
 * /role/change:
 *   post:
 *     summary: Thay đổi vai trò
 *     tags: [Member Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeRoleRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ChangeRoleSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberRoleNotFound'
 */
router.post("/role/change", roleController.changeRole);

/**
 * @swagger
 * /role/member/{memberId}/role/{roleId}:
 *   delete:
 *     summary: Gỡ vai trò
 *     tags: [Member Role]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RemoveRoleSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberRoleNotFound'
 */
router.delete("/role/member/:memberId/role/:roleId", roleController.removeRole);

/**
 * @swagger
 * /role/member/{memberId}:
 *   get:
 *     summary: Lấy danh sách vai trò của đoàn viên
 *     tags: [Member Role]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMemberRolesSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 */
router.get("/role/member/:memberId", roleController.getMemberRoles);

/**
 * @swagger
 * /role/{roleId}/members:
 *   get:
 *     summary: Lấy danh sách đoàn viên theo vai trò
 *     tags: [Member Role]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMembersByRoleSuccess'
 *       404:
 *         $ref: '#/components/responses/RoleNotFound'
 */
router.get("/role/:roleId/members", roleController.getMembersByRole);

/**
 * @swagger
 * /role/statistics:
 *   get:
 *     summary: Thống kê vai trò
 *     tags: [Member Role]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetRoleStatisticsSuccess'
 */
router.get("/role/statistics", roleController.getRoleStatistics);

module.exports = router;
