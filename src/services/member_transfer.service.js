"use strict";

const db = require("../models");
const { Op } = require("sequelize");

const YouthUnionMemberBranchHistory = db.YouthUnionMemberBranchHistory;
const YouthUnionMember = db.YouthUnionMember;
const YouthUnionBranch = db.YouthUnionBranch;

/**
 * MemberTransferService - Service quản lý điều chuyển công tác
 * Quản lý lịch sử chi đoàn của đoàn viên
 */
class MemberTransferService {
  /**
   * Điều chuyển đoàn viên sang chi đoàn mới
   * @param {Object} data - Thông tin điều chuyển
   * @returns {Promise<Object>}
   */
  static transferMember = async ({
    memberId,
    branchId,
    position = null,
    startDate = new Date(),
    note = null,
    createdBy = null,
  }) => {
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

      // Kiểm tra chi đoàn có tồn tại
      const branch = await YouthUnionBranch.findByPk(branchId);
      if (!branch) {
        await transaction.rollback();
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy chi đoàn",
          data: null,
        };
      }

      // Kết thúc lịch sử chi đoàn hiện tại
      await YouthUnionMemberBranchHistory.update(
        {
          status: 0, // Inactive
          end_date: startDate,
        },
        {
          where: {
            member_id: memberId,
            status: 1, // Active
          },
          transaction,
        }
      );

      // Tạo lịch sử chi đoàn mới
      const newHistory = await YouthUnionMemberBranchHistory.create(
        {
          member_id: memberId,
          branch_id: branchId,
          position,
          start_date: startDate,
          status: 1, // Active
          note,
          created_by: createdBy,
        },
        { transaction }
      );

      await transaction.commit();

      // Lấy thông tin đầy đủ
      const fullHistory = await YouthUnionMemberBranchHistory.findByPk(
        newHistory.id,
        {
          include: [
            {
              model: YouthUnionMember,
              as: "member",
              attributes: ["id", "code", "full_name"],
            },
            {
              model: YouthUnionBranch,
              as: "branch",
              attributes: ["id", "code", "name"],
            },
          ],
        }
      );

      return {
        code: 201,
        success: true,
        message: "Điều chuyển đoàn viên thành công",
        data: fullHistory,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Lỗi khi điều chuyển đoàn viên: ${error.message}`);
    }
  };

  /**
   * Lấy lịch sử điều chuyển của đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @param {Object} params - Tham số phân trang
   * @returns {Promise<Object>}
   */
  static getMemberTransferHistory = async (
    memberId,
    { page = 1, limit = 10 }
  ) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } =
        await YouthUnionMemberBranchHistory.findAndCountAll({
          where: { member_id: memberId },
          include: [
            {
              model: YouthUnionBranch,
              as: "branch",
              attributes: ["id", "code", "name"],
            },
          ],
          order: [["start_date", "DESC"]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        });

      return {
        code: 200,
        success: true,
        message: "Lấy lịch sử điều chuyển thành công",
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
      throw new Error(`Lỗi khi lấy lịch sử điều chuyển: ${error.message}`);
    }
  };

  /**
   * Lấy chi đoàn hiện tại của đoàn viên
   * @param {number} memberId - ID đoàn viên
   * @returns {Promise<Object>}
   */
  static getCurrentBranch = async (memberId) => {
    try {
      const currentHistory = await YouthUnionMemberBranchHistory.findOne({
        where: {
          member_id: memberId,
          status: 1, // Active
        },
        include: [
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "code", "name"],
          },
        ],
      });

      if (!currentHistory) {
        return {
          code: 404,
          success: false,
          message: "Đoàn viên chưa được phân công chi đoàn",
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: "Lấy chi đoàn hiện tại thành công",
        data: currentHistory,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy chi đoàn hiện tại: ${error.message}`);
    }
  };

  /**
   * Cập nhật thông tin điều chuyển
   * @param {number} id - ID lịch sử điều chuyển
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise<Object>}
   */
  static updateTransferHistory = async (id, data) => {
    try {
      const history = await YouthUnionMemberBranchHistory.findByPk(id);

      if (!history) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy lịch sử điều chuyển",
          data: null,
        };
      }

      await history.update(data);

      const updatedHistory = await YouthUnionMemberBranchHistory.findByPk(id, {
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "full_name"],
          },
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "code", "name"],
          },
        ],
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật lịch sử điều chuyển thành công",
        data: updatedHistory,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật lịch sử điều chuyển: ${error.message}`);
    }
  };

  /**
   * Kết thúc điều chuyển hiện tại
   * @param {number} memberId - ID đoàn viên
   * @param {Date} endDate - Ngày kết thúc
   * @returns {Promise<Object>}
   */
  static endCurrentTransfer = async (memberId, endDate = new Date()) => {
    try {
      const currentHistory = await YouthUnionMemberBranchHistory.findOne({
        where: {
          member_id: memberId,
          status: 1, // Active
        },
      });

      if (!currentHistory) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy điều chuyển đang hoạt động",
          data: null,
        };
      }

      await currentHistory.update({
        status: 0,
        end_date: endDate,
      });

      return {
        code: 200,
        success: true,
        message: "Kết thúc điều chuyển thành công",
        data: currentHistory,
      };
    } catch (error) {
      throw new Error(`Lỗi khi kết thúc điều chuyển: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách điều chuyển trong khoảng thời gian
   * @param {Object} params - Tham số
   * @returns {Promise<Object>}
   */
  static getTransfersByDateRange = async ({
    startDate,
    endDate,
    branchId = null,
    page = 1,
    limit = 10,
  }) => {
    try {
      const offset = (page - 1) * limit;

      let whereCondition = {
        start_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      };

      if (branchId) {
        whereCondition.branch_id = branchId;
      }

      const { count, rows } =
        await YouthUnionMemberBranchHistory.findAndCountAll({
          where: whereCondition,
          include: [
            {
              model: YouthUnionMember,
              as: "member",
              attributes: ["id", "code", "full_name"],
            },
            {
              model: YouthUnionBranch,
              as: "branch",
              attributes: ["id", "code", "name"],
            },
          ],
          order: [["start_date", "DESC"]],
          limit: parseInt(limit),
          offset: parseInt(offset),
        });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách điều chuyển theo thời gian thành công",
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
        `Lỗi khi lấy danh sách điều chuyển theo thời gian: ${error.message}`
      );
    }
  };

  /**
   * Lấy thống kê điều chuyển
   * @returns {Promise<Object>}
   */
  static getTransferStatistics = async () => {
    try {
      const total = await YouthUnionMemberBranchHistory.count();
      const active = await YouthUnionMemberBranchHistory.count({
        where: { status: 1 },
      });

      // Count by branch
      const byBranch = await YouthUnionMemberBranchHistory.findAll({
        where: { status: 1 },
        attributes: [
          "branch_id",
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
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
        message: "Lấy thống kê điều chuyển thành công",
        data: {
          total,
          active,
          byBranch,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê điều chuyển: ${error.message}`);
    }
  };
}

module.exports = MemberTransferService;
