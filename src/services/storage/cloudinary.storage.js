"use strict";

const StorageInterface = require("./storage.interface");

/**
 * Cloudinary Storage Provider
 * Lưu file trên Cloudinary CDN (FREE tier: 25GB storage, 25GB bandwidth/month)
 *
 * NOTE: Hiện tại chưa dùng, code này để dành cho tương lai
 * Khi cần dùng:
 * 1. npm install cloudinary
 * 2. Thêm credentials vào .env
 * 3. Đổi STORAGE_PROVIDER=cloudinary trong .env
 */
class CloudinaryStorage extends StorageInterface {
  constructor() {
    super();

    // Kiểm tra xem đã cài cloudinary chưa
    try {
      this.cloudinary = require("cloudinary").v2;
      const storageConfig = require("../../configs/storage.config");

      this.cloudinary.config({
        cloud_name: storageConfig.cloudinary.cloudName,
        api_key: storageConfig.cloudinary.apiKey,
        api_secret: storageConfig.cloudinary.apiSecret,
      });

      console.log("✅ Cloudinary storage initialized");
    } catch (error) {
      console.warn("⚠️  Cloudinary not installed. Run: npm install cloudinary");
      this.cloudinary = null;
    }
  }

  /**
   * Upload file to Cloudinary
   * @param {Object} file - Multer file object
   * @param {Object} options - { folder, resourceType }
   * @returns {Promise<Object>}
   */
  async uploadFile(file, options = {}) {
    if (!this.cloudinary) {
      throw new Error("Cloudinary not installed. Run: npm install cloudinary");
    }

    try {
      const storageConfig = require("../../configs/storage.config");
      const { folder = "general", resourceType = "auto" } = options;

      return new Promise((resolve, reject) => {
        const uploadStream = this.cloudinary.uploader.upload_stream(
          {
            folder: `${storageConfig.cloudinary.folder}/${folder}`,
            resource_type: resourceType,
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(new Error(`Cloudinary upload failed: ${error.message}`));
            } else {
              console.log(
                `✅ File uploaded to Cloudinary: ${result.public_id}`
              );
              resolve({
                url: result.secure_url,
                publicId: result.public_id,
                size: result.bytes,
                mimetype: result.format,
                width: result.width,
                height: result.height,
                originalName: file.originalname,
              });
            }
          }
        );

        // Pipe file buffer to upload stream
        uploadStream.end(file.buffer);
      });
    } catch (error) {
      console.error("❌ Cloudinary upload failed:", error.message);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(files, options = {}) {
    const uploadPromises = files.map((file) => this.uploadFile(file, options));
    return await Promise.all(uploadPromises);
  }

  /**
   * Delete file from Cloudinary
   * @param {string} publicId - Cloudinary public_id
   * @returns {Promise<boolean>}
   */
  async deleteFile(publicId) {
    if (!this.cloudinary) {
      throw new Error("Cloudinary not installed");
    }

    try {
      const result = await this.cloudinary.uploader.destroy(publicId);
      console.log(`✅ File deleted from Cloudinary: ${publicId}`);
      return result.result === "ok";
    } catch (error) {
      console.error(`❌ Failed to delete from Cloudinary: ${error.message}`);
      return false;
    }
  }

  /**
   * Get file info from Cloudinary
   */
  async getFileInfo(publicId) {
    if (!this.cloudinary) {
      throw new Error("Cloudinary not installed");
    }

    try {
      const result = await this.cloudinary.api.resource(publicId);
      return {
        url: result.secure_url,
        size: result.bytes,
        format: result.format,
        width: result.width,
        height: result.height,
        createdAt: result.created_at,
      };
    } catch (error) {
      throw new Error(`File not found on Cloudinary: ${error.message}`);
    }
  }
}

module.exports = CloudinaryStorage;
