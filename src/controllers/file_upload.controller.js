"use strict";

const FileUploadService = require("../services/file_upload.service");

class FileUploadController {
  /**
   * Lấy tất cả file upload
   */
  getAllFileUploads = async (req, res) => {
    try {
      const result = await FileUploadService.getAllFileUploads();
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
   * Lấy danh sách file có phân trang
   */
  getListFileUploads = async (req, res) => {
    try {
      const params = req.query;
      const result = await FileUploadService.getListFileUploads(params);
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
   * Lấy file theo ID
   */
  getFileUploadById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FileUploadService.getFileUploadById(id);
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
   * Upload file mới
   */
  createFileUpload = async (req, res) => {
    try {
      const result = await FileUploadService.createFileUpload(req.body);
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
   * Cập nhật thông tin file
   */
  updateFileUpload = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FileUploadService.updateFileUpload(id, req.body);
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
   * Xóa file
   */
  deleteFileUpload = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await FileUploadService.deleteFileUpload(id);
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
   * Xóa nhiều file
   */
  deleteManyFileUploads = async (req, res) => {
    try {
      const { ids } = req.body;
      const result = await FileUploadService.deleteManyFileUploads(ids);
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
   * Lấy danh sách file theo member
   */
  getFilesByMember = async (req, res) => {
    try {
      const { memberId } = req.params;
      const { page, limit } = req.query;
      const result = await FileUploadService.getFilesByMember(memberId, {
        page,
        limit,
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
   * Lấy danh sách file theo branch
   */
  getFilesByBranch = async (req, res) => {
    try {
      const { branchId } = req.params;
      const { page, limit } = req.query;
      const result = await FileUploadService.getFilesByBranch(branchId, {
        page,
        limit,
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
   * Tìm kiếm file nâng cao
   */
  searchFileUploads = async (req, res) => {
    try {
      const filters = req.query;
      const result = await FileUploadService.searchFileUploads(filters);
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
   * Lấy thống kê file upload
   */
  getFileUploadStatistics = async (req, res) => {
    try {
      const result = await FileUploadService.getFileUploadStatistics();
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
   * Batch upload files
   */
  batchUploadFiles = async (req, res) => {
    try {
      const { files } = req.body;
      const result = await FileUploadService.batchUploadFiles(files);
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

module.exports = new FileUploadController();
