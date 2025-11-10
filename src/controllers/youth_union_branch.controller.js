"use strict";

const YouthUnionBranchService = require("../services/youth_union_branch.service");

class YouthUnionBranchController {
  // GET-ALL: Lấy tất cả YouthUnionBranchs
  getAllYouthUnionBranchs = async (req, res) => {
    try {
      const result = await YouthUnionBranchService.getAllYouthUnionBranches();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-LIST: Lấy danh sách có phân trang và tìm kiếm
  getListYouthUnionBranchs = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await YouthUnionBranchService.getListYouthUnionBranches({
        page,
        limit,
        search,
      });
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-BY-ID: Lấy YouthUnionBranch theo ID
  getYouthUnionBranchById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await YouthUnionBranchService.getYouthUnionBranchById(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // CREATE: Tạo mới YouthUnionBranch
  createYouthUnionBranch = async (req, res) => {
    try {
      const result =
        await YouthUnionBranchService.createOrUpdateYouthUnionBranch(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // UPDATE: Cập nhật YouthUnionBranch
  updateYouthUnionBranch = async (req, res) => {
    try {
      const { id } = req.params;
      const result =
        await YouthUnionBranchService.createOrUpdateYouthUnionBranch(
          req.body,
          id
        );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // DELETE: Xóa YouthUnionBranch theo ID
  deleteYouthUnionBranch = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await YouthUnionBranchService.deleteYouthUnionBranch(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // DELETE-MANY: Xóa nhiều YouthUnionBranchs
  deleteManyYouthUnionBranchs = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await YouthUnionBranchService.deleteManyYouthUnionBranches(
        ids
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // GET-SELECT: Lấy danh sách cho dropdown/select
  getSelectYouthUnionBranchs = async (req, res) => {
    try {
      const result =
        await YouthUnionBranchService.getSelectYouthUnionBranches();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
}

module.exports = new YouthUnionBranchController();
