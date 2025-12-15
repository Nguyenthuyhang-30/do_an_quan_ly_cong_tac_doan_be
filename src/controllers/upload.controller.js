"use strict";

const storageProvider = require("../services/storage");
const FileUploadService = require("../services/file_upload.service");

/**
 * Upload Controller
 * Xử lý các request upload file và lưu metadata vào database
 */
class UploadController {
  /**
   * Upload single file
   * POST /upload/single
   * Body: multipart/form-data
   *   - file: File to upload
   *   - memberId: ID đoàn viên (optional)
   *   - branchId: ID chi đoàn (optional)
   *   - description: Mô tả file (optional)
   *   - folder: Tên folder lưu file (optional, default: "general")
   */
  uploadSingleFile = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "No file uploaded",
        });
      }

      const { memberId, branchId, description, folder } = req.body;

      // Upload to storage provider (local/cloudinary/s3)
      console.log(
        `📤 Uploading file: ${req.file.originalname} (${(
          req.file.size / 1024
        ).toFixed(2)} KB)`
      );
      const uploadResult = await storageProvider.uploadFile(req.file, {
        folder: folder || "general",
      });

      // Save to database
      const fileRecord = await FileUploadService.createFileUpload({
        memberId: memberId || null,
        branchId: branchId || null,
        fileName: req.file.originalname,
        fileUrl: uploadResult.url,
        description: description || null,
        uploadedBy: req.user?.id || null, // From auth middleware if available
      });

      return res.status(201).json({
        code: 201,
        success: true,
        message: "File uploaded successfully",
        data: {
          file: fileRecord.data,
          storage: {
            url: uploadResult.url,
            size: uploadResult.size,
            mimetype: uploadResult.mimetype,
          },
        },
      });
    } catch (error) {
      console.error("❌ Upload failed:", error.message);
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Upload multiple files
   * POST /upload/multiple
   * Body: multipart/form-data
   *   - files[]: Array of files to upload
   *   - memberId, branchId, folder (optional)
   */
  uploadMultipleFiles = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "No files uploaded",
        });
      }

      const { memberId, branchId, folder } = req.body;

      console.log(`📤 Uploading ${req.files.length} files...`);

      // Upload all files to storage
      const uploadResults = await storageProvider.uploadMultipleFiles(
        req.files,
        { folder: folder || "general" }
      );

      // Prepare data for batch insert
      const filesData = uploadResults.map((result, index) => ({
        memberId: memberId || null,
        branchId: branchId || null,
        fileName: req.files[index].originalname,
        fileUrl: result.url,
        description: req.body[`description_${index}`] || null,
        uploadedBy: req.user?.id || null,
      }));

      // Save to database
      const dbResult = await FileUploadService.batchUploadFiles(filesData);

      return res.status(201).json({
        code: 201,
        success: true,
        message: `${uploadResults.length} files uploaded successfully`,
        data: dbResult.data,
      });
    } catch (error) {
      console.error("❌ Multiple upload failed:", error.message);
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Upload avatar (single image, specific folder)
   * POST /upload/avatar
   * Body: multipart/form-data
   *   - file: Avatar image
   *   - memberId: ID đoàn viên
   */
  uploadAvatar = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "No avatar file uploaded",
        });
      }

      const { memberId } = req.body;

      if (!memberId) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "memberId is required",
        });
      }

      // Upload to avatars folder
      const uploadResult = await storageProvider.uploadFile(req.file, {
        folder: "avatars",
      });

      // Save to database
      const fileRecord = await FileUploadService.createFileUpload({
        memberId: memberId,
        branchId: null,
        fileName: req.file.originalname,
        fileUrl: uploadResult.url,
        description: "Avatar image",
        uploadedBy: req.user?.id || null,
      });

      return res.status(201).json({
        code: 201,
        success: true,
        message: "Avatar uploaded successfully",
        data: {
          file: fileRecord.data,
          avatarUrl: uploadResult.url,
        },
      });
    } catch (error) {
      console.error("❌ Avatar upload failed:", error.message);
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Delete file (xóa cả storage và database record)
   * DELETE /upload/:id
   */
  deleteFile = async (req, res) => {
    try {
      const { id } = req.params;

      // Get file info from database
      const fileInfo = await FileUploadService.getFileUploadById(id);
      if (!fileInfo.success) {
        return res.status(404).json(fileInfo);
      }

      // Extract publicId/path from URL for deletion
      const fileUrl = fileInfo.data.file_url;

      // For local storage: extract path from URL
      // Example: http://localhost:3055/uploads/general/123-file.pdf -> general/123-file.pdf
      if (fileUrl.includes("/uploads/")) {
        const urlParts = fileUrl.split("/uploads/");
        if (urlParts.length > 1) {
          const publicId = urlParts[1];
          await storageProvider.deleteFile(publicId);
        }
      }

      // Delete from database
      const deleteResult = await FileUploadService.deleteFileUpload(id);

      return res.status(200).json({
        code: 200,
        success: true,
        message: "File deleted successfully",
      });
    } catch (error) {
      console.error("❌ Delete file failed:", error.message);
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Get upload statistics
   * GET /upload/statistics
   */
  getUploadStatistics = async (req, res) => {
    try {
      const stats = await FileUploadService.getFileUploadStatistics();
      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = new UploadController();
