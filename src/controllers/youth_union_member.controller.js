"use strict";

const YouthUnionMemberService = require("../services/youth_union_member.service");

class YouthUnionMemberController {
  // ============================================================
  // CRUD BASIC OPERATIONS
  // ============================================================

  // GET-ALL: Lấy tất cả đoàn viên
  getAllMembers = async (req, res) => {
    try {
      const result = await YouthUnionMemberService.getAllYouthUnionMembers();
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
  getListMembers = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await YouthUnionMemberService.getListYouthUnionMembers({
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

  // GET-BY-ID: Lấy đoàn viên theo ID
  getMemberById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await YouthUnionMemberService.getYouthUnionMemberById(id);
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

  // CREATE: Tạo mới đoàn viên
  createMember = async (req, res) => {
    try {
      const result =
        await YouthUnionMemberService.createOrUpdateYouthUnionMember(req.body);
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

  // UPDATE: Cập nhật đoàn viên
  updateMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result =
        await YouthUnionMemberService.createOrUpdateYouthUnionMember(
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

  // DELETE: Xóa đoàn viên theo ID
  deleteMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await YouthUnionMemberService.deleteYouthUnionMember(id);
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

  // DELETE-MANY: Xóa nhiều đoàn viên
  deleteManyMembers = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await YouthUnionMemberService.deleteManyYouthUnionMembers(
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
  getSelectMembers = async (req, res) => {
    try {
      const result = await YouthUnionMemberService.getSelectYouthUnionMembers();
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

  // ============================================================
  // CUSTOM OPERATIONS
  // ============================================================

  // Lấy thông tin đầy đủ của đoàn viên
  getMemberFullProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await YouthUnionMemberService.getMemberFullProfile(id);
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

  // Tìm kiếm đoàn viên nâng cao
  searchMembers = async (req, res) => {
    try {
      const { page, limit, search, status, branchId, roleId, gender } =
        req.query;
      const result = await YouthUnionMemberService.searchMembers({
        page,
        limit,
        search,
        status: status !== undefined ? parseInt(status) : null,
        branchId: branchId ? parseInt(branchId) : null,
        roleId: roleId ? parseInt(roleId) : null,
        gender: gender !== undefined ? gender === "true" : null,
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

  // Lấy danh sách đoàn viên theo chi đoàn
  getMembersByBranch = async (req, res) => {
    try {
      const { branchId } = req.params;
      const { page, limit } = req.query;
      const result = await YouthUnionMemberService.getMembersByBranch(
        branchId,
        { page, limit }
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

  // Cập nhật trạng thái đoàn viên
  updateMemberStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await YouthUnionMemberService.updateMemberStatus(
        id,
        status
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

  // Lấy thống kê đoàn viên
  getMemberStatistics = async (req, res) => {
    try {
      const result = await YouthUnionMemberService.getMemberStatistics();
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

  // Lấy lịch sử hoạt động của đoàn viên
  getMemberActivityHistory = async (req, res) => {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;
      const result = await YouthUnionMemberService.getMemberActivityHistory(
        id,
        {
          page,
          limit,
        }
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
}

module.exports = new YouthUnionMemberController();
