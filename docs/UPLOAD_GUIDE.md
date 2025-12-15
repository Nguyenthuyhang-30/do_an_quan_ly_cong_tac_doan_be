# 📤 Hệ Thống Upload File - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Hệ thống upload file linh hoạt, hỗ trợ nhiều storage providers:

- ✅ **Local Storage** (mặc định - miễn phí)
- ✅ **Cloudinary** (sẵn sàng khi cần)
- 🔜 **AWS S3** (dành cho tương lai)

## 🚀 Cài Đặt

### 1. Đã cài đặt packages:

```bash
npm install multer sharp
# Optional (khi cần Cloudinary):
# npm install cloudinary
```

**Packages:**

- `multer` - Xử lý multipart/form-data upload
- `sharp` - Resize và optimize images (NEW!)

### 2. Cấu hình .env:

```env
# Storage Provider
STORAGE_PROVIDER=local

# Local Storage (đang dùng)
UPLOAD_DIR=./uploads
PUBLIC_URL=http://localhost:3055

# Cloudinary (dự phòng - chưa dùng)
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
```

### 3. Khởi động server:

```bash
npm start
```

Folder `uploads/` sẽ được tự động tạo khi có file upload đầu tiên.

---

## 📡 API Endpoints

### 1. Upload Single File

**POST** `/v1/api/upload/single`

```bash
curl -X POST http://localhost:3055/v1/api/upload/single \
  -F "file=@/path/to/file.pdf" \
  -F "memberId=1" \
  -F "branchId=1" \
  -F "description=Báo cáo tháng 12" \
  -F "folder=reports"
```

**Response:**

```json
{
  "code": 201,
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file": {
      "id": 1,
      "file_name": "document.pdf",
      "file_url": "http://localhost:3055/uploads/reports/1734256789-abc123-document.pdf",
      "member_id": 1,
      "branch_id": 1,
      "description": "Báo cáo tháng 12"
    },
    "storage": {
      "url": "http://localhost:3055/uploads/reports/1734256789-abc123-document.pdf",
      "size": 245678,
      "mimetype": "application/pdf"
    }
  }
}
```

### 2. Upload Multiple Files

**POST** `/v1/api/upload/multiple`

```bash
curl -X POST http://localhost:3055/v1/api/upload/multiple \
  -F "files=@/path/to/file1.pdf" \
  -F "files=@/path/to/file2.jpg" \
  -F "memberId=1" \
  -F "folder=documents"
```

### 3. Upload Avatar

**POST** `/v1/api/upload/avatar`

```bash
curl -X POST http://localhost:3055/v1/api/upload/avatar \
  -F "file=@/path/to/avatar.jpg" \
  -F "memberId=5"
```

### 4. Get Upload Statistics

**GET** `/v1/api/upload/statistics`

```bash
curl http://localhost:3055/v1/api/upload/statistics
```

### 5. Delete File

**DELETE** `/v1/api/upload/:id`

```bash
curl -X DELETE http://localhost:3055/v1/api/upload/1
```

---

## 📁 Cấu Trúc Folder

```
uploads/
├── general/          # File chung
├── reports/          # Báo cáo
├── documents/        # Tài liệu
├── events/           # Hình ảnh sự kiện
├── avatars/          # Avatar đoàn viên
├── certificates/     # Chứng chỉ, giấy khen
├── activities/       # Hoạt động
└── member-documents/ # Hồ sơ đoàn viên
```

Folder sẽ được tự động tạo khi upload file.

---

## 🔒 Giới Hạn File

### File Types Allowed:

- **Images**: JPG, JPEG, PNG, GIF, WEBP
- **Documents**: PDF, DOC, DOCX, XLS, XLSX

### Size Limit:

- **Max file size**: 10 MB
- **Max files per upload**: 10 files

### Để thay đổi giới hạn:

Edit [`src/configs/storage.config.js`](src/configs/storage.config.js):

```javascript
fileFilter: {
  maxSize: 20 * 1024 * 1024, // 20MB
}
```

---

## 🌐 Frontend Integration

### React/Next.js Example:

```javascript
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("memberId", "1");
  formData.append("description", "Upload from frontend");
  formData.append("folder", "documents");

  try {
    const response = await fetch("http://localhost:3055/v1/api/upload/single", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Upload thành công:", data.data.storage.url);
      // Hiển thị file: <img src={data.data.storage.url} />
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### Vue.js Example:

```javascript
async uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('memberId', this.memberId);
  formData.append('folder', 'documents');

  const { data } = await axios.post(
    'http://localhost:3055/v1/api/upload/single',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );

  this.fileUrl = data.data.storage.url;
}
```

---

## 🔄 Chuyển Đổi Storage Provider

### Từ Local → Cloudinary:

1. **Đăng ký Cloudinary FREE**: https://cloudinary.com/
2. **Lấy credentials** từ Dashboard
3. **Cài đặt package**:
   ```bash
   npm install cloudinary
   ```
4. **Update .env**:
   ```env
   STORAGE_PROVIDER=cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
5. **Restart server**

✅ Done! Không cần thay đổi code.

---

## 🧪 Testing

### Với Postman Desktop:

1. Import file [`src/postman/upload.http`](src/postman/upload.http)
2. Hoặc tạo request mới:
   - Method: `POST`
   - URL: `http://localhost:3055/v1/api/upload/single`
   - Body > form-data:
     - `file`: (File) chọn file từ máy
     - `memberId`: (Text) `1`
     - `folder`: (Text) `reports`

### Với VS Code REST Client:

Mở file [`src/postman/upload.http`](src/postman/upload.http) và click "Send Request"

---

## 📊 Monitoring

### Kiểm tra files đã upload:

```bash
ls -lh uploads/
ls -lh uploads/reports/
```

### Xem logs:

Server sẽ log mỗi khi upload:

```
📤 Uploading file: document.pdf (245.67 KB)
✅ File uploaded: 1734256789-abc123-document.pdf
```

---

## ⚠️ Lưu Ý

### Local Storage:

- ✅ **Ưu điểm**: Miễn phí, nhanh, không phụ thuộc bên thứ 3
- ❌ **Nhược điểm**:
  - Tốn disk server
  - Không có CDN (tốc độ phụ thuộc server)
  - Mất file khi restart container (nếu dùng Docker)

### Khuyến nghị:

- **Dev/Testing**: Dùng Local
- **Production nhỏ (<25GB)**: Dùng Cloudinary FREE
- **Production lớn**: Dùng AWS S3 + CloudFront

---

## 🐛 Troubleshooting

### Lỗi: "File type not allowed"

→ Kiểm tra file type trong [`storage.config.js`](src/configs/storage.config.js)

### Lỗi: "File too large"

→ Tăng `maxSize` trong [`storage.config.js`](src/configs/storage.config.js)

### Lỗi: "Cannot create directory"

→ Kiểm tra quyền write của folder project

### Files không hiển thị:

→ Kiểm tra xem server đã serve static files chưa ([`app.js`](src/app.js))

---

## 📞 Support

Nếu gặp vấn đề, kiểm tra:

1. Server logs khi upload
2. Folder `uploads/` có được tạo không
3. File [`src/configs/storage.config.js`](src/configs/storage.config.js) config đúng chưa
4. Package `multer` đã cài chưa: `npm list multer`

---

## 🎉 Done!

Hệ thống upload đã sẵn sàng sử dụng với LOCAL storage!

**Next Steps:**

- Test các API với Postman
- Tích hợp vào Frontend
- Khi cần, chuyển sang Cloudinary bằng cách đổi `.env`
