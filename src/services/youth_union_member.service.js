"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const YouthUnionMember = db.YouthUnionMember;

/**
 * YouthUnionMemberService - Service quản lý youth_union_branch
 * Kế thừa từ BaseService và sử dụng các phương thức CRUD chuẩn
 */
class YouthUnionMemberService extends BaseService {
  constructor() {
    super(YouthUnionMember, {
      entityName: "youth_union_member",
      searchFields: ["user_name", "code"],
      // Theo model: code, name có allowNull = true nên không bắt buộc mặc định
      requiredFields: [],
      // Không mặc định unique, nếu muốn bật hãy thêm 'code' ở đây
      uniqueFields: [],
      selectFields: ["id", "code", "user_name"],
    });
  }

  // Wrapper methods để giữ API tương thích với các controller hiện tại
  static getAllYouthUnionMembers = async () => {
    const instance = new YouthUnionMemberService();
    return await instance.getAll();
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

  static getSelectYouthUnionMembers = async (
    customOrder = null,
    customWhere = {}
  ) => {
    const instance = new YouthUnionMemberService();
    return await instance.getSelect(customOrder, customWhere);
  };
}

module.exports = YouthUnionMemberService;
