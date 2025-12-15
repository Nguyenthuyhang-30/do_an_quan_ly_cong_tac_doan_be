"use strict";

const multer = require("multer");
const storageConfig = require("../configs/storage.config");

/**
 * Upload Middleware với Multer
 * Sử dụng memory storage để có thể gửi buffer đến các storage providers
 */

// Memory storage - file sẽ được lưu trong RAM trước khi xử lý
const storage = multer.memoryStorage();

/**
 * File filter - Kiểm tra loại file được phép upload
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = storageConfig.fileFilter.allowedTypes;

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `File type not allowed. Only ${allowedTypes.join(", ")} are supported.`
      ),
      false
    );
  }
};

/**
 * Multer configuration
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: storageConfig.fileFilter.maxSize,
    files: 10, // Max 10 files per request
  },
});

/**
 * Error handler middleware for multer
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        code: 400,
        success: false,
        message: `File too large. Maximum size is ${
          storageConfig.fileFilter.maxSize / 1024 / 1024
        }MB`,
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Too many files. Maximum 10 files per upload",
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Unexpected field in upload",
      });
    }
  }

  if (err) {
    return res.status(400).json({
      code: 400,
      success: false,
      message: err.message,
    });
  }

  next();
};

module.exports = {
  // Upload single file với field name "file"
  uploadSingle: upload.single("file"),

  // Upload multiple files với field name "files" (max 10)
  uploadMultiple: upload.array("files", 10),

  // Upload fields khác nhau
  uploadFields: upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "documents", maxCount: 5 },
    { name: "images", maxCount: 10 },
  ]),

  // Error handler
  handleUploadError,
};
