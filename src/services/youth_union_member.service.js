"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const YouthUnionMember = db.YouthUnionMember;
const MemberRole = db.MemberRole;
const Role = db.Role;
const YouthUnionMemberBranchHistory = db.YouthUnionMemberBranchHistory;
const YouthUnionBranch = db.YouthUnionBranch;
const YouthUnionMemberActivityMap = db.YouthUnionMemberActivityMap;

/**
 * YouthUnionMemberService - Service quản lý Đoàn viên
 * Kế thừa từ BaseService và bổ sung các phương thức đặc biệt
 */
class YouthUnionMemberService extends BaseService {
  constructor() {
    super(YouthUnionMember, {
      entityName: "đoàn viên",
      searchFields: ["user_name", "code", "full_name", "email", "student_code"],
      requiredFields: ["code", "full_name", "email"],
      uniqueFields: ["code", "email", "user_name"],
      selectFields: ["id", "code", "user_name", "full_name", "email"],
    });
  }

  // ============================================================
  // WRAPPER METHODS - Để giữ API tương thích
  // ============================================================

  static getAllYouthUnionMembers = async () => {
    const instance = new YouthUnionMemberService();
    return await instance.getAll([["created_at", "DESC"]]);
  };

  static getListYouthUnionMembers = async (params) => {
    const instance = new YouthUnionMemberService();
    return await instance.getList(params);
  };

  static getYouthUnionMemberById = async (id) => {
    const instance = new YouthUnionMemberService();
    return await instance.getById(id);
  };

  static createOrUpdateYouthUnionMember = async (data, id = null) => {
    const instance = new YouthUnionMemberService();

    // Hash password nếu có
    if (data.password_hash && !id) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }

    return await instance.createOrUpdate(data, id);
  };

  static deleteYouthUnionMember = async (id) => {
    const instance = new YouthUnionMemberService();
    return await instance.delete(id);
  };

  static deleteManyYouthUnionMembers = async (ids) => {
    const instance = new YouthUnionMemberService();
    return await instance.deleteMany(ids);
  };

  static getSelectYouthUnionMembers = async () => {
    const instance = new YouthUnionMemberService();
    return await instance.getSelect();
  };

  // ============================================================
  // MEMBER PROFILE & INFORMATION
  // ============================================================

  /**
   * Lấy thông tin đầy đủ của đoàn viên (bao gồm roles, branch history, activities)
   * @param {number} id - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static getMemberFullProfile = async (id) => {
    try {
      const member = await YouthUnionMember.findByPk(id, {
        include: [
          {
            model: MemberRole,
            as: "roles",
            include: [
              {
                model: Role,
                as: "role",
                attributes: ["id", "name", "description"],
              },
            ],
          },
          {
            model: YouthUnionMemberBranchHistory,
            as: "branch_histories",
            include: [
              {
                model: YouthUnionBranch,
                as: "branch",
                attributes: ["id", "code", "name"],
              },
            ],
            order: [["start_date", "DESC"]],
          },
        ],
        attributes: { exclude: ["password_hash"] },
      });

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy đoàn viên",
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: "Lấy thông tin đoàn viên thành công",
        data: member,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin đoàn viên: ${error.message}`);
    }
  };

  /**
   * Tìm kiếm đoàn viên nâng cao
   * @param {Object} filters - Bộ lọc tìm kiếm
   * @returns {Promise<Object>}
   */
  static searchMembers = async ({
    page = 1,
    limit = 10,
    search = "",
    status = null,
    branchId = null,
    roleId = null,
    gender = null,
  }) => {
    try {
      const offset = (page - 1) * limit;
      let whereCondition = {};

      // Text search
      if (search) {
        whereCondition[Op.or] = [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { code: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { student_code: { [Op.iLike]: `%${search}%` } },
        ];
      }

      // Status filter
      if (status !== null) {
        whereCondition.status = status;
      }

      // Gender filter
      if (gender !== null) {
        whereCondition.gender = gender;
      }

      // Include conditions
      const includeConditions = [];

      // Branch filter
      if (branchId) {
        includeConditions.push({
          model: YouthUnionMemberBranchHistory,
          as: "branch_histories",
          where: {
            branch_id: branchId,
            status: 1, // Active
          },
          required: true,
        });
      }

      // Role filter
      if (roleId) {
        includeConditions.push({
          model: MemberRole,
          as: "roles",
          where: { role_id: roleId },
          required: true,
        });
      }

      const { count, rows } = await YouthUnionMember.findAndCountAll({
        where: whereCondition,
        include: includeConditions.length > 0 ? includeConditions : undefined,
        attributes: { exclude: ["password_hash"] },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
        distinct: true,
      });

      return {
        code: 200,
        success: true,
        message: "Tìm kiếm đoàn viên thành công",
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
      throw new Error(`Lỗi khi tìm kiếm đoàn viên: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách đoàn viên theo chi đoàn
   * @param {number} branchId - ID chi đoàn
   * @param {Object} params - Tham số phân trang
   * @returns {Promise<Object>}
   */
  static getMembersByBranch = async (branchId, { page = 1, limit = 10 }) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await YouthUnionMember.findAndCountAll({
        include: [
          {
            model: YouthUnionMemberBranchHistory,
            as: "branch_histories",
            where: {
              branch_id: branchId,
              status: 1, // Active
            },
            required: true,
            include: [
              {
                model: YouthUnionBranch,
                as: "branch",
                attributes: ["id", "code", "name"],
              },
            ],
          },
          {
            model: MemberRole,
            as: "roles",
            include: [
              {
                model: Role,
                as: "role",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        attributes: { exclude: ["password_hash"] },
        order: [["full_name", "ASC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
        distinct: true,
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách đoàn viên theo chi đoàn thành công",
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
        `Lỗi khi lấy danh sách đoàn viên theo chi đoàn: ${error.message}`
      );
    }
  };

  /**
   * Cập nhật trạng thái đoàn viên
   * @param {number} id - ID đoàn viên
   * @param {number} status - Trạng thái mới
   * @returns {Promise<Object>}
   */
  static updateMemberStatus = async (id, status) => {
    try {
      const member = await YouthUnionMember.findByPk(id);

      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy đoàn viên",
          data: null,
        };
      }

      await member.update({ status });

      return {
        code: 200,
        success: true,
        message: "Cập nhật trạng thái đoàn viên thành công",
        data: member,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật trạng thái: ${error.message}`);
    }
  };

  /**
   * Lấy thống kê đoàn viên
   * @returns {Promise<Object>}
   */
  static getMemberStatistics = async () => {
    try {
      const total = await YouthUnionMember.count();
      const active = await YouthUnionMember.count({ where: { status: 1 } });
      const inactive = await YouthUnionMember.count({ where: { status: 0 } });

      const male = await YouthUnionMember.count({ where: { gender: true } });
      const female = await YouthUnionMember.count({ where: { gender: false } });

      // Count members by branch
      const membersByBranch = await YouthUnionMemberBranchHistory.findAll({
        where: { status: 1 },
        attributes: [
          "branch_id",
          [db.sequelize.fn("COUNT", db.sequelize.col("member_id")), "count"],
        ],
        include: [
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["name"],
          },
        ],
        group: ["branch_id", "branch.id", "branch.name"],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê đoàn viên thành công",
        data: {
          total,
          active,
          inactive,
          male,
          female,
          byBranch: membersByBranch,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê đoàn viên: ${error.message}`);
    }
  };

  /**
   * Lấy lịch sử hoạt động của đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @param {Object} params - Tham số phân trang
   * @returns {Promise<Object>}
   */
  static getMemberActivityHistory = async (
    memberId,
    { page = 1, limit = 10 }
  ) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await YouthUnionMemberActivityMap.findAndCountAll(
        {
          where: { member_id: memberId },
          include: [
            {
              model: db.Activity,
              as: "activity",
              attributes: [
                "id",
                "code",
                "name",
                "start_date",
                "end_date",
                "location",
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
        message: "Lấy lịch sử hoạt động thành công",
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
      throw new Error(`Lỗi khi lấy lịch sử hoạt động: ${error.message}`);
    }
  };
}

module.exports = YouthUnionMemberService;
