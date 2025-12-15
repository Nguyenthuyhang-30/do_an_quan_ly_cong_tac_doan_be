"use strict";

const StorageInterface = require("./storage.interface");
const fs = require("fs").promises;
const path = require("path");
const storageConfig = require("../../configs/storage.config");

/**
 * Local Storage Provider
 * Lưu file trực tiếp trên server (miễn phí, phù hợp cho dev/small projects)
 */
class LocalStorage extends StorageInterface {
  constructor() {
    super();
    this.uploadDir = storageConfig.local.uploadDir;
    this.publicUrl = storageConfig.local.publicUrl;
    this.ensureUploadDirExists();
  }

  /**
   * Tạo thư mục uploads nếu chưa tồn tại
   */
  async ensureUploadDirExists() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
      console.log(`✅ Created upload directory: ${this.uploadDir}`);
    }
  }

  /**
   * Upload file to local storage
   * @param {Object} file - Multer file object
   * @param {Object} options - { folder = "general" }
   * @returns {Promise<Object>}
   */
  async uploadFile(file, options = {}) {
    try {
      const { folder = "general" } = options;
      const folderPath = path.join(this.uploadDir, folder);

      // Tạo folder nếu chưa tồn tại
      await fs.mkdir(folderPath, { recursive: true });

      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const safeBaseName = baseName
        .replace(/[^a-zA-Z0-9]/g, "_")
        .substring(0, 50);
      const filename = `${timestamp}-${randomStr}-${safeBaseName}${ext}`;
      const filePath = path.join(folderPath, filename);

      // Lưu file
      await fs.writeFile(filePath, file.buffer);

      console.log(`✅ File uploaded: ${filename}`);

      // Return file info
      return {
        url: `${this.publicUrl}/uploads/${folder}/${filename}`,
        publicId: `${folder}/${filename}`, // Dùng để delete sau này
        path: filePath,
        size: file.size,
        mimetype: file.mimetype,
        originalName: file.originalname,
      };
    } catch (error) {
      console.error("❌ Local upload failed:", error.message);
      throw new Error(`Local upload failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple files
   * @param {Array} files - Array of multer file objects
   * @param {Object} options
   * @returns {Promise<Array>}
   */
  async uploadMultipleFiles(files, options = {}) {
    const uploadPromises = files.map((file) => this.uploadFile(file, options));
    return await Promise.all(uploadPromises);
  }

  /**
   * Delete file from local storage
   * @param {string} fileIdentifier - Relative path như "general/123456-abc.jpg"
   * @returns {Promise<boolean>}
   */
  async deleteFile(fileIdentifier) {
    try {
      const filePath = path.join(this.uploadDir, fileIdentifier);
      await fs.unlink(filePath);
      console.log(`✅ File deleted: ${fileIdentifier}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to delete file: ${error.message}`);
      return false;
    }
  }

  /**
   * Get file info
   * @param {string} fileIdentifier - Relative path
   * @returns {Promise<Object>}
   */
  async getFileInfo(fileIdentifier) {
    try {
      const filePath = path.join(this.uploadDir, fileIdentifier);
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        exists: true,
      };
    } catch (error) {
      throw new Error(`File not found: ${error.message}`);
    }
  }
}

module.exports = LocalStorage;
