"use strict";

const storageConfig = require("../../configs/storage.config");
const LocalStorage = require("./local.storage");
const CloudinaryStorage = require("./cloudinary.storage");
// const S3Storage = require("./s3.storage"); // Uncomment khi cần AWS S3

/**
 * Storage Factory - Tự động chọn storage provider dựa vào config
 *
 * Cách chuyển đổi provider:
 * 1. Đổi STORAGE_PROVIDER trong .env (local/cloudinary/s3)
 * 2. Restart server
 * 3. Done! Code không cần thay đổi gì
 */
class StorageFactory {
  static getStorageProvider() {
    const provider = storageConfig.provider;

    console.log(`📦 Using storage provider: ${provider.toUpperCase()}`);

    switch (provider) {
      case "local":
        return new LocalStorage();

      case "cloudinary":
        return new CloudinaryStorage();

      // case "s3":
      //   return new S3Storage();

      default:
        console.warn(
          `⚠️  Unknown storage provider: ${provider}. Defaulting to LOCAL storage.`
        );
        return new LocalStorage();
    }
  }
}

// Export singleton instance
module.exports = StorageFactory.getStorageProvider();
