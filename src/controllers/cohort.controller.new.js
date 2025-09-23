"use strict";

const CohortService = require("../services/cohort.service");

class CohortController {
  // GET-ALL: Lấy tất cả cohorts
  getAllCohorts = async (req, res) => {
    try {
      const result = await CohortService.getAllCohorts();
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
  getListCohorts = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await CohortService.getListCohorts({
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

  // GET-BY-ID: Lấy cohort theo ID
  getCohortById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CohortService.getCohortById(id);
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

  // CREATE: Tạo mới cohort
  createCohort = async (req, res) => {
    try {
      const result = await CohortService.createOrUpdateCohort(req.body);
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

  // UPDATE: Cập nhật cohort
  updateCohort = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CohortService.createOrUpdateCohort(req.body, id);
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

  // DELETE: Xóa cohort theo ID
  deleteCohort = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CohortService.deleteCohort(id);
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

  // DELETE-MANY: Xóa nhiều cohorts
  deleteManyCohorts = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await CohortService.deleteManyCohorts(ids);
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
  getSelectCohorts = async (req, res) => {
    try {
      const result = await CohortService.getSelectCohorts();
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

module.exports = new CohortController();
