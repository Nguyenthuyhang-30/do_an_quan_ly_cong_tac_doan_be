"use strict";

const db = require("../models/postgreSQL");
const Cohort = db.Cohort;
const { Op } = require("sequelize");

class CohortService {
  // GET-ALL: Lấy tất cả cohorts
  static getAllCohorts = async () => {
    try {
      const cohorts = await Cohort.findAll({
        order: [["created_at", "DESC"]],
      });
      return {
        code: 200,
        message: "Lấy danh sách cohort thành công",
        data: cohorts,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách cohort: ${error.message}`);
    }
  };

  // GET-LIST: Lấy danh sách có phân trang và tìm kiếm
  static getListCohorts = async ({ page = 1, limit = 10, search = "" }) => {
    try {
      const offset = (page - 1) * limit;
      const whereCondition = search
        ? {
            [Op.or]: [
              { name: { [Op.iLike]: `%${search}%` } },
              { code: { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {};

      const { count, rows } = await Cohort.findAndCountAll({
        where: whereCondition,
        order: [["created_at", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        code: 200,
        message: "Lấy danh sách cohort thành công",
        data: {
          cohorts: rows,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: parseInt(limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách cohort: ${error.message}`);
    }
  };

  // GET-BY-ID: Lấy cohort theo ID
  static getCohortById = async (id) => {
    try {
      const cohort = await Cohort.findByPk(id);
      if (!cohort) {
        return {
          code: 404,
          message: "Không tìm thấy cohort",
          data: null,
        };
      }

      return {
        code: 200,
        message: "Lấy thông tin cohort thành công",
        data: cohort,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin cohort: ${error.message}`);
    }
  };

  // CREATE-OR-UPDATE: Tạo mới hoặc cập nhật cohort
  static createOrUpdateCohort = async (data, id = null) => {
    try {
      // Validation dữ liệu đầu vào
      if (!data || typeof data !== 'object') {
        return {
          code: 400,
          message: "Dữ liệu không hợp lệ",
          data: null,
        };
      }

      // Kiểm tra các trường bắt buộc
      const requiredFields = ['code', 'name', 'start_year'];
      for (const field of requiredFields) {
        if (!data[field]) {
          return {
            code: 400,
            message: `Trường ${field} là bắt buộc`,
            data: null,
          };
        }
      }

      // Kiểm tra trùng code (trừ chính nó khi update)
      const existingCohort = await Cohort.findOne({
        where: {
          code: data.code,
          ...(id && { id: { [Op.ne]: id } }),
        },
      });

      if (existingCohort) {
        return {
          code: 400,
          message: "Mã cohort đã tồn tại",
          data: null,
        };
      }

      let cohort;
      let message;

      if (id) {
        // Update
        const existingRecord = await Cohort.findByPk(id);
        if (!existingRecord) {
          return {
            code: 404,
            message: "Không tìm thấy cohort để cập nhật",
            data: null,
          };
        }

        await Cohort.update(
          {
            ...data,
            modified_at: new Date(),
          },
          { where: { id } }
        );

        cohort = await Cohort.findByPk(id);
        message = "Cập nhật cohort thành công";
      } else {
        // Create
        cohort = await Cohort.create({
          ...data,
          created_at: new Date(),
          modified_at: new Date(),
        });
        message = "Tạo cohort thành công";
      }

      return {
        code: id ? 200 : 201,
        message,
        data: cohort,
      };
    } catch (error) {
      throw new Error(`Lỗi khi ${id ? "cập nhật" : "tạo"} cohort: ${error.message}`);
    }
  };

  // DELETE: Xóa cohort theo ID
  static deleteCohort = async (id) => {
    try {
      const cohort = await Cohort.findByPk(id);
      if (!cohort) {
        return {
          code: 404,
          message: "Không tìm thấy cohort để xóa",
          data: null,
        };
      }

      await Cohort.destroy({ where: { id } });

      return {
        code: 200,
        message: "Xóa cohort thành công",
        data: { id },
      };
    } catch (error) {
      throw new Error(`Lỗi khi xóa cohort: ${error.message}`);
    }
  };

  // DELETE-MANY: Xóa nhiều cohorts theo danh sách IDs
  static deleteManyCohorts = async (ids) => {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return {
          code: 400,
          message: "Danh sách ID không hợp lệ",
          data: null,
        };
      }

      const existingCohorts = await Cohort.findAll({
        where: { id: { [Op.in]: ids } },
      });

      if (existingCohorts.length === 0) {
        return {
          code: 404,
          message: "Không tìm thấy cohort nào để xóa",
          data: null,
        };
      }

      const deletedCount = await Cohort.destroy({
        where: { id: { [Op.in]: ids } },
      });

      return {
        code: 200,
        message: `Xóa thành công ${deletedCount} cohort`,
        data: {
          deletedIds: ids,
          deletedCount,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi xóa nhiều cohort: ${error.message}`);
    }
  };

  // GET-SELECT: Lấy danh sách cho dropdown/select (chỉ id, name, code)
  static getSelectCohorts = async () => {
    try {
      const cohorts = await Cohort.findAll({
        attributes: ["id", "code", "name"],
        order: [["name", "ASC"]],
      });

      return {
        code: 200,
        message: "Lấy danh sách cohort cho select thành công",
        data: cohorts,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách cohort cho select: ${error.message}`);
    }
  };
}

module.exports = CohortService;