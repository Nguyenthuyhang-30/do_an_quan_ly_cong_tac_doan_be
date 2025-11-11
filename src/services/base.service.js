"use strict";

const { Op } = require("sequelize");

/**
 * BaseService - Class cơ sở cho tất cả các Service
 * Cung cấp các phương thức CRUD chuẩn, có thể được override bởi các class con
 */
class BaseService {
  /**
   * @param {Object} model - Sequelize model
   * @param {Object} options - Cấu hình cho service
   * @param {Array<string>} options.searchFields - Các trường để search (default: ['name'])
   * @param {Array<string>} options.requiredFields - Các trường bắt buộc khi tạo/update (default: [])
   * @param {Array<string>} options.uniqueFields - Các trường unique cần kiểm tra (default: [])
   * @param {Array<string>} options.selectFields - Các trường cho dropdown/select (default: ['id', 'name'])
   * @param {string} options.entityName - Tên entity hiển thị trong message (default: lấy từ model name)
   */
  constructor(model, options = {}) {
    this.model = model;
    this.entityName = options.entityName || model?.name?.toLowerCase();
    this.searchFields = options.searchFields || ["name"];
    this.requiredFields = options.requiredFields || [];
    this.uniqueFields = options.uniqueFields || [];
    this.selectFields = options.selectFields || ["id", "name"];
  }

  /**
   * GET-ALL: Lấy tất cả records
   * @param {Object} customOrder - Tùy chỉnh order (default: [["created_at", "DESC"]])
   * @returns {Promise<Object>}
   */
  async getAll(customOrder = null) {
    try {
      const order = customOrder || [["created_at", "DESC"]];
      const records = await this.model.findAll({ order });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách ${this.entityName} thành công`,
        data: records,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách ${this.entityName}: ${error.message}`
      );
    }
  }

  /**
   * GET-LIST: Lấy danh sách có phân trang và tìm kiếm
   * @param {Object} params
   * @param {number} params.page - Trang hiện tại
   * @param {number} params.limit - Số lượng items mỗi trang
   * @param {string} params.search - Từ khóa tìm kiếm
   * @param {Object} params.customWhere - Điều kiện where tùy chỉnh
   * @param {Array} params.customOrder - Order tùy chỉnh
   * @returns {Promise<Object>}
   */
  async getList({
    page = 1,
    limit = 10,
    search = "",
    customWhere = null,
    customOrder = null,
  }) {
    try {
      const offset = (page - 1) * limit;

      // Build where condition
      let whereCondition = {};

      // Thêm search condition
      if (search && this.searchFields.length > 0) {
        whereCondition[Op.or] = this.searchFields.map((field) => ({
          [field]: { [Op.iLike]: `%${search}%` },
        }));
      }

      // Merge với custom where nếu có
      if (customWhere) {
        whereCondition = { ...whereCondition, ...customWhere };
      }

      const order = customOrder || [["created_at", "DESC"]];

      const { count, rows } = await this.model.findAndCountAll({
        where: whereCondition,
        order,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách ${this.entityName} thành công`,
        data: {
          list: rows,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: parseInt(limit),
          },
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách ${this.entityName}: ${error.message}`
      );
    }
  }

  /**
   * GET-BY-ID: Lấy record theo ID
   * @param {number|string} id - ID của record
   * @param {Object} options - Tùy chọn (include, attributes,...)
   * @returns {Promise<Object>}
   */
  async getById(id, options = {}) {
    try {
      const record = await this.model.findByPk(id, options);

      if (!record) {
        return {
          code: 404,
          success: false,
          message: `Không tìm thấy ${this.entityName}`,
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: `Lấy thông tin ${this.entityName} thành công`,
        data: record,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy thông tin ${this.entityName}: ${error.message}`
      );
    }
  }

  /**
   * Validate dữ liệu đầu vào
   * @param {Object} data - Dữ liệu cần validate
   * @returns {Object|null} - Trả về object lỗi hoặc null nếu hợp lệ
   */
  validateData(data) {
    if (!data || typeof data !== "object") {
      return {
        code: 400,
        success: false,
        message: "Dữ liệu không hợp lệ",
        data: null,
      };
    }

    // Kiểm tra các trường bắt buộc
    for (const field of this.requiredFields) {
      if (!data[field]) {
        return {
          code: 400,
          success: false,
          message: `Trường ${field} là bắt buộc`,
          data: null,
        };
      }
    }

    return null;
  }

  /**
   * Kiểm tra unique fields
   * @param {Object} data - Dữ liệu cần kiểm tra
   * @param {number|string} excludeId - ID cần loại trừ (khi update)
   * @returns {Promise<Object|null>} - Trả về object lỗi hoặc null nếu hợp lệ
   */
  async checkUniqueFields(data, excludeId = null) {
    for (const field of this.uniqueFields) {
      if (data[field]) {
        const whereCondition = {
          [field]: data[field],
        };

        if (excludeId) {
          whereCondition.id = { [Op.ne]: excludeId };
        }

        const existingRecord = await this.model.findOne({
          where: whereCondition,
        });

        if (existingRecord) {
          return {
            code: 400,
            success: false,
            message: `${field} đã tồn tại`,
            data: null,
          };
        }
      }
    }

    return null;
  }

  /**
   * CREATE-OR-UPDATE: Tạo mới hoặc cập nhật record
   * @param {Object} data - Dữ liệu
   * @param {number|string} id - ID (null nếu tạo mới)
   * @returns {Promise<Object>}
   */
  async createOrUpdate(data, id = null) {
    try {
      // Validation dữ liệu
      const validationError = this.validateData(data);
      if (validationError) return validationError;

      // Kiểm tra unique fields
      const uniqueError = await this.checkUniqueFields(data, id);
      if (uniqueError) return uniqueError;

      let record;
      let message;

      if (id) {
        // Update
        const existingRecord = await this.model.findByPk(id);
        if (!existingRecord) {
          return {
            code: 404,
            success: false,
            message: `Không tìm thấy ${this.entityName} để cập nhật`,
            data: null,
          };
        }

        await this.model.update(
          {
            ...data,
            modified_at: new Date(),
          },
          { where: { id } }
        );

        record = await this.model.findByPk(id);
        message = `Cập nhật ${this.entityName} thành công`;
      } else {
        // Create
        record = await this.model.create({
          ...data,
          created_at: new Date(),
          modified_at: new Date(),
        });
        message = `Tạo ${this.entityName} thành công`;
      }

      return {
        code: id ? 200 : 201,
        success: true,
        message,
        data: record,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi ${id ? "cập nhật" : "tạo"} ${this.entityName}: ${
          error.message
        }`
      );
    }
  }

  /**
   * DELETE: Xóa record theo ID
   * @param {number|string} id - ID của record
   * @returns {Promise<Object>}
   */
  async delete(id) {
    try {
      const record = await this.model.findByPk(id);

      if (!record) {
        return {
          code: 404,
          success: false,
          message: `Không tìm thấy ${this.entityName} để xóa`,
          data: null,
        };
      }

      await this.model.destroy({ where: { id } });

      return {
        code: 200,
        success: true,
        message: `Xóa ${this.entityName} thành công`,
        data: { id },
      };
    } catch (error) {
      throw new Error(`Lỗi khi xóa ${this.entityName}: ${error.message}`);
    }
  }

  /**
   * DELETE-MANY: Xóa nhiều records theo danh sách IDs
   * @param {Array<number|string>} ids - Mảng IDs
   * @returns {Promise<Object>}
   */
  async deleteMany(ids) {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return {
          code: 400,
          success: false,
          message: "Danh sách ID không hợp lệ",
          data: null,
        };
      }

      const existingRecords = await this.model.findAll({
        where: { id: { [Op.in]: ids } },
      });

      if (existingRecords.length === 0) {
        return {
          code: 404,
          success: false,
          message: `Không tìm thấy ${this.entityName} nào để xóa`,
          data: null,
        };
      }

      const deletedCount = await this.model.destroy({
        where: { id: { [Op.in]: ids } },
      });

      return {
        code: 200,
        success: true,
        message: `Xóa thành công ${deletedCount} ${this.entityName}`,
        data: {
          deletedIds: ids,
          deletedCount,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi xóa nhiều ${this.entityName}: ${error.message}`);
    }
  }

  /**
   * GET-SELECT: Lấy danh sách cho dropdown/select
   * @param {Object} customOrder - Tùy chỉnh order
   * @param {Object} customWhere - Điều kiện where tùy chỉnh
   * @returns {Promise<Object>}
   */
  async getSelect(customOrder = null, customWhere = {}) {
    try {
      const order = customOrder || [["name", "ASC"]];

      const records = await this.model.findAll({
        attributes: this.selectFields,
        where: customWhere,
        order,
      });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách ${this.entityName} cho select thành công`,
        data: records,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách ${this.entityName} cho select: ${error.message}`
      );
    }
  }

  /**
   * COUNT: Đếm số lượng records
   * @param {Object} whereCondition - Điều kiện where
   * @returns {Promise<number>}
   */
  async count(whereCondition = {}) {
    try {
      return await this.model.count({ where: whereCondition });
    } catch (error) {
      throw new Error(`Lỗi khi đếm ${this.entityName}: ${error.message}`);
    }
  }

  /**
   * EXISTS: Kiểm tra sự tồn tại của record
   * @param {Object} whereCondition - Điều kiện where
   * @returns {Promise<boolean>}
   */
  async exists(whereCondition) {
    try {
      const count = await this.model.count({ where: whereCondition });
      return count > 0;
    } catch (error) {
      throw new Error(
        `Lỗi khi kiểm tra tồn tại ${this.entityName}: ${error.message}`
      );
    }
  }
}

module.exports = BaseService;
