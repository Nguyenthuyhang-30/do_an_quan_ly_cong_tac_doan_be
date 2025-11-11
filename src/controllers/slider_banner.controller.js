"use strict";

const SliderBannerService = require("../services/slider_banner.service");

class SliderBannerController {
  /**
   * Lấy tất cả slider/banner
   */
  getAllSliderBanners = async (req, res) => {
    try {
      const result = await SliderBannerService.getAllSliderBanners();
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
   * Lấy danh sách slider/banner có phân trang
   */
  getListSliderBanners = async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      const result = await SliderBannerService.getListSliderBanners({
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
  getSelectSliderBanners = async (req, res) => {
    try {
      const result = await SliderBannerService.getSelectSliderBanners();
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
   * Lấy slider/banner theo ID
   */
  getSliderBannerById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SliderBannerService.getSliderBannerById(id);
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
   * Tạo slider/banner mới
   */
  createSliderBanner = async (req, res) => {
    try {
      const result = await SliderBannerService.createOrUpdateSliderBanner(
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
   * Cập nhật slider/banner
   */
  updateSliderBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SliderBannerService.createOrUpdateSliderBanner(
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
   * Xóa slider/banner
   */
  deleteSliderBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SliderBannerService.deleteSliderBanner(id);
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
   * Xóa nhiều slider/banner
   */
  deleteManySliderBanners = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await SliderBannerService.deleteManySliderBanners(ids);
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
   * Lấy slider cho trang chủ
   */
  getActiveSlidersForHome = async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      const result = await SliderBannerService.getActiveSlidersForHome(limit);
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
   * Cập nhật hình ảnh slider/banner
   */
  updateSliderImage = async (req, res) => {
    try {
      const { id } = req.params;
      const { imageUrl } = req.body;
      const result = await SliderBannerService.updateSliderImage(id, imageUrl);
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
   * Tìm kiếm slider/banner nâng cao
   */
  searchSliderBanners = async (req, res) => {
    try {
      const filters = req.query;
      const result = await SliderBannerService.searchSliderBanners(filters);
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
   * Lấy thống kê slider/banner
   */
  getSliderBannerStatistics = async (req, res) => {
    try {
      const result = await SliderBannerService.getSliderBannerStatistics();
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
   * Cập nhật thứ tự slider/banner
   */
  updateSliderOrder = async (req, res) => {
    try {
      const { orderData } = req.body;
      const result = await SliderBannerService.updateSliderOrder(orderData);
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

module.exports = new SliderBannerController();
