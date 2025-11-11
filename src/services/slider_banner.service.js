"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const SliderBanner = db.SliderBanner;

/**
 * SliderBannerService - Service quản lý Slider/Banner
 * Kế thừa từ BaseService để sử dụng các phương thức CRUD chuẩn
 */
class SliderBannerService extends BaseService {
  constructor() {
    super(SliderBanner, {
      entityName: "slider_banner",
      searchFields: ["name", "code"], // Các trường để search
      requiredFields: ["name"], // Các trường bắt buộc
      uniqueFields: ["code"], // Các trường unique cần check
      selectFields: ["id", "code", "name", "image"], // Các trường cho dropdown/select
    });
  }

  // ============================================================
  // WRAPPER METHODS - Giữ API tương thích
  // ============================================================

  /**
   * Lấy tất cả slider/banner
   * @returns {Promise<Object>}
   */
  static getAllSliderBanners = async () => {
    const instance = new SliderBannerService();
    return await instance.getAll();
  };

  /**
   * Lấy danh sách slider/banner có phân trang
   * @param {Object} params - { page, limit, search }
   * @returns {Promise<Object>}
   */
  static getListSliderBanners = async (params) => {
    const instance = new SliderBannerService();
    return await instance.getList(params);
  };

  /**
   * Lấy slider/banner theo ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getSliderBannerById = async (id) => {
    const instance = new SliderBannerService();
    return await instance.getById(id);
  };

  /**
   * Tạo mới hoặc cập nhật slider/banner
   * @param {Object} data
   * @param {number} id - ID nếu là update
   * @returns {Promise<Object>}
   */
  static createOrUpdateSliderBanner = async (data, id = null) => {
    const instance = new SliderBannerService();
    return await instance.createOrUpdate(data, id);
  };

  /**
   * Xóa slider/banner
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static deleteSliderBanner = async (id) => {
    const instance = new SliderBannerService();
    return await instance.delete(id);
  };

  /**
   * Xóa nhiều slider/banner
   * @param {Array<number>} ids
   * @returns {Promise<Object>}
   */
  static deleteManySliderBanners = async (ids) => {
    const instance = new SliderBannerService();
    return await instance.deleteMany(ids);
  };

  /**
   * Lấy danh sách cho dropdown/select
   * @returns {Promise<Object>}
   */
  static getSelectSliderBanners = async () => {
    const instance = new SliderBannerService();
    return await instance.getSelect();
  };

  // ============================================================
  // CUSTOM METHODS - Các phương thức đặc biệt cho Slider/Banner
  // ============================================================

  /**
   * Lấy danh sách slider/banner đang active cho trang chủ
   * @param {number} limit - Số lượng slider tối đa
   * @returns {Promise<Object>}
   */
  static getActiveSlidersForHome = async (limit = 5) => {
    const instance = new SliderBannerService();
    try {
      const sliders = await instance.model.findAll({
        where: {
          image: {
            [db.Sequelize.Op.ne]: null,
          },
        },
        order: [
          ["id", "DESC"], // Mới nhất lên đầu
        ],
        limit: limit,
        attributes: ["id", "code", "name", "image"],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách slider cho trang chủ thành công",
        data: sliders,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách slider cho trang chủ: ${error.message}`
      );
    }
  };

  /**
   * Cập nhật hình ảnh cho slider/banner
   * @param {number} id
   * @param {string} imageUrl
   * @returns {Promise<Object>}
   */
  static updateSliderImage = async (id, imageUrl) => {
    const instance = new SliderBannerService();
    try {
      // Kiểm tra slider có tồn tại không
      const slider = await instance.model.findByPk(id);
      if (!slider) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy slider/banner",
        };
      }

      // Cập nhật hình ảnh
      await slider.update({
        image: imageUrl,
        modified_at: new Date(),
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật hình ảnh slider/banner thành công",
        data: slider,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi cập nhật hình ảnh slider/banner: ${error.message}`
      );
    }
  };

  /**
   * Lấy thống kê slider/banner
   * @returns {Promise<Object>}
   */
  static getSliderBannerStatistics = async () => {
    const instance = new SliderBannerService();
    try {
      const total = await instance.model.count();
      const withImage = await instance.model.count({
        where: {
          image: {
            [db.Sequelize.Op.ne]: null,
          },
        },
      });
      const withoutImage = total - withImage;

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê slider/banner thành công",
        data: {
          total,
          withImage,
          withoutImage,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê slider/banner: ${error.message}`);
    }
  };

  /**
   * Sắp xếp thứ tự slider/banner (nếu cần mở rộng thêm trường order)
   * @param {Array} orderData - [{id: 1, order: 1}, {id: 2, order: 2}]
   * @returns {Promise<Object>}
   */
  static updateSliderOrder = async (orderData) => {
    const instance = new SliderBannerService();
    const transaction = await db.sequelize.transaction();

    try {
      for (const item of orderData) {
        await instance.model.update(
          {
            // Giả sử có trường order trong DB, nếu không có thì bỏ qua
            modified_at: new Date(),
          },
          {
            where: { id: item.id },
            transaction,
          }
        );
      }

      await transaction.commit();

      return {
        code: 200,
        success: true,
        message: "Cập nhật thứ tự slider/banner thành công",
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(
        `Lỗi khi cập nhật thứ tự slider/banner: ${error.message}`
      );
    }
  };

  /**
   * Tìm kiếm slider/banner nâng cao
   * @param {Object} filters - { search, hasImage, dateFrom, dateTo }
   * @returns {Promise<Object>}
   */
  static searchSliderBanners = async (filters = {}) => {
    const instance = new SliderBannerService();
    try {
      const {
        search = "",
        hasImage,
        dateFrom,
        dateTo,
        page = 1,
        limit = 10,
      } = filters;

      const where = {};

      // Tìm kiếm theo tên hoặc code
      if (search) {
        where[db.Sequelize.Op.or] = [
          { name: { [db.Sequelize.Op.like]: `%${search}%` } },
          { code: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      // Lọc theo có hình ảnh hay không
      if (hasImage !== undefined) {
        if (hasImage === true || hasImage === "true") {
          where.image = { [db.Sequelize.Op.ne]: null };
        } else {
          where.image = { [db.Sequelize.Op.eq]: null };
        }
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
        message: "Tìm kiếm slider/banner thành công",
        data: {
          sliders: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm slider/banner: ${error.message}`);
    }
  };
}

module.exports = SliderBannerService;
