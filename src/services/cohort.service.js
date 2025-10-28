"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const Cohort = db.Cohort;

/**
 * CohortService - Service quản lý Cohort
 * Kế thừa từ BaseService và sử dụng các phương thức CRUD chuẩn
 */
class CohortService extends BaseService {
  constructor() {
    super(Cohort, {
      entityName: "cohort",
      searchFields: ["name", "code"], // Các trường để search
      requiredFields: ["code", "name", "start_year"], // Các trường bắt buộc
      uniqueFields: ["code"], // Các trường unique cần check
      selectFields: ["id", "code", "name"], // Các trường cho dropdown/select
    });
  }

  // Wrapper methods để giữ API tương thích với code cũ
  static getAllCohorts = async () => {
    const instance = new CohortService();
    return await instance.getAll();
  };

  static getListCohorts = async (params) => {
    const instance = new CohortService();
    return await instance.getList(params);
  };

  static getCohortById = async (id) => {
    const instance = new CohortService();
    return await instance.getById(id);
  };

  static createOrUpdateCohort = async (data, id = null) => {
    const instance = new CohortService();
    return await instance.createOrUpdate(data, id);
  };

  static deleteCohort = async (id) => {
    const instance = new CohortService();
    return await instance.delete(id);
  };

  static deleteManyCohorts = async (ids) => {
    const instance = new CohortService();
    return await instance.deleteMany(ids);
  };

  static getSelectCohorts = async () => {
    const instance = new CohortService();
    return await instance.getSelect();
  };

  // ============================================================
  // CUSTOM METHODS - Thêm các phương thức đặc biệt cho Cohort ở đây
  // ============================================================

  /**
   * Ví dụ: Lấy cohort theo năm
   * @param {number} year - Năm bắt đầu
   * @returns {Promise<Object>}
   */
  static getCohortsByYear = async (year) => {
    const instance = new CohortService();
    try {
      const cohorts = await instance.model.findAll({
        where: { start_year: year },
        order: [["name", "ASC"]],
      });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách cohort năm ${year} thành công`,
        data: cohorts,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy cohort theo năm: ${error.message}`);
    }
  };
}

module.exports = CohortService;
