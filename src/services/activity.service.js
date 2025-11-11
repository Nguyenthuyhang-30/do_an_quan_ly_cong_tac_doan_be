"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const Activity = db.Activity;
const YouthUnionMemberActivityMap = db.YouthUnionMemberActivityMap;
const YouthUnionMember = db.YouthUnionMember;
const { Op } = require("sequelize");

/**
 * ActivityService - Service quản lý Activity (Hoạt động)
 * Kế thừa từ BaseService và bổ sung các phương thức đặc biệt
 */
class ActivityService extends BaseService {
  constructor() {
    super(Activity, {
      entityName: "hoạt động",
      searchFields: ["name", "code", "location"], // Các trường để search
      requiredFields: ["code", "name", "start_date"], // Các trường bắt buộc
      uniqueFields: ["code"], // Các trường unique cần check
      selectFields: ["id", "code", "name", "start_date", "end_date"], // Các trường cho dropdown/select
    });
  }

  // ============================================================
  // WRAPPER METHODS - Để giữ API tương thích
  // ============================================================

  static getAllActivities = async () => {
    const instance = new ActivityService();
    return await instance.getAll([["start_date", "DESC"]]);
  };

  static getListActivities = async (params) => {
    const instance = new ActivityService();
    return await instance.getList(params);
  };

  static getActivityById = async (id) => {
    const instance = new ActivityService();
    return await instance.getById(id);
  };

  static createOrUpdateActivity = async (data, id = null) => {
    const instance = new ActivityService();
    return await instance.createOrUpdate(data, id);
  };

  static deleteActivity = async (id) => {
    const instance = new ActivityService();
    return await instance.delete(id);
  };

  static deleteManyActivities = async (ids) => {
    const instance = new ActivityService();
    return await instance.deleteMany(ids);
  };

  static getSelectActivities = async () => {
    const instance = new ActivityService();
    return await instance.getSelect();
  };

  // ============================================================
  // CUSTOM METHODS - Các phương thức đặc biệt cho Activity
  // ============================================================

  /**
   * Lấy danh sách hoạt động theo khoảng thời gian
   * @param {Date} startDate - Ngày bắt đầu
   * @param {Date} endDate - Ngày kết thúc
   * @returns {Promise<Object>}
   */
  static getActivitiesByDateRange = async (startDate, endDate) => {
    try {
      const activities = await Activity.findAll({
        where: {
          start_date: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
        order: [["start_date", "ASC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách hoạt động theo khoảng thời gian thành công",
        data: activities,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy hoạt động theo khoảng thời gian: ${error.message}`
      );
    }
  };

  /**
   * Lấy danh sách hoạt động sắp diễn ra
   * @param {number} limit - Số lượng hoạt động (default: 10)
   * @returns {Promise<Object>}
   */
  static getUpcomingActivities = async (limit = 10) => {
    try {
      const activities = await Activity.findAll({
        where: {
          start_date: {
            [Op.gte]: new Date(),
          },
        },
        order: [["start_date", "ASC"]],
        limit: parseInt(limit),
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách hoạt động sắp diễn ra thành công",
        data: activities,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy hoạt động sắp diễn ra: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách hoạt động đã kết thúc
   * @param {number} page - Trang hiện tại
   * @param {number} limit - Số lượng items mỗi trang
   * @returns {Promise<Object>}
   */
  static getPastActivities = async ({ page = 1, limit = 10 }) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await Activity.findAndCountAll({
        where: {
          end_date: {
            [Op.lt]: new Date(),
          },
        },
        order: [["end_date", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách hoạt động đã kết thúc thành công",
        data: {
          list: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy hoạt động đã kết thúc: ${error.message}`);
    }
  };

  // ============================================================
  // REGISTRATION METHODS - Đăng ký hoạt động
  // ============================================================

  /**
   * Đăng ký thành viên vào hoạt động
   * @param {number} activityId - ID hoạt động
   * @param {number} memberId - ID thành viên
   * @param {string} code - Mã đăng ký (optional)
   * @returns {Promise<Object>}
   */
  static registerMemberToActivity = async (
    activityId,
    memberId,
    code = null
  ) => {
    try {
      // Kiểm tra hoạt động có tồn tại không
      const activity = await Activity.findByPk(activityId);
      if (!activity) {
        return {
          code: 404,
          success: false,
          message: "Hoạt động không tồn tại",
          data: null,
        };
      }

      // Kiểm tra thành viên có tồn tại không
      const member = await YouthUnionMember.findByPk(memberId);
      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Thành viên không tồn tại",
          data: null,
        };
      }

      // Kiểm tra đã đăng ký chưa
      const existingRegistration = await YouthUnionMemberActivityMap.findOne({
        where: {
          activity_id: activityId,
          member_id: memberId,
        },
      });

      if (existingRegistration) {
        return {
          code: 400,
          success: false,
          message: "Thành viên đã đăng ký hoạt động này rồi",
          data: null,
        };
      }

      // Tạo đăng ký mới
      const registration = await YouthUnionMemberActivityMap.create({
        activity_id: activityId,
        member_id: memberId,
        code: code || `REG-${activityId}-${memberId}-${Date.now()}`,
        checking_attendence: 0, // 0: Chưa điểm danh
      });

      return {
        code: 201,
        success: true,
        message: "Đăng ký hoạt động thành công",
        data: registration,
      };
    } catch (error) {
      throw new Error(`Lỗi khi đăng ký hoạt động: ${error.message}`);
    }
  };

  /**
   * Hủy đăng ký hoạt động
   * @param {number} activityId - ID hoạt động
   * @param {number} memberId - ID thành viên
   * @returns {Promise<Object>}
   */
  static unregisterMemberFromActivity = async (activityId, memberId) => {
    try {
      const registration = await YouthUnionMemberActivityMap.findOne({
        where: {
          activity_id: activityId,
          member_id: memberId,
        },
      });

      if (!registration) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy đăng ký hoạt động",
          data: null,
        };
      }

      await registration.destroy();

      return {
        code: 200,
        success: true,
        message: "Hủy đăng ký hoạt động thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi hủy đăng ký hoạt động: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách thành viên đã đăng ký hoạt động
   * @param {number} activityId - ID hoạt động
   * @param {Object} params - Tham số phân trang và tìm kiếm
   * @returns {Promise<Object>}
   */
  static getRegisteredMembers = async (
    activityId,
    { page = 1, limit = 10, search = "" }
  ) => {
    try {
      const offset = (page - 1) * limit;

      // Build where condition cho member
      let memberWhere = {};
      if (search) {
        memberWhere[Op.or] = [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { code: { [Op.iLike]: `%${search}%` } },
          { student_code: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const { count, rows } = await YouthUnionMemberActivityMap.findAndCountAll(
        {
          where: { activity_id: activityId },
          include: [
            {
              model: YouthUnionMember,
              as: "member",
              where: memberWhere,
              attributes: [
                "id",
                "code",
                "full_name",
                "email",
                "phone_number",
                "student_code",
                "avatar_url",
              ],
            },
          ],
          order: [["created_at", "DESC"]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        }
      );

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách thành viên đã đăng ký thành công",
        data: {
          list: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách thành viên đã đăng ký: ${error.message}`
      );
    }
  };

  /**
   * Lấy danh sách hoạt động mà thành viên đã đăng ký
   * @param {number} memberId - ID thành viên
   * @param {Object} params - Tham số phân trang
   * @returns {Promise<Object>}
   */
  static getMemberActivities = async (memberId, { page = 1, limit = 10 }) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await YouthUnionMemberActivityMap.findAndCountAll(
        {
          where: { member_id: memberId },
          include: [
            {
              model: Activity,
              as: "activity",
              attributes: [
                "id",
                "code",
                "name",
                "start_date",
                "end_date",
                "location",
                "description",
                "is_required",
              ],
            },
          ],
          order: [["created_at", "DESC"]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        }
      );

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách hoạt động của thành viên thành công",
        data: {
          list: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách hoạt động của thành viên: ${error.message}`
      );
    }
  };

  // ============================================================
  // ATTENDANCE METHODS - Điểm danh
  // ============================================================

  /**
   * Check-in cho thành viên
   * @param {number} activityId - ID hoạt động
   * @param {number} memberId - ID thành viên
   * @returns {Promise<Object>}
   */
  static checkInMember = async (activityId, memberId) => {
    try {
      const registration = await YouthUnionMemberActivityMap.findOne({
        where: {
          activity_id: activityId,
          member_id: memberId,
        },
      });

      if (!registration) {
        return {
          code: 404,
          success: false,
          message: "Thành viên chưa đăng ký hoạt động này",
          data: null,
        };
      }

      if (registration.check_in) {
        return {
          code: 400,
          success: false,
          message: "Thành viên đã check-in rồi",
          data: registration,
        };
      }

      await registration.update({
        check_in: new Date(),
        checking_attendence: 1, // 1: Đã check-in
      });

      return {
        code: 200,
        success: true,
        message: "Check-in thành công",
        data: registration,
      };
    } catch (error) {
      throw new Error(`Lỗi khi check-in: ${error.message}`);
    }
  };

  /**
   * Check-out cho thành viên
   * @param {number} activityId - ID hoạt động
   * @param {number} memberId - ID thành viên
   * @returns {Promise<Object>}
   */
  static checkOutMember = async (activityId, memberId) => {
    try {
      const registration = await YouthUnionMemberActivityMap.findOne({
        where: {
          activity_id: activityId,
          member_id: memberId,
        },
      });

      if (!registration) {
        return {
          code: 404,
          success: false,
          message: "Thành viên chưa đăng ký hoạt động này",
          data: null,
        };
      }

      if (!registration.check_in) {
        return {
          code: 400,
          success: false,
          message: "Thành viên chưa check-in",
          data: registration,
        };
      }

      if (registration.check_out) {
        return {
          code: 400,
          success: false,
          message: "Thành viên đã check-out rồi",
          data: registration,
        };
      }

      await registration.update({
        check_out: new Date(),
        checking_attendence: 2, // 2: Đã check-out (hoàn thành)
      });

      return {
        code: 200,
        success: true,
        message: "Check-out thành công",
        data: registration,
      };
    } catch (error) {
      throw new Error(`Lỗi khi check-out: ${error.message}`);
    }
  };

  /**
   * Cập nhật trạng thái điểm danh
   * @param {number} activityId - ID hoạt động
   * @param {number} memberId - ID thành viên
   * @param {number} status - Trạng thái (0: Vắng, 1: Có mặt, 2: Có phép, 3: Trễ)
   * @returns {Promise<Object>}
   */
  static updateAttendanceStatus = async (activityId, memberId, status) => {
    try {
      const registration = await YouthUnionMemberActivityMap.findOne({
        where: {
          activity_id: activityId,
          member_id: memberId,
        },
      });

      if (!registration) {
        return {
          code: 404,
          success: false,
          message: "Thành viên chưa đăng ký hoạt động này",
          data: null,
        };
      }

      await registration.update({
        checking_attendence: status,
      });

      const statusText = {
        0: "Vắng",
        1: "Có mặt",
        2: "Có phép",
        3: "Trễ",
      };

      return {
        code: 200,
        success: true,
        message: `Cập nhật trạng thái điểm danh thành công: ${statusText[status]}`,
        data: registration,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi cập nhật trạng thái điểm danh: ${error.message}`
      );
    }
  };

  /**
   * Lấy thống kê điểm danh của hoạt động
   * @param {number} activityId - ID hoạt động
   * @returns {Promise<Object>}
   */
  static getAttendanceStatistics = async (activityId) => {
    try {
      const registrations = await YouthUnionMemberActivityMap.findAll({
        where: { activity_id: activityId },
      });

      const total = registrations.length;
      const checkedIn = registrations.filter((r) => r.check_in).length;
      const checkedOut = registrations.filter((r) => r.check_out).length;
      const notCheckedIn = total - checkedIn;

      // Thống kê theo trạng thái
      const statusStats = {
        absent: registrations.filter((r) => r.checking_attendence === 0).length, // Vắng
        present: registrations.filter((r) => r.checking_attendence === 1)
          .length, // Có mặt
        excused: registrations.filter((r) => r.checking_attendence === 2)
          .length, // Có phép
        late: registrations.filter((r) => r.checking_attendence === 3).length, // Trễ
      };

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê điểm danh thành công",
        data: {
          total,
          checkedIn,
          checkedOut,
          notCheckedIn,
          attendanceRate:
            total > 0 ? ((checkedIn / total) * 100).toFixed(2) : 0,
          statusStats,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê điểm danh: ${error.message}`);
    }
  };

  /**
   * Check-in hàng loạt
   * @param {number} activityId - ID hoạt động
   * @param {Array<number>} memberIds - Danh sách ID thành viên
   * @returns {Promise<Object>}
   */
  static bulkCheckIn = async (activityId, memberIds) => {
    try {
      const results = {
        success: [],
        failed: [],
      };

      for (const memberId of memberIds) {
        try {
          const result = await this.checkInMember(activityId, memberId);
          if (result.success) {
            results.success.push(memberId);
          } else {
            results.failed.push({ memberId, reason: result.message });
          }
        } catch (error) {
          results.failed.push({ memberId, reason: error.message });
        }
      }

      return {
        code: 200,
        success: true,
        message: `Check-in hàng loạt hoàn tất. Thành công: ${results.success.length}, Thất bại: ${results.failed.length}`,
        data: results,
      };
    } catch (error) {
      throw new Error(`Lỗi khi check-in hàng loạt: ${error.message}`);
    }
  };
}

module.exports = ActivityService;
