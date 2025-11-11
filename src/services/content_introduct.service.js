"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const ContentIntroduct = db.ContentIntroduct;

/**
 * ContentIntroductService - Service quản lý nội dung giới thiệu
 * Kế thừa từ BaseService để sử dụng các phương thức CRUD chuẩn
 */
class ContentIntroductService extends BaseService {
  constructor() {
    super(ContentIntroduct, {
      entityName: "content_introduct",
      searchFields: ["title", "code", "content"], // Các trường để search
      requiredFields: ["title"], // Các trường bắt buộc
      uniqueFields: ["code"], // Các trường unique cần check
      selectFields: ["id", "code", "title"], // Các trường cho dropdown/select
    });
  }

  // ============================================================
  // WRAPPER METHODS - Giữ API tương thích
  // ============================================================

  /**
   * Lấy tất cả nội dung giới thiệu
   * @returns {Promise<Object>}
   */
  static getAllContentIntroducts = async () => {
    const instance = new ContentIntroductService();
    return await instance.getAll();
  };

  /**
   * Lấy danh sách nội dung giới thiệu có phân trang
   * @param {Object} params - { page, limit, search }
   * @returns {Promise<Object>}
   */
  static getListContentIntroducts = async (params) => {
    const instance = new ContentIntroductService();
    return await instance.getList(params);
  };

  /**
   * Lấy nội dung giới thiệu theo ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getContentIntroductById = async (id) => {
    const instance = new ContentIntroductService();
    return await instance.getById(id);
  };

  /**
   * Tạo mới hoặc cập nhật nội dung giới thiệu
   * @param {Object} data
   * @param {number} id - ID nếu là update
   * @returns {Promise<Object>}
   */
  static createOrUpdateContentIntroduct = async (data, id = null) => {
    const instance = new ContentIntroductService();
    return await instance.createOrUpdate(data, id);
  };

  /**
   * Xóa nội dung giới thiệu
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static deleteContentIntroduct = async (id) => {
    const instance = new ContentIntroductService();
    return await instance.delete(id);
  };

  /**
   * Xóa nhiều nội dung giới thiệu
   * @param {Array<number>} ids
   * @returns {Promise<Object>}
   */
  static deleteManyContentIntroducts = async (ids) => {
    const instance = new ContentIntroductService();
    return await instance.deleteMany(ids);
  };

  /**
   * Lấy danh sách cho dropdown/select
   * @returns {Promise<Object>}
   */
  static getSelectContentIntroducts = async () => {
    const instance = new ContentIntroductService();
    return await instance.getSelect();
  };

  // ============================================================
  // CUSTOM METHODS - Các phương thức đặc biệt
  // ============================================================

  /**
   * Lấy nội dung giới thiệu theo code
   * @param {string} code - Mã nội dung (ví dụ: 'about-us', 'mission', 'vision')
   * @returns {Promise<Object>}
   */
  static getContentByCode = async (code) => {
    const instance = new ContentIntroductService();
    try {
      const content = await instance.model.findOne({
        where: { code },
      });

      if (!content) {
        return {
          code: 404,
          success: false,
          message: `Không tìm thấy nội dung với mã ${code}`,
        };
      }

      return {
        code: 200,
        success: true,
        message: "Lấy nội dung thành công",
        data: content,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy nội dung theo code: ${error.message}`);
    }
  };

  /**
   * Lấy nội dung giới thiệu cho trang chủ (các section chính)
   * @param {Array<string>} codes - Danh sách mã cần lấy
   * @returns {Promise<Object>}
   */
  static getHomePageContents = async (
    codes = ["about-us", "mission", "vision", "values"]
  ) => {
    const instance = new ContentIntroductService();
    try {
      const contents = await instance.model.findAll({
        where: {
          code: {
            [db.Sequelize.Op.in]: codes,
          },
        },
        order: [["id", "ASC"]],
      });

      // Chuyển đổi thành object với key là code
      const contentMap = {};
      contents.forEach((content) => {
        contentMap[content.code] = content;
      });

      return {
        code: 200,
        success: true,
        message: "Lấy nội dung trang chủ thành công",
        data: contentMap,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy nội dung trang chủ: ${error.message}`);
    }
  };

  /**
   * Cập nhật nội dung theo code (dùng cho CMS)
   * @param {string} code
   * @param {Object} data - { title, content }
   * @returns {Promise<Object>}
   */
  static updateContentByCode = async (code, data) => {
    const instance = new ContentIntroductService();
    try {
      const content = await instance.model.findOne({
        where: { code },
      });

      if (!content) {
        // Nếu chưa có thì tạo mới
        const newContent = await instance.model.create({
          code,
          title: data.title,
          content: data.content,
          created_at: new Date(),
        });

        return {
          code: 201,
          success: true,
          message: "Tạo nội dung mới thành công",
          data: newContent,
        };
      }

      // Nếu có rồi thì update
      await content.update({
        title: data.title || content.title,
        content: data.content || content.content,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật nội dung thành công",
        data: content,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật nội dung theo code: ${error.message}`);
    }
  };

  /**
   * Tìm kiếm nội dung nâng cao
   * @param {Object} filters - { search, dateFrom, dateTo, page, limit }
   * @returns {Promise<Object>}
   */
  static searchContentIntroducts = async (filters = {}) => {
    const instance = new ContentIntroductService();
    try {
      const { search = "", dateFrom, dateTo, page = 1, limit = 10 } = filters;

      const where = {};

      // Tìm kiếm theo title, code, content
      if (search) {
        where[db.Sequelize.Op.or] = [
          { title: { [db.Sequelize.Op.like]: `%${search}%` } },
          { code: { [db.Sequelize.Op.like]: `%${search}%` } },
          { content: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      // Lọc theo ngày tạo
      if (dateFrom || dateTo) {
        where.created_at = {};
        if (dateFrom) {
          where.created_at[db.Sequelize.Op.gte] = new Date(dateFrom);
        }
        if (dateTo) {
          where.created_at[db.Sequelize.Op.lte] = new Date(dateTo);
        }
      }

      const offset = (page - 1) * limit;

      const { rows, count } = await instance.model.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: offset,
        order: [["created_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Tìm kiếm nội dung giới thiệu thành công",
        data: {
          contents: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm nội dung giới thiệu: ${error.message}`);
    }
  };

  /**
   * Lấy thống kê nội dung giới thiệu
   * @returns {Promise<Object>}
   */
  static getContentStatistics = async () => {
    const instance = new ContentIntroductService();
    try {
      const total = await instance.model.count();
      const withContent = await instance.model.count({
        where: {
          content: {
            [db.Sequelize.Op.ne]: null,
            [db.Sequelize.Op.ne]: "",
          },
        },
      });
      const withoutContent = total - withContent;

      // Đếm số lượng theo loại content (nếu có)
      const recentContents = await instance.model.findAll({
        order: [["created_at", "DESC"]],
        limit: 5,
        attributes: ["id", "code", "title", "created_at"],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê nội dung giới thiệu thành công",
        data: {
          total,
          withContent,
          withoutContent,
          recentContents,
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy thống kê nội dung giới thiệu: ${error.message}`
      );
    }
  };

  /**
   * Nhân bản nội dung (duplicate content)
   * @param {number} id - ID nội dung cần nhân bản
   * @returns {Promise<Object>}
   */
  static duplicateContent = async (id) => {
    const instance = new ContentIntroductService();
    try {
      const original = await instance.model.findByPk(id);
      if (!original) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy nội dung gốc",
        };
      }

      // Tạo bản sao với code mới
      const duplicated = await instance.model.create({
        code: `${original.code}_copy_${Date.now()}`,
        title: `${original.title} (Copy)`,
        content: original.content,
        created_at: new Date(),
      });

      return {
        code: 201,
        success: true,
        message: "Nhân bản nội dung thành công",
        data: duplicated,
      };
    } catch (error) {
      throw new Error(`Lỗi khi nhân bản nội dung: ${error.message}`);
    }
  };
}

module.exports = ContentIntroductService;
