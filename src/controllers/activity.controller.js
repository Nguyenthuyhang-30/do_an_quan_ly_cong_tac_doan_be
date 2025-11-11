"use strict";

const ActivityService = require("../services/activity.service");

class ActivityController {
  // ============================================================
  // CRUD BASIC OPERATIONS
  // ============================================================

  // GET-ALL: Lấy tất cả activities
  getAllActivities = async (req, res) => {
    try {
      const result = await ActivityService.getAllActivities();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-LIST: Lấy danh sách có phân trang và tìm kiếm
  getListActivities = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await ActivityService.getListActivities({
        page,
        limit,
        search,
      });
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-BY-ID: Lấy activity theo ID
  getActivityById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ActivityService.getActivityById(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // CREATE: Tạo mới activity
  createActivity = async (req, res) => {
    try {
      const result = await ActivityService.createOrUpdateActivity(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // UPDATE: Cập nhật activity
  updateActivity = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ActivityService.createOrUpdateActivity(req.body, id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // DELETE: Xóa activity theo ID
  deleteActivity = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ActivityService.deleteActivity(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // DELETE-MANY: Xóa nhiều activities
  deleteManyActivities = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await ActivityService.deleteManyActivities(ids);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-SELECT: Lấy danh sách cho dropdown/select
  getSelectActivities = async (req, res) => {
    try {
      const result = await ActivityService.getSelectActivities();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // ============================================================
  // CUSTOM OPERATIONS
  // ============================================================

  // Lấy hoạt động theo khoảng thời gian
  getActivitiesByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const result = await ActivityService.getActivitiesByDateRange(
        startDate,
        endDate
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy hoạt động sắp diễn ra
  getUpcomingActivities = async (req, res) => {
    try {
      const { limit } = req.query;
      const result = await ActivityService.getUpcomingActivities(limit);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy hoạt động đã kết thúc
  getPastActivities = async (req, res) => {
    try {
      const { page, limit } = req.query;
      const result = await ActivityService.getPastActivities({ page, limit });
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // ============================================================
  // REGISTRATION OPERATIONS - Đăng ký hoạt động
  // ============================================================

  // Đăng ký thành viên vào hoạt động
  registerMemberToActivity = async (req, res) => {
    try {
      const { activityId } = req.params;
      const { memberId, code } = req.body;
      const result = await ActivityService.registerMemberToActivity(
        activityId,
        memberId,
        code
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Hủy đăng ký hoạt động
  unregisterMemberFromActivity = async (req, res) => {
    try {
      const { activityId, memberId } = req.params;
      const result = await ActivityService.unregisterMemberFromActivity(
        activityId,
        memberId
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy danh sách thành viên đã đăng ký hoạt động
  getRegisteredMembers = async (req, res) => {
    try {
      const { activityId } = req.params;
      const { page, limit, search } = req.query;
      const result = await ActivityService.getRegisteredMembers(activityId, {
        page,
        limit,
        search,
      });
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy danh sách hoạt động mà thành viên đã đăng ký
  getMemberActivities = async (req, res) => {
    try {
      const { memberId } = req.params;
      const { page, limit } = req.query;
      const result = await ActivityService.getMemberActivities(memberId, {
        page,
        limit,
      });
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // ============================================================
  // ATTENDANCE OPERATIONS - Điểm danh
  // ============================================================

  // Check-in cho thành viên
  checkInMember = async (req, res) => {
    try {
      const { activityId, memberId } = req.params;
      const result = await ActivityService.checkInMember(activityId, memberId);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Check-out cho thành viên
  checkOutMember = async (req, res) => {
    try {
      const { activityId, memberId } = req.params;
      const result = await ActivityService.checkOutMember(activityId, memberId);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Cập nhật trạng thái điểm danh
  updateAttendanceStatus = async (req, res) => {
    try {
      const { activityId, memberId } = req.params;
      const { status } = req.body;
      const result = await ActivityService.updateAttendanceStatus(
        activityId,
        memberId,
        status
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy thống kê điểm danh
  getAttendanceStatistics = async (req, res) => {
    try {
      const { activityId } = req.params;
      const result = await ActivityService.getAttendanceStatistics(activityId);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Check-in hàng loạt
  bulkCheckIn = async (req, res) => {
    try {
      const { activityId } = req.params;
      const { memberIds } = req.body;
      const result = await ActivityService.bulkCheckIn(activityId, memberIds);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
}

module.exports = new ActivityController();
