"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const YouthUnionBranch = db.YouthUnionBranch;

/**
 * YouthUnionBranchService - Service quản lý youth_union_branch
 * Kế thừa từ BaseService và sử dụng các phương thức CRUD chuẩn
 */
class YouthUnionBranchService extends BaseService {
  constructor() {
    super(YouthUnionBranch, {
      entityName: "youth_union_branch",
      searchFields: ["name", "code"],
      // Theo model: code, name có allowNull = true nên không bắt buộc mặc định
      requiredFields: [],
      // Không mặc định unique, nếu muốn bật hãy thêm 'code' ở đây
      uniqueFields: [],
      selectFields: ["id", "code", "name"],
    });
  }

  // Wrapper methods để giữ API tương thích với các controller hiện tại
  static getAllYouthUnionBranches = async () => {
    const instance = new YouthUnionBranchService();
    return await instance.getAll();
  };

  static getListYouthUnionBranches = async (params) => {
    const instance = new YouthUnionBranchService();
    return await instance.getList(params);
  };

  static getYouthUnionBranchById = async (id) => {
    const instance = new YouthUnionBranchService();
    return await instance.getById(id);
  };

  static createOrUpdateYouthUnionBranch = async (data, id = null) => {
    const instance = new YouthUnionBranchService();
    return await instance.createOrUpdate(data, id);
  };

  static deleteYouthUnionBranch = async (id) => {
    const instance = new YouthUnionBranchService();
    return await instance.delete(id);
  };

  static deleteManyYouthUnionBranches = async (ids) => {
    const instance = new YouthUnionBranchService();
    return await instance.deleteMany(ids);
  };

  static getSelectYouthUnionBranches = async (
    customOrder = null,
    customWhere = {}
  ) => {
    const instance = new YouthUnionBranchService();
    return await instance.getSelect(customOrder, customWhere);
  };

  // Custom method: Lấy danh sách theo cohort_id
  static getByCohortId = async (cohortId) => {
    const instance = new YouthUnionBranchService();
    try {
      const where = { cohort_id: cohortId };
      const branches = await instance.model.findAll({
        where,
        order: [["name", "ASC"]],
      });
      return {
        code: 200,
        success: true,
        message: `Lấy danh sách youth_union_branch theo cohort_id=${cohortId} thành công`,
        data: branches,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy youth_union_branch theo cohort_id: ${error.message}`
      );
    }
  };
}

module.exports = YouthUnionBranchService;
