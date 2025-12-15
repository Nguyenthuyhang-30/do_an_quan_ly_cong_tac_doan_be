# 📦 Upload System - Quick Reference

## ✅ Đã Triển Khai

### 📁 Files Created:

- [`src/configs/storage.config.js`](../src/configs/storage.config.js) - Storage configuration
- [`src/services/storage/storage.interface.js`](../src/services/storage/storage.interface.js) - Base interface
- [`src/services/storage/local.storage.js`](../src/services/storage/local.storage.js) - Local storage provider (ACTIVE)
- [`src/services/storage/cloudinary.storage.js`](../src/services/storage/cloudinary.storage.js) - Cloudinary provider (ready)
- [`src/services/storage/index.js`](../src/services/storage/index.js) - Storage factory
- [`src/middlewares/upload.middleware.js`](../src/middlewares/upload.middleware.js) - Multer middleware
- [`src/controllers/upload.controller.js`](../src/controllers/upload.controller.js) - Upload controller
- [`src/routes/upload/index.js`](../src/routes/upload/index.js) - Upload routes
- [`src/postman/upload.http`](../src/postman/upload.http) - API tests

### 🔧 Files Modified:

- [`src/app.js`](../src/app.js) - Added static file serving
- [`src/routes/index.js`](../src/routes/index.js) - Registered upload routes
- [`.env.example`](../.env.example) - Added storage config
- [`.gitignore`](../.gitignore) - Ignore uploads folder

### 📦 Packages Installed:

- `multer` ✅ - Upload middleware
- `sharp` ✅ - Image resize & optimization

---

## 🚀 Quick Start

### 1. Config .env:

```env
STORAGE_PROVIDER=local
UPLOAD_DIR=./uploads
PUBLIC_URL=http://localhost:3055
```

### 2. Start Server:

```bash
npm start
```

### 3. Test Upload:

```bash
curl -X POST http://localhost:3055/v1/api/upload/single \
  -F "file=@/path/to/file.pdf" \
  -F "memberId=1" \
  -F "folder=reports"
```

---

## 📡 API Endpoints

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| POST   | `/v1/api/upload/single`     | Upload 1 file      |
| POST   | `/v1/api/upload/multiple`   | Upload nhiều files |
| POST   | `/v1/api/upload/avatar`     | Upload avatar      |
| GET    | `/v1/api/upload/statistics` | Thống kê           |
| DELETE | `/v1/api/upload/:id`        | Xóa file           |

---

## 🎯 Features

✅ Upload single/multiple files  
✅ File type validation (images, PDF, DOC, XLS)  
✅ File size limit (10MB, có thể config)  
✅ **Auto resize images** (thumbnail, small, medium, large) 🆕  
✅ **Image optimization** (quality control, format conversion) 🆕  
✅ Auto create folders  
✅ Store metadata in database  
✅ Serve files via static URL  
✅ Local storage (mặc định)  
✅ Cloudinary support (sẵn sàng)  
✅ Delete files (storage + DB)  
✅ Upload statistics

---

## 📂 Folder Structure

```
uploads/
├── general/       # File chung
├── reports/       # Báo cáo
├── documents/     # Tài liệu
├── events/        # Sự kiện
├── avatars/       # Avatar
└── ...            # Tự động tạo
```

---

## 🔄 Chuyển Đổi Provider

### Local → Cloudinary:

```env
STORAGE_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

Restart server → Done!

---

## 📚 Full Documentation

- 📖 **Upload Guide**: [UPLOAD_GUIDE.md](./UPLOAD_GUIDE.md)
- 🖼️ **Image Resize**: [IMAGE_RESIZE.md](./IMAGE_RESIZE.md) 🆕

---

## 🎉 Status

- ✅ **Local Storage**: ACTIVE (đang dùng)
- ✅ **Image Resize**: ACTIVE (auto resize images) 🆕
- ✅ **Cloudinary**: Ready (chưa dùng)
- 🔜 **AWS S3**: Coming soon

**Hệ thống đã sẵn sàng sử dụng!** 🚀
