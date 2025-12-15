"use strict";

/**
 * Storage Interface - Base class cho tất cả storage providers
 * Tất cả provider (Local, Cloudinary, S3...) phải implement các method này
 */
class StorageInterface {
  /**
   * Upload một file
   * @param {Object} file - Multer file object { buffer, originalname, mimetype, size }
   * @param {Object} options - { folder, fileName, memberId, etc }
   * @returns {Promise<Object>} { url, publicId, size, mimetype, originalName }
   */
  async uploadFile(file, options = {}) {
    throw new Error("Method uploadFile() must be implemented");
  }

  /**
   * Upload nhiều files
   * @param {Array} files - Array of multer file objects
   * @param {Object} options - Upload options
   * @returns {Promise<Array>} Array of upload results
   */
  async uploadMultipleFiles(files, options = {}) {
    throw new Error("Method uploadMultipleFiles() must be implemented");
  }

  /**
   * Xóa file
   * @param {string} fileIdentifier - File URL hoặc public_id hoặc path
   * @returns {Promise<boolean>} true nếu xóa thành công
   */
  async deleteFile(fileIdentifier) {
    throw new Error("Method deleteFile() must be implemented");
  }

  /**
   * Lấy thông tin file
   * @param {string} fileIdentifier - File identifier
   * @returns {Promise<Object>} File information
   */
  async getFileInfo(fileIdentifier) {
    throw new Error("Method getFileInfo() must be implemented");
  }
}

module.exports = StorageInterface;
