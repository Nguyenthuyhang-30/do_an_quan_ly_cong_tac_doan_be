"use strict";

require("dotenv").config();

module.exports = {
  // Chọn provider: 'local', 'cloudinary', 's3'
  // Mặc định: local (miễn phí, lưu trên server)
  provider: process.env.STORAGE_PROVIDER || "local",

  // Local storage config
  local: {
    uploadDir: process.env.UPLOAD_DIR || "./uploads",
    publicUrl: process.env.PUBLIC_URL || "http://localhost:3055",
    maxSize: 10 * 1024 * 1024, // 10MB
  },

  // Cloudinary config (FREE: 25 credits/month, 25GB storage)
  // Chưa dùng nhưng giữ code để sau này dễ chuyển đổi
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "youth-union",
  },

  // AWS S3 config (dành cho tương lai)
  s3: {
    region: process.env.AWS_REGION || "ap-southeast-1",
    bucket: process.env.AWS_BUCKET_NAME || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },

  // File restrictions
  fileFilter: {
    allowedTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    maxSize: 10 * 1024 * 1024, // 10MB
  },

  // Image resize configuration
  imageResize: {
    enabled: process.env.IMAGE_RESIZE_ENABLED !== "false", // Mặc định bật
    quality: parseInt(process.env.IMAGE_QUALITY || "95"), // Chất lượng ảnh (0-100)

    // Các kích thước ảnh sẽ được tạo
    sizes: {
      thumbnail: {
        width: 150,
        height: 150,
        fit: "cover", // cover, contain, fill, inside, outside
      },
      small: {
        width: 400,
        height: 400,
        fit: "inside",
      },
      medium: {
        width: 800,
        height: 800,
        fit: "inside",
      },
      large: {
        width: 1200,
        height: 1200,
        fit: "inside",
      },
    },

    // Có lưu ảnh gốc không
    keepOriginal: process.env.KEEP_ORIGINAL_IMAGE !== "false", // Mặc định giữ

    // Kích thước mặc định trả về cho API (thumbnail|small|medium|large|original)
    defaultSize: process.env.IMAGE_DEFAULT_SIZE || "large",

    // Format ảnh output; nếu để rỗng sẽ giữ format gốc cho ảnh original
    format: process.env.IMAGE_FORMAT || "", // jpeg, png, webp
  },
};
