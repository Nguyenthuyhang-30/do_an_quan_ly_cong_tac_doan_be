# 🖼️ Image Resize - Hướng Dẫn Chi Tiết

## 📋 Tổng Quan

Hệ thống tự động resize ảnh khi upload, tạo nhiều kích thước khác nhau để tối ưu:

- 🚀 **Performance**: Tải nhanh hơn với kích thước phù hợp
- 💾 **Storage**: Tiết kiệm băng thông và dung lượng
- 📱 **Responsive**: Phục vụ nhiều thiết bị (mobile, tablet, desktop)

---

## ✨ Features

✅ **Auto Resize**: Tự động resize khi upload ảnh  
✅ **Multiple Versions**: Tạo 4-5 kích thước khác nhau  
✅ **Keep Original**: Có thể giữ ảnh gốc  
✅ **Format Conversion**: Chuyển đổi sang JPEG/PNG/WebP  
✅ **Quality Control**: Tùy chỉnh chất lượng ảnh  
✅ **Smart Optimization**: Không phóng to ảnh nhỏ

---

## 📐 Image Versions

Mỗi ảnh upload sẽ được tạo thành **5 versions**:

| Version       | Kích thước     | Mục đích                   | Fit Mode |
| ------------- | -------------- | -------------------------- | -------- |
| **thumbnail** | 150x150px      | Avatar, icon nhỏ           | cover    |
| **small**     | 400x400px      | Preview, gallery thumbnail | inside   |
| **medium**    | 800x800px      | Hiển thị thường (default)  | inside   |
| **large**     | 1200x1200px    | Xem chi tiết, zoom         | inside   |
| **original**  | Kích thước gốc | Backup, download           | -        |

### Fit Modes:

- **cover**: Cắt ảnh để fit vào khung (dùng cho thumbnail vuông)
- **inside**: Giữ tỷ lệ, fit trong khung (không cắt)
- **contain**: Fit toàn bộ ảnh, có thể có padding
- **fill**: Kéo giãn ảnh để fill khung
- **outside**: Ảnh lớn hơn khung

---

## ⚙️ Configuration

### 1. .env Configuration:

```env
# Bật/tắt tính năng resize
IMAGE_RESIZE_ENABLED=true

# Chất lượng ảnh (0-100)
IMAGE_QUALITY=80

# Giữ ảnh gốc
KEEP_ORIGINAL_IMAGE=true

# Format output: jpeg, png, webp
IMAGE_FORMAT=jpeg
```

### 2. Custom Sizes ([`storage.config.js`](../src/configs/storage.config.js)):

```javascript
imageResize: {
  sizes: {
    thumbnail: {
      width: 150,
      height: 150,
      fit: "cover",
    },
    small: {
      width: 400,
      height: 400,
      fit: "inside",
    },
    // Thêm size mới
    xlarge: {
      width: 1920,
      height: 1920,
      fit: "inside",
    },
  },
}
```

---

## 📡 API Response

### Upload Image Response:

```json
{
  "code": 201,
  "success": true,
  "message": "Image uploaded and resized successfully",
  "data": {
    "file": {
      "id": 1,
      "file_name": "photo.jpg",
      "file_url": "http://localhost:3055/uploads/events/1734256789_medium.jpeg",
      "member_id": 1
    },
    "storage": {
      "url": "http://localhost:3055/uploads/events/1734256789_medium.jpeg",
      "size": 245678,
      "mimetype": "image/jpeg",
      "isImage": true,
      "versions": {
        "original": {
          "url": "http://localhost:3055/uploads/events/1734256789_original.jpeg",
          "width": 3000,
          "height": 2000,
          "size": 1200000
        },
        "thumbnail": {
          "url": "http://localhost:3055/uploads/events/1734256789_thumbnail.jpeg",
          "width": 150,
          "height": 150,
          "size": 12000
        },
        "small": {
          "url": "http://localhost:3055/uploads/events/1734256789_small.jpeg",
          "width": 400,
          "height": 267,
          "size": 45000
        },
        "medium": {
          "url": "http://localhost:3055/uploads/events/1734256789_medium.jpeg",
          "width": 800,
          "height": 533,
          "size": 120000
        },
        "large": {
          "url": "http://localhost:3055/uploads/events/1734256789_large.jpeg",
          "width": 1200,
          "height": 800,
          "size": 245000
        }
      }
    }
  }
}
```

---

## 💻 Frontend Usage

### React Example:

```jsx
import { useState } from "react";

function ImageUpload() {
  const [imageVersions, setImageVersions] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "avatars");

    const response = await fetch("http://localhost:3055/v1/api/upload/single", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data.storage.isImage) {
      setImageVersions(data.data.storage.versions);
    }
  };

  return (
    <div>
      {/* Hiển thị thumbnail */}
      {imageVersions?.thumbnail && (
        <img src={imageVersions.thumbnail.url} alt="Thumbnail" width={150} />
      )}

      {/* Hiển thị medium cho desktop */}
      {imageVersions?.medium && (
        <img
          src={imageVersions.medium.url}
          alt="Medium"
          className="main-image"
        />
      )}

      {/* Responsive images với srcset */}
      {imageVersions && (
        <img
          src={imageVersions.medium.url}
          srcSet={`
            ${imageVersions.small.url} 400w,
            ${imageVersions.medium.url} 800w,
            ${imageVersions.large.url} 1200w
          `}
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt="Responsive"
        />
      )}
    </div>
  );
}
```

### Vue.js Example:

```vue
<template>
  <div>
    <!-- Thumbnail -->
    <img v-if="versions?.thumbnail" :src="versions.thumbnail.url" width="150" />

    <!-- Picture element cho responsive -->
    <picture v-if="versions">
      <source :srcset="versions.small.url" media="(max-width: 600px)" />
      <source :srcset="versions.medium.url" media="(max-width: 1200px)" />
      <img :src="versions.large.url" alt="Image" />
    </picture>
  </div>
</template>

<script setup>
import { ref } from "vue";

const versions = ref(null);

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3055/v1/api/upload/single", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    versions.value = data.data.storage.versions;
  }
};
</script>
```

---

## 🎨 Use Cases

### 1. Avatar Đoàn Viên:

```javascript
// Upload avatar với thumbnail
POST /v1/api/upload/avatar
- Dùng: versions.thumbnail.url (150x150px)
- Hiển thị: Sidebar, danh sách
```

### 2. Gallery Sự Kiện:

```javascript
// Upload ảnh sự kiện
POST /v1/api/upload/single (folder=events)
- Grid thumbnail: versions.small.url
- Lightbox: versions.large.url
- Download: versions.original.url
```

### 3. Banner/Slider:

```javascript
// Upload banner
POST /v1/api/upload/single (folder=banners)
- Mobile: versions.medium.url
- Desktop: versions.large.url
```

### 4. Tài Liệu Có Ảnh:

```javascript
// Upload report with images
POST /v1/api/upload/multiple
- Preview: versions.small.url
- View: versions.medium.url
```

---

## 📊 Storage Optimization

### Before Resize:

```
Original: 5MB (4000x3000px)
Total: 5MB
```

### After Resize:

```
thumbnail: 12KB (150x150px)
small: 45KB (400x267px)
medium: 120KB (800x533px)
large: 245KB (1200x800px)
original: 1.2MB (optimized)
────────────────────────
Total: ~1.6MB (68% saved!)
```

---

## 🔧 Advanced Configuration

### 1. Disable Resize for Specific Folder:

```javascript
// upload.controller.js
const uploadResult = await storageProvider.uploadFile(req.file, {
  folder: folder || "general",
  skipResize: folder === "documents", // Không resize folder documents
});
```

### 2. Custom Quality Per Size:

```javascript
// storage.config.js
sizes: {
  thumbnail: {
    width: 150,
    height: 150,
    fit: "cover",
    quality: 70, // Thumbnail quality thấp hơn
  },
  large: {
    width: 1200,
    height: 1200,
    fit: "inside",
    quality: 90, // Large quality cao hơn
  },
}
```

### 3. WebP Format (Modern Browsers):

```env
IMAGE_FORMAT=webp
IMAGE_QUALITY=85
```

WebP nhỏ hơn JPEG ~30% với cùng quality!

---

## ⚠️ Lưu Ý

### 1. **File Types**:

- ✅ Chỉ resize: JPG, JPEG, PNG, GIF, WebP
- ❌ Không resize: PDF, DOC, XLS (giữ nguyên)

### 2. **No Upscaling**:

- Ảnh nhỏ hơn size config sẽ KHÔNG bị phóng to
- Ví dụ: Upload ảnh 200x200 → medium vẫn là 200x200

### 3. **Aspect Ratio**:

- `fit: "inside"` → Giữ tỷ lệ gốc
- `fit: "cover"` → Có thể cắt ảnh

### 4. **Memory Usage**:

- Sharp xử lý nhanh nhưng tốn RAM
- Server cần >512MB RAM cho resize ảnh lớn

### 5. **File Naming**:

```
Original: photo.jpg
Output:
- 1734256789-abc123-photo_thumbnail.jpeg
- 1734256789-abc123-photo_small.jpeg
- 1734256789-abc123-photo_medium.jpeg
- 1734256789-abc123-photo_large.jpeg
- 1734256789-abc123-photo_original.jpeg
```

---

## 🐛 Troubleshooting

### Lỗi: "Image resize failed"

→ Kiểm tra package sharp đã cài chưa: `npm list sharp`

### Ảnh bị mờ/vỡ

→ Tăng `IMAGE_QUALITY` trong .env (80-95)

### Resize chậm

→ Giảm số lượng versions hoặc kích thước trong config

### Out of memory

→ Giảm kích thước max upload hoặc tắt `KEEP_ORIGINAL_IMAGE`

---

## 🎯 Best Practices

1. **Mobile First**: Dùng `small` cho mobile, `medium` cho desktop
2. **Lazy Load**: Load thumbnail trước, large sau
3. **Srcset**: Dùng responsive images với srcset
4. **CDN**: Kết hợp với CDN để cache
5. **WebP**: Dùng WebP cho browser hỗ trợ, fallback JPEG
6. **Alt Text**: Luôn có alt text cho accessibility

---

## 📈 Performance Comparison

| Scenario       | Before       | After         | Improvement |
| -------------- | ------------ | ------------- | ----------- |
| Page Load      | 5MB total    | 1.6MB total   | 68% faster  |
| Mobile         | 5MB download | 45KB download | 99% less    |
| Thumbnail Grid | 5MB × 10     | 12KB × 10     | 99.8% less  |

---

## ✅ Summary

🎉 **Image Resize System Ready!**

- ✅ Auto resize on upload
- ✅ 5 versions created (thumbnail → large)
- ✅ Quality control (80% default)
- ✅ Format conversion (JPEG/PNG/WebP)
- ✅ Keep original option
- ✅ No upscaling
- ✅ Optimized storage

**Tiết kiệm ~68% dung lượng và tăng tốc độ load!** 🚀
