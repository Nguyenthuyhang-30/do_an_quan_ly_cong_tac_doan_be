"use strict";

const StorageInterface = require("./storage.interface");
const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
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
   * Kiểm tra xem file có phải là ảnh không
   */
  isImage(mimetype) {
    return mimetype && mimetype.startsWith("image/");
  }

  /**
   * Resize ảnh và tạo nhiều versions
   * @param {Buffer} buffer - File buffer
   * @param {string} basePath - Đường dẫn cơ sở để lưu file
   * @param {string} baseFilename - Tên file cơ sở (không có extension)
   * @returns {Promise<Object>} { original, thumbnail, small, medium, large }
   */
  async resizeImage(buffer, basePath, baseFilename) {
    const resizeConfig = storageConfig.imageResize;
    const versions = {};

    try {
      // Lấy metadata của ảnh gốc
      const metadata = await sharp(buffer).metadata();

      // Determine formats: preserve original format for original file; allow target format override for resized versions
      const originalFormat = metadata.format || "jpeg";
      const targetFormat = resizeConfig.format || originalFormat || "jpeg";

      const extFor = (fmt) => {
        if (!fmt) return ".jpg";
        return fmt === "jpeg" ? ".jpg" : `.${fmt}`;
      };

      const originalExt = extFor(originalFormat);
      const ext = extFor(targetFormat);

      // Lưu ảnh gốc (nếu config bật keepOriginal) - giữ định dạng gốc
      if (resizeConfig.keepOriginal) {
        const originalPath = path.join(
          basePath,
          `${baseFilename}_original${originalExt}`
        );
        await sharp(buffer)
          .toFormat(originalFormat, { quality: resizeConfig.quality })
          .toFile(originalPath);

        versions.original = {
          filename: `${baseFilename}_original${originalExt}`,
          width: metadata.width,
          height: metadata.height,
          size: (await fs.stat(originalPath)).size,
        };
      }

      // Tạo các versions theo config (sử dụng targetFormat)
      for (const [sizeName, sizeConfig] of Object.entries(resizeConfig.sizes)) {
        const resizedPath = path.join(
          basePath,
          `${baseFilename}_${sizeName}${ext}`
        );

        await sharp(buffer)
          .resize(sizeConfig.width, sizeConfig.height, {
            fit: sizeConfig.fit || "inside",
            withoutEnlargement: true, // Không phóng to ảnh nhỏ hơn
          })
          .toFormat(targetFormat, { quality: resizeConfig.quality })
          .toFile(resizedPath);

        const stats = await fs.stat(resizedPath);
        const resizedMetadata = await sharp(resizedPath).metadata();

        versions[sizeName] = {
          filename: `${baseFilename}_${sizeName}${ext}`,
          width: resizedMetadata.width,
          height: resizedMetadata.height,
          size: stats.size,
        };
      }

      return versions;
    } catch (error) {
      console.error("❌ Image resize failed:", error.message);
      throw new Error(`Image resize failed: ${error.message}`);
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
      const baseFilename = `${timestamp}-${randomStr}-${safeBaseName}`;

      // Kiểm tra xem có phải ảnh và có bật resize không
      const isImage = this.isImage(file.mimetype);
      const shouldResize = isImage && storageConfig.imageResize.enabled;

      if (shouldResize) {
        // Resize ảnh và tạo nhiều versions
        console.log(`🖼️  Resizing image: ${file.originalname}`);
        const versions = await this.resizeImage(
          file.buffer,
          folderPath,
          baseFilename
        );

        // Tạo URLs cho tất cả versions
        const imageVersions = {};
        for (const [sizeName, versionInfo] of Object.entries(versions)) {
          imageVersions[sizeName] = {
            url: `${this.publicUrl}/uploads/${folder}/${versionInfo.filename}`,
            width: versionInfo.width,
            height: versionInfo.height,
            size: versionInfo.size,
          };
        }

        console.log(
          `✅ Image resized: ${Object.keys(versions).length} versions created`
        );

        // Return với multiple versions - chọn kích thước mặc định cấu hình
        const defaultSize = storageConfig.imageResize.defaultSize || "medium";
        return {
          url:
            imageVersions[defaultSize]?.url ||
            imageVersions.large?.url ||
            imageVersions.medium?.url ||
            imageVersions.original?.url,
          publicId: `${folder}/${baseFilename}`, // Base path để delete
          versions: imageVersions,
          size: file.size,
          mimetype: file.mimetype,
          originalName: file.originalname,
          isImage: true,
        };
      } else {
        // File không phải ảnh hoặc không resize - upload bình thường
        const filename = `${baseFilename}${ext}`;
        const filePath = path.join(folderPath, filename);

        await fs.writeFile(filePath, file.buffer);

        console.log(`✅ File uploaded: ${filename}`);

        return {
          url: `${this.publicUrl}/uploads/${folder}/${filename}`,
          publicId: `${folder}/${filename}`,
          path: filePath,
          size: file.size,
          mimetype: file.mimetype,
          originalName: file.originalname,
          isImage: false,
        };
      }
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
   * @param {string} fileIdentifier - Relative path như "general/123456-abc" (base path)
   * @returns {Promise<boolean>}
   */
  async deleteFile(fileIdentifier) {
    try {
      // Nếu có versions, xóa tất cả các versions
      const folderPath = path.dirname(
        path.join(this.uploadDir, fileIdentifier)
      );
      const baseName = path.basename(fileIdentifier);

      // Tìm tất cả files bắt đầu với baseName
      const files = await fs.readdir(folderPath);
      const matchingFiles = files.filter((file) => file.startsWith(baseName));

      let deletedCount = 0;
      for (const file of matchingFiles) {
        const filePath = path.join(folderPath, file);
        try {
          await fs.unlink(filePath);
          deletedCount++;
        } catch (err) {
          console.error(`❌ Failed to delete ${file}:`, err.message);
        }
      }

      console.log(`✅ Deleted ${deletedCount} file(s) for: ${fileIdentifier}`);
      return deletedCount > 0;
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
