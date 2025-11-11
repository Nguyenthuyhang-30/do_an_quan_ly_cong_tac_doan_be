/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Quản lý hoạt động (Activity Management)
 *
 * /activity/get-all:
 *   get:
 *     summary: Lấy tất cả hoạt động
 *     description: Retrieve all activities without pagination
 *     tags: [Activities]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/get-list:
 *   get:
 *     summary: Lấy danh sách hoạt động có phân trang
 *     description: Retrieve activities with pagination and search functionality
 *     tags: [Activities]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/get-select:
 *   get:
 *     summary: Lấy danh sách hoạt động cho dropdown/select
 *     description: Retrieve simplified activity data for dropdown/select components
 *     tags: [Activities]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/upcoming:
 *   get:
 *     summary: Lấy danh sách hoạt động sắp diễn ra
 *     description: Retrieve upcoming activities
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng hoạt động
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/past:
 *   get:
 *     summary: Lấy danh sách hoạt động đã kết thúc
 *     description: Retrieve past activities with pagination
 *     tags: [Activities]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/date-range:
 *   get:
 *     summary: Lấy hoạt động theo khoảng thời gian
 *     description: Retrieve activities within a date range
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày bắt đầu (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Ngày kết thúc (YYYY-MM-DD)
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{id}:
 *   get:
 *     summary: Lấy hoạt động theo ID
 *     description: Retrieve a specific activity by its ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Cập nhật hoạt động
 *     description: Update an existing activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityInput'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa hoạt động theo ID
 *     description: Delete a specific activity by its ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     responses:
 *       200:
 *         description: Successfully deleted activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity:
 *   post:
 *     summary: Tạo hoạt động mới
 *     description: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActivityInput'
 *           examples:
 *             createActivity:
 *               summary: Example activity creation
 *               value:
 *                 code: "ACT001"
 *                 name: "Hội thảo kỹ năng mềm"
 *                 start_date: "2024-12-20T08:00:00Z"
 *                 end_date: "2024-12-20T17:00:00Z"
 *                 is_required: true
 *                 location: "Hội trường A"
 *                 description: "Hội thảo về phát triển kỹ năng mềm cho sinh viên"
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ActivityResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa nhiều hoạt động
 *     description: Delete multiple activities by their IDs
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteManyRequest'
 *     responses:
 *       200:
 *         description: Successfully deleted activities
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/register:
 *   post:
 *     summary: Đăng ký thành viên vào hoạt động
 *     description: Register a member to an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterMemberInput'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ActivityRegistrationResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/unregister/{memberId}:
 *   delete:
 *     summary: Hủy đăng ký hoạt động
 *     description: Unregister a member from an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành viên
 *     responses:
 *       200:
 *         description: Successfully unregistered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/members:
 *   get:
 *     summary: Lấy danh sách thành viên đã đăng ký hoạt động
 *     description: Get list of members registered for an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityRegistrationListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/member/{memberId}/activities:
 *   get:
 *     summary: Lấy danh sách hoạt động của thành viên
 *     description: Get list of activities that a member has registered for
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành viên
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ActivityRegistrationListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/check-in/{memberId}:
 *   post:
 *     summary: Check-in cho thành viên
 *     description: Check-in a member for an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành viên
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CheckInResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/check-out/{memberId}:
 *   post:
 *     summary: Check-out cho thành viên
 *     description: Check-out a member from an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành viên
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CheckInResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/attendance/{memberId}:
 *   put:
 *     summary: Cập nhật trạng thái điểm danh
 *     description: Update attendance status for a member
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của thành viên
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttendanceInput'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CheckInResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/statistics:
 *   get:
 *     summary: Lấy thống kê điểm danh
 *     description: Get attendance statistics for an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AttendanceStatisticsResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /activity/{activityId}/bulk-check-in:
 *   post:
 *     summary: Check-in hàng loạt
 *     description: Check-in multiple members at once
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hoạt động
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BulkCheckInInput'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/BulkCheckInResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 */

"use strict";

const express = require("express");
const activityController = require("../../controllers/activity.controller");
const router = express.Router();

// ============================================================
// BASIC CRUD ROUTES
// ============================================================

// GET routes
router.get("/activity/get-all", activityController.getAllActivities);
router.get("/activity/get-list", activityController.getListActivities);
router.get("/activity/get-select", activityController.getSelectActivities);
router.get("/activity/upcoming", activityController.getUpcomingActivities);
router.get("/activity/past", activityController.getPastActivities);
router.get("/activity/date-range", activityController.getActivitiesByDateRange);
router.get("/activity/:id", activityController.getActivityById);

// POST routes
router.post("/activity", activityController.createActivity);

// PUT routes
router.put("/activity/:id", activityController.updateActivity);

// DELETE routes
router.delete("/activity/:id", activityController.deleteActivity);
router.delete("/activity", activityController.deleteManyActivities);

// ============================================================
// REGISTRATION ROUTES - Đăng ký hoạt động
// ============================================================

// Đăng ký thành viên vào hoạt động
router.post(
  "/activity/:activityId/register",
  activityController.registerMemberToActivity
);

// Hủy đăng ký hoạt động
router.delete(
  "/activity/:activityId/unregister/:memberId",
  activityController.unregisterMemberFromActivity
);

// Lấy danh sách thành viên đã đăng ký hoạt động
router.get(
  "/activity/:activityId/members",
  activityController.getRegisteredMembers
);

// Lấy danh sách hoạt động của thành viên
router.get(
  "/activity/member/:memberId/activities",
  activityController.getMemberActivities
);

// ============================================================
// ATTENDANCE ROUTES - Điểm danh
// ============================================================

// Check-in
router.post(
  "/activity/:activityId/check-in/:memberId",
  activityController.checkInMember
);

// Check-out
router.post(
  "/activity/:activityId/check-out/:memberId",
  activityController.checkOutMember
);

// Cập nhật trạng thái điểm danh
router.put(
  "/activity/:activityId/attendance/:memberId",
  activityController.updateAttendanceStatus
);

// Lấy thống kê điểm danh
router.get(
  "/activity/:activityId/statistics",
  activityController.getAttendanceStatistics
);

// Check-in hàng loạt
router.post(
  "/activity/:activityId/bulk-check-in",
  activityController.bulkCheckIn
);

module.exports = router;
