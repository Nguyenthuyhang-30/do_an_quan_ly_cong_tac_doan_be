"use strict";

const BaseService = require("./base.service");
const db = require("../models");
// TODO: Import model của bạn
// const YourModel = db.YourModel;

/**
 * YourService - Service quản lý [Tên Entity]
 * Kế thừa từ BaseService và sử dụng các phương thức CRUD chuẩn
 *
 * @example
 * // Sử dụng trong controller:
 * const result = await YourService.getList({ page: 1, limit: 10 });
 */
class YourService extends BaseService {
  constructor() {
    // TODO: Thay YourModel bằng model thực tế
    super(YourModel, {
      // Tên entity (hiển thị trong message response)
      entityName: "your_entity",

      // Các trường sẽ được search khi dùng getList (dùng ILIKE %keyword%)
      searchFields: ["name", "code"],

      // Các trường bắt buộc khi create/update
      requiredFields: ["name", "code"],

      // Các trường unique cần kiểm tra trùng lặp
      uniqueFields: ["code"],

      // Các trường trả về khi dùng getSelect (cho dropdown)
      selectFields: ["id", "name", "code"],
    });
  }

  // ============================================================
  // WRAPPER METHODS - Giữ API tương thích với static methods
  // ============================================================

  static getAll = async () => {
    const instance = new YourService();
    return await instance.getAll();
  };

  static getList = async (params) => {
    const instance = new YourService();
    return await instance.getList(params);
  };

  static getById = async (id) => {
    const instance = new YourService();
    return await instance.getById(id);
  };

  static createOrUpdate = async (data, id = null) => {
    const instance = new YourService();
    return await instance.createOrUpdate(data, id);
  };

  static delete = async (id) => {
    const instance = new YourService();
    return await instance.delete(id);
  };

  static deleteMany = async (ids) => {
    const instance = new YourService();
    return await instance.deleteMany(ids);
  };

  static getSelect = async () => {
    const instance = new YourService();
    return await instance.getSelect();
  };

  // ============================================================
  // CUSTOM METHODS - Thêm các phương thức đặc biệt ở đây
  // ============================================================

  /**
   * Ví dụ: Custom method để lấy theo status
   * @param {string} status - Trạng thái
   * @returns {Promise<Object>}
   */
  static getByStatus = async (status) => {
    const instance = new YourService();
    try {
      const records = await instance.model.findAll({
        where: { status },
        order: [["created_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách ${instance.entityName} theo trạng thái thành công`,
        data: records,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy ${instance.entityName} theo trạng thái: ${error.message}`
      );
    }
  };

  /**
   * Ví dụ: Override validation để thêm logic riêng
   * @param {Object} data - Dữ liệu cần validate
   * @returns {Object|null}
   */
  validateData(data) {
    // Custom validation
    // Ví dụ: Kiểm tra giá trị số phải > 0
    // if (data.amount && data.amount <= 0) {
    //   return {
    //     code: 400,
    //     success: false,
    //     message: "Số lượng phải lớn hơn 0",
    //     data: null,
    //   };
    // }

    // Gọi parent validation
    return super.validateData(data);
  }

  /**
   * Ví dụ: Override createOrUpdate để thêm logic before/after
   * @param {Object} data - Dữ liệu
   * @param {number|string} id - ID (null nếu tạo mới)
   * @returns {Promise<Object>}
   */
  // async createOrUpdate(data, id = null) {
  //   // Logic before create/update
  //   console.log("Before create/update:", data);
  //
  //   // Call parent method
  //   const result = await super.createOrUpdate(data, id);
  //
  //   // Logic after create/update
  //   if (result.success) {
  //     console.log("Created/Updated successfully:", result.data);
  //   }
  //
  //   return result;
  // }
}

module.exports = YourService;
