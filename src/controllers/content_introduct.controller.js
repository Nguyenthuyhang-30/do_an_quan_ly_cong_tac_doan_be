"use strict";

const ContentIntroductService = require("../services/content_introduct.service");

class ContentIntroductController {
  /**
   * Lấy tất cả nội dung giới thiệu
   */
  getAllContentIntroducts = async (req, res) => {
    try {
      const result = await ContentIntroductService.getAllContentIntroducts();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Lấy danh sách nội dung có phân trang
   */
  getListContentIntroducts = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await ContentIntroductService.getListContentIntroducts({
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
      });
    }
  };

  /**
   * Lấy danh sách cho dropdown/select
   */
  getSelectContentIntroducts = async (req, res) => {
    try {
      const result = await ContentIntroductService.getSelectContentIntroducts();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Lấy nội dung theo ID
   */
  getContentIntroductById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ContentIntroductService.getContentIntroductById(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Lấy nội dung theo code
   */
  getContentByCode = async (req, res) => {
    try {
      const { code } = req.params;
      const result = await ContentIntroductService.getContentByCode(code);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Tạo nội dung mới
   */
  createContentIntroduct = async (req, res) => {
    try {
      const result =
        await ContentIntroductService.createOrUpdateContentIntroduct(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Cập nhật nội dung
   */
  updateContentIntroduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result =
        await ContentIntroductService.createOrUpdateContentIntroduct(
          req.body,
          id
        );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Cập nhật nội dung theo code
   */
  updateContentByCode = async (req, res) => {
    try {
      const { code } = req.params;
      const result = await ContentIntroductService.updateContentByCode(
        code,
        req.body
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Xóa nội dung
   */
  deleteContentIntroduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ContentIntroductService.deleteContentIntroduct(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Xóa nhiều nội dung
   */
  deleteManyContentIntroducts = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await ContentIntroductService.deleteManyContentIntroducts(
        ids
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Lấy nội dung cho trang chủ
   */
  getHomePageContents = async (req, res) => {
    try {
      const { codes } = req.query; // Có thể truyền vào danh sách codes
      const codeArray = codes ? codes.split(",") : undefined;
      const result = await ContentIntroductService.getHomePageContents(
        codeArray
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Tìm kiếm nội dung nâng cao
   */
  searchContentIntroducts = async (req, res) => {
    try {
      const filters = req.query;
      const result = await ContentIntroductService.searchContentIntroducts(
        filters
      );
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Lấy thống kê nội dung
   */
  getContentStatistics = async (req, res) => {
    try {
      const result = await ContentIntroductService.getContentStatistics();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Nhân bản nội dung
   */
  duplicateContent = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ContentIntroductService.duplicateContent(id);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = new ContentIntroductController();
