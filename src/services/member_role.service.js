"use strict";

const db = require("../models");
const { Op } = require("sequelize");

const MemberRole = db.MemberRole;
const YouthUnionMember = db.YouthUnionMember;
const Role = db.Role;

/**
 * MemberRoleService - Service quản lý vai trò của đoàn viên
 */
class MemberRoleService {
  /**
   * Gán vai trò cho đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @param {number} roleId - ID vai trò
   * @returns {Promise<Object>}
   */
  static assignRole = async (memberId, roleId) => {
    try {
      // Kiểm tra đoàn viên có tồn tại
      const member = await YouthUnionMember.findByPk(memberId);
      if (!member) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy đoàn viên",
          data: null,
        };
      }

      // Kiểm tra vai trò có tồn tại
      const role = await Role.findByPk(roleId);
      if (!role) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy vai trò",
          data: null,
        };
      }

      // Kiểm tra đã có vai trò này chưa
      const existingRole = await MemberRole.findOne({
        where: {
          member_id: memberId,
          role_id: roleId,
        },
      });

      if (existingRole) {
        return {
          code: 400,
          success: false,
          message: "Đoàn viên đã có vai trò này rồi",
          data: null,
        };
      }

      // Gán vai trò
      const memberRole = await MemberRole.create({
        member_id: memberId,
        role_id: roleId,
      });

      // Lấy thông tin đầy đủ
      const fullMemberRole = await MemberRole.findByPk(memberRole.id, {
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "full_name"],
          },
          {
            model: Role,
            as: "role",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      return {
        code: 201,
        success: true,
        message: "Gán vai trò thành công",
        data: fullMemberRole,
      };
    } catch (error) {
      throw new Error(`Lỗi khi gán vai trò: ${error.message}`);
    }
  };

  /**
   * Gỡ vai trò của đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @param {number} roleId - ID vai trò
   * @returns {Promise<Object>}
   */
  static removeRole = async (memberId, roleId) => {
    try {
      const memberRole = await MemberRole.findOne({
        where: {
          member_id: memberId,
          role_id: roleId,
        },
      });

      if (!memberRole) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy vai trò của đoàn viên",
          data: null,
        };
      }

      await memberRole.destroy();

      return {
        code: 200,
        success: true,
        message: "Gỡ vai trò thành công",
        data: null,
      };
    } catch (error) {
      throw new Error(`Lỗi khi gỡ vai trò: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách vai trò của đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static getMemberRoles = async (memberId) => {
    try {
      const memberRoles = await MemberRole.findAll({
        where: { member_id: memberId },
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name", "description"],
          },
        ],
        order: [["assigned_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách vai trò thành công",
        data: memberRoles,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách vai trò: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách đoàn viên có vai trò cụ thể
   * @param {number} roleId - ID vai trò
   * @param {Object} params - Tham số phân trang
   * @returns {Promise<Object>}
   */
  static getMembersByRole = async (
    roleId,
    { page = 1, limit = 10, search = "" }
  ) => {
    try {
      const offset = (page - 1) * limit;

      let memberWhere = {};
      if (search) {
        memberWhere[Op.or] = [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { code: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const { count, rows } = await MemberRole.findAndCountAll({
        where: { role_id: roleId },
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            where: memberWhere,
            attributes: {
              exclude: ["password_hash"],
            },
          },
          {
            model: Role,
            as: "role",
            attributes: ["id", "name", "description"],
          },
        ],
        order: [["assigned_at", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách đoàn viên theo vai trò thành công",
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
        `Lỗi khi lấy danh sách đoàn viên theo vai trò: ${error.message}`
      );
    }
  };

  /**
   * Thay đổi vai trò của đoàn viên (gỡ vai trò cũ, gán vai trò mới)
   * @param {number} memberId - ID đoàn viên
   * @param {number} oldRoleId - ID vai trò cũ
   * @param {number} newRoleId - ID vai trò mới
   * @returns {Promise<Object>}
   */
  static changeRole = async (memberId, oldRoleId, newRoleId) => {
    const transaction = await db.sequelize.transaction();

    try {
      // Kiểm tra đoàn viên có vai trò cũ không
      const oldMemberRole = await MemberRole.findOne({
        where: {
          member_id: memberId,
          role_id: oldRoleId,
        },
      });

      if (!oldMemberRole) {
        await transaction.rollback();
        return {
          code: 404,
          success: false,
          message: "Đoàn viên không có vai trò cũ này",
          data: null,
        };
      }

      // Kiểm tra vai trò mới có tồn tại
      const newRole = await Role.findByPk(newRoleId);
      if (!newRole) {
        await transaction.rollback();
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy vai trò mới",
          data: null,
        };
      }

      // Kiểm tra đã có vai trò mới chưa
      const existingNewRole = await MemberRole.findOne({
        where: {
          member_id: memberId,
          role_id: newRoleId,
        },
      });

      if (existingNewRole) {
        await transaction.rollback();
        return {
          code: 400,
          success: false,
          message: "Đoàn viên đã có vai trò mới này rồi",
          data: null,
        };
      }

      // Xóa vai trò cũ
      await oldMemberRole.destroy({ transaction });

      // Gán vai trò mới
      const newMemberRole = await MemberRole.create(
        {
          member_id: memberId,
          role_id: newRoleId,
        },
        { transaction }
      );

      await transaction.commit();

      // Lấy thông tin đầy đủ
      const fullMemberRole = await MemberRole.findByPk(newMemberRole.id, {
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "full_name"],
          },
          {
            model: Role,
            as: "role",
            attributes: ["id", "name", "description"],
          },
        ],
      });

      return {
        code: 200,
        success: true,
        message: "Thay đổi vai trò thành công",
        data: fullMemberRole,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Lỗi khi thay đổi vai trò: ${error.message}`);
    }
  };

  /**
   * Gán nhiều vai trò cho đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @param {Array<number>} roleIds - Danh sách ID vai trò
   * @returns {Promise<Object>}
   */
  static assignMultipleRoles = async (memberId, roleIds) => {
    const transaction = await db.sequelize.transaction();

    try {
      // Kiểm tra đoàn viên có tồn tại
      const member = await YouthUnionMember.findByPk(memberId);
      if (!member) {
        await transaction.rollback();
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy đoàn viên",
          data: null,
        };
      }

      const results = {
        success: [],
        failed: [],
      };

      for (const roleId of roleIds) {
        try {
          // Kiểm tra vai trò có tồn tại
          const role = await Role.findByPk(roleId);
          if (!role) {
            results.failed.push({
              roleId,
              reason: "Không tìm thấy vai trò",
            });
            continue;
          }

          // Kiểm tra đã có vai trò này chưa
          const existingRole = await MemberRole.findOne({
            where: {
              member_id: memberId,
              role_id: roleId,
            },
          });

          if (existingRole) {
            results.failed.push({
              roleId,
              reason: "Đã có vai trò này rồi",
            });
            continue;
          }

          // Gán vai trò
          await MemberRole.create(
            {
              member_id: memberId,
              role_id: roleId,
            },
            { transaction }
          );

          results.success.push(roleId);
        } catch (error) {
          results.failed.push({
            roleId,
            reason: error.message,
          });
        }
      }

      await transaction.commit();

      return {
        code: 200,
        success: true,
        message: `Gán vai trò hàng loạt hoàn tất. Thành công: ${results.success.length}, Thất bại: ${results.failed.length}`,
        data: results,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Lỗi khi gán nhiều vai trò: ${error.message}`);
    }
  };

  /**
   * Lấy thống kê vai trò
   * @returns {Promise<Object>}
   */
  static getRoleStatistics = async () => {
    try {
      const totalAssignments = await MemberRole.count();

      // Count members by role
      const byRole = await MemberRole.findAll({
        attributes: [
          "role_id",
          [db.sequelize.fn("COUNT", db.sequelize.col("member_id")), "count"],
        ],
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["name"],
          },
        ],
        group: ["role_id", "role.id", "role.name"],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê vai trò thành công",
        data: {
          totalAssignments,
          byRole,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê vai trò: ${error.message}`);
    }
  };
}

module.exports = MemberRoleService;
