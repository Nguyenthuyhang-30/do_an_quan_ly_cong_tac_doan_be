/**
 * @swagger
 * tags:
 *   name: Youth Union Members
 *   description: Quản lý đoàn viên
 *
 * /member/get-all:
 *   get:
 *     summary: Lấy tất cả đoàn viên
 *     tags: [Youth Union Members]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetAllMembersSuccess'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /member/get-list:
 *   get:
 *     summary: Lấy danh sách đoàn viên có phân trang
 *     tags: [Youth Union Members]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMemberListSuccess'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /member/get-select:
 *   get:
 *     summary: Lấy danh sách đoàn viên cho dropdown
 *     tags: [Youth Union Members]
 *     responses:
 *       200:
 *         description: Success
 *
 * /member/search:
 *   get:
 *     summary: Tìm kiếm đoàn viên nâng cao
 *     tags: [Youth Union Members]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *         description: Trạng thái (0-inactive, 1-active)
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: integer
 *         description: ID chi đoàn
 *       - in: query
 *         name: roleId
 *         schema:
 *           type: integer
 *         description: ID vai trò
 *       - in: query
 *         name: gender
 *         schema:
 *           type: boolean
 *         description: Giới tính (true-nam, false-nữ)
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SearchMembersSuccess'
 *
 * /member/statistics:
 *   get:
 *     summary: Lấy thống kê đoàn viên
 *     tags: [Youth Union Members]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMemberStatisticsSuccess'
 *
 * /member/branch/{branchId}:
 *   get:
 *     summary: Lấy danh sách đoàn viên theo chi đoàn
 *     tags: [Youth Union Members]
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
 *         description: Success
 *
 * /member/{id}:
 *   get:
 *     summary: Lấy đoàn viên theo ID
 *     tags: [Youth Union Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMemberSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *   put:
 *     summary: Cập nhật đoàn viên
 *     tags: [Youth Union Members]
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
 *             $ref: '#/components/schemas/UpdateMemberRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateMemberSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *   delete:
 *     summary: Xóa đoàn viên
 *     tags: [Youth Union Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/DeleteMemberSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *
 * /member/{id}/profile:
 *   get:
 *     summary: Lấy thông tin đầy đủ của đoàn viên
 *     tags: [Youth Union Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetMemberProfileSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *
 * /member/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái đoàn viên
 *     tags: [Youth Union Members]
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
 *             $ref: '#/components/schemas/UpdateMemberStatusRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateMemberSuccess'
 *       404:
 *         $ref: '#/components/responses/MemberNotFound'
 *
 * /member/{id}/activities:
 *   get:
 *     summary: Lấy lịch sử hoạt động của đoàn viên
 *     tags: [Youth Union Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Success
 *
 * /member:
 *   post:
 *     summary: Tạo đoàn viên mới
 *     tags: [Youth Union Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMemberRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/CreateMemberSuccess'
 *       400:
 *         $ref: '#/components/responses/MemberBadRequest'
 *       409:
 *         $ref: '#/components/responses/MemberConflict'
 *   delete:
 *     summary: Xóa nhiều đoàn viên
 *     tags: [Youth Union Members]
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
 *         $ref: '#/components/responses/DeleteMemberSuccess'
 */

"use strict";

const express = require("express");
const memberController = require("../../controllers/youth_union_member.controller");
const router = express.Router();

// GET routes
router.get("/member/get-all", memberController.getAllMembers);
router.get("/member/get-list", memberController.getListMembers);
router.get("/member/get-select", memberController.getSelectMembers);
router.get("/member/search", memberController.searchMembers);
router.get("/member/statistics", memberController.getMemberStatistics);
router.get("/member/branch/:branchId", memberController.getMembersByBranch);
router.get("/member/:id", memberController.getMemberById);
router.get("/member/:id/profile", memberController.getMemberFullProfile);
router.get("/member/:id/activities", memberController.getMemberActivityHistory);

// POST routes
router.post("/member", memberController.createMember);

// PUT routes
router.put("/member/:id", memberController.updateMember);
router.put("/member/:id/status", memberController.updateMemberStatus);

// DELETE routes
router.delete("/member/:id", memberController.deleteMember);
router.delete("/member", memberController.deleteManyMembers);

module.exports = router;
