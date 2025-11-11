# API Documentation - Hệ thống Quản lý Công tác Đoàn

**Base URL:** `http://localhost:3055/v1/api`  
**Production URL:** `https://dtn-api.aiotlab.edu.vn/v1/api`

**Swagger UI:** `http://localhost:3055/api-docs`

---

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Youth Union Member APIs](#youth-union-member-apis)
3. [Youth Union Branch APIs](#youth-union-branch-apis)
4. [Cohort APIs](#cohort-apis)
5. [Activity APIs](#activity-apis)
6. [Member Transfer APIs](#member-transfer-apis)
7. [Member Role APIs](#member-role-apis)
8. [Member Review APIs](#member-review-apis)
9. [Account APIs](#account-apis)
10. [Slider Banner APIs](#slider-banner-apis)
11. [Content Introduct APIs](#content-introduct-apis)
12. [File Upload APIs](#file-upload-apis)

---

## Authentication APIs

### 1. Login

```http
POST /access/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Đăng nhập thành công",
  "status": 200,
  "metadata": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "fullName": "Nguyễn Văn A"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 2. Register

```http
POST /access/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "Nguyễn Văn B"
}
```

### 3. Logout

```http
POST /access/logout
Authorization: Bearer {accessToken}
```

### 4. Refresh Token

```http
POST /access/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Youth Union Member APIs

### 1. Get All Members

```http
GET /youth-union-member/get-all
```

**Response:**

```json
{
  "message": "Lấy tất cả đoàn viên thành công",
  "status": 200,
  "metadata": [
    {
      "id": 1,
      "code": "DV001",
      "fullName": "Nguyễn Văn A",
      "email": "nguyenvana@example.com",
      "phoneNumber": "0123456789",
      "dateOfBirth": "2000-01-15",
      "gender": "male",
      "address": "123 Đường ABC, TP.HCM",
      "joinDate": "2020-09-01",
      "status": "active",
      "branchId": 1,
      "cohortId": 1
    }
  ]
}
```

### 2. Get Members List (Pagination)

```http
GET /youth-union-member/get-list?page=1&limit=10&search=Nguyễn
```

**Query Parameters:**

- `page` (number): Trang hiện tại (default: 1)
- `limit` (number): Số lượng mỗi trang (default: 10)
- `search` (string): Tìm kiếm theo tên, email, code
- `branchId` (number): Lọc theo chi đoàn
- `cohortId` (number): Lọc theo khóa học
- `status` (string): Lọc theo trạng thái (active, inactive, graduated, transferred)

**Response:**

```json
{
  "message": "Lấy danh sách đoàn viên thành công",
  "status": 200,
  "metadata": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### 3. Get Member by ID

```http
GET /youth-union-member/{id}
```

### 4. Create Member

```http
POST /youth-union-member
Content-Type: application/json

{
  "code": "DV002",
  "fullName": "Trần Thị B",
  "email": "tranthib@example.com",
  "phoneNumber": "0987654321",
  "dateOfBirth": "2001-05-20",
  "gender": "female",
  "address": "456 Đường XYZ, Hà Nội",
  "joinDate": "2021-09-01",
  "branchId": 1,
  "cohortId": 2
}
```

### 5. Update Member

```http
PUT /youth-union-member/{id}
Content-Type: application/json

{
  "fullName": "Trần Thị B (Updated)",
  "phoneNumber": "0999888777",
  "address": "789 Đường Mới"
}
```

### 6. Delete Member

```http
DELETE /youth-union-member/{id}
```

### 7. Delete Multiple Members

```http
DELETE /youth-union-member
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

### 8. Search Members

```http
GET /youth-union-member/search?search=Nguyễn&branchId=1&status=active
```

### 9. Get Member Statistics

```http
GET /youth-union-member/statistics
```

**Response:**

```json
{
  "message": "Lấy thống kê đoàn viên thành công",
  "status": 200,
  "metadata": {
    "totalMembers": 500,
    "activeMembers": 450,
    "inactiveMembers": 30,
    "graduatedMembers": 20,
    "membersByBranch": [
      { "branchId": 1, "branchName": "Chi đoàn CNTT", "count": 100 }
    ],
    "membersByCohort": [{ "cohortId": 1, "cohortName": "K16", "count": 150 }],
    "membersByGender": {
      "male": 300,
      "female": 200
    }
  }
}
```

### 10. Get Members by Branch

```http
GET /youth-union-member/branch/{branchId}?page=1&limit=10
```

### 11. Get Members by Cohort

```http
GET /youth-union-member/cohort/{cohortId}?page=1&limit=10
```

### 12. Update Member Status

```http
PUT /youth-union-member/{id}/status
Content-Type: application/json

{
  "status": "graduated"
}
```

---

## Youth Union Branch APIs

### 1. Get All Branches

```http
GET /youth-union-branch/get-all
```

### 2. Get Branches List (Pagination)

```http
GET /youth-union-branch/get-list?page=1&limit=10&search=CNTT
```

### 3. Get Branch by ID

```http
GET /youth-union-branch/{id}
```

### 4. Create Branch

```http
POST /youth-union-branch
Content-Type: application/json

{
  "code": "CD001",
  "name": "Chi đoàn Công nghệ Thông tin",
  "description": "Chi đoàn khoa CNTT",
  "establishedDate": "2020-01-01",
  "status": "active"
}
```

### 5. Update Branch

```http
PUT /youth-union-branch/{id}
Content-Type: application/json

{
  "name": "Chi đoàn CNTT (Updated)",
  "description": "Mô tả mới"
}
```

### 6. Delete Branch

```http
DELETE /youth-union-branch/{id}
```

### 7. Get Branch Statistics

```http
GET /youth-union-branch/statistics
```

---

## Cohort APIs

### 1. Get All Cohorts

```http
GET /cohort/get-all
```

### 2. Get Cohorts List (Pagination)

```http
GET /cohort/get-list?page=1&limit=10
```

### 3. Get Cohort by ID

```http
GET /cohort/{id}
```

### 4. Create Cohort

```http
POST /cohort
Content-Type: application/json

{
  "code": "K16",
  "name": "Khóa 16",
  "startYear": 2020,
  "endYear": 2024,
  "description": "Khóa 16 - 2020-2024"
}
```

### 5. Update Cohort

```http
PUT /cohort/{id}
Content-Type: application/json

{
  "name": "Khóa 16 (Updated)",
  "endYear": 2025
}
```

### 6. Delete Cohort

```http
DELETE /cohort/{id}
```

---

## Activity APIs

### 1. Get All Activities

```http
GET /activity/get-all
```

### 2. Get Activities List (Pagination)

```http
GET /activity/get-list?page=1&limit=10&search=tình nguyện
```

**Query Parameters:**

- `page`, `limit`, `search`
- `activityType`: Loại hoạt động
- `status`: Trạng thái (planned, ongoing, completed, cancelled)
- `dateFrom`, `dateTo`: Lọc theo thời gian

### 3. Get Activity by ID

```http
GET /activity/{id}
```

### 4. Create Activity

```http
POST /activity
Content-Type: application/json

{
  "code": "HĐ001",
  "name": "Chiến dịch Tình nguyện Mùa hè xanh 2024",
  "description": "Hoạt động tình nguyện vì cộng đồng",
  "activityType": "tinh-nguyen",
  "startDate": "2024-06-01T08:00:00Z",
  "endDate": "2024-06-30T17:00:00Z",
  "location": "Tỉnh Đồng Nai",
  "organizer": "Đoàn trường",
  "maxParticipants": 100,
  "status": "planned"
}
```

**Activity Types:**

- `tinh-nguyen`: Tình nguyện
- `hoc-tap`: Học tập
- `the-thao`: Thể thao
- `van-hoa`: Văn hóa
- `thi-dua`: Thi đua
- `khac`: Khác

### 5. Update Activity

```http
PUT /activity/{id}
Content-Type: application/json

{
  "name": "Updated Activity Name",
  "status": "ongoing"
}
```

### 6. Register for Activity

```http
POST /activity/{id}/register
Content-Type: application/json

{
  "memberId": 1
}
```

### 7. Get Activity Participants

```http
GET /activity/{id}/participants?page=1&limit=20
```

### 8. Search Activities

```http
GET /activity/search?search=tình nguyện&activityType=tinh-nguyen&status=planned
```

### 9. Get Activity Statistics

```http
GET /activity/statistics
```

**Response:**

```json
{
  "message": "Lấy thống kê hoạt động thành công",
  "status": 200,
  "metadata": {
    "totalActivities": 50,
    "plannedActivities": 10,
    "ongoingActivities": 5,
    "completedActivities": 30,
    "cancelledActivities": 5,
    "activitiesByType": [
      { "activityType": "tinh-nguyen", "count": 20 }
    ],
    "totalParticipants": 500,
    "upcomingActivities": [...]
  }
}
```

---

## Member Transfer APIs

### 1. Get All Transfers

```http
GET /member-transfer/get-all
```

### 2. Get Transfers List (Pagination)

```http
GET /member-transfer/get-list?page=1&limit=10&memberId=1
```

**Query Parameters:**

- `memberId`: Lọc theo đoàn viên
- `fromBranchId`: Chi đoàn cũ
- `toBranchId`: Chi đoàn mới
- `status`: Trạng thái (pending, approved, rejected)

### 3. Create Transfer Request

```http
POST /member-transfer
Content-Type: application/json

{
  "memberId": 1,
  "fromBranchId": 1,
  "toBranchId": 2,
  "reason": "Chuyển ngành học",
  "transferDate": "2024-01-15",
  "requestedBy": 1
}
```

### 4. Approve Transfer

```http
PUT /member-transfer/{id}/approve
Content-Type: application/json

{
  "approvedBy": 5,
  "notes": "Đã xét duyệt"
}
```

### 5. Reject Transfer

```http
PUT /member-transfer/{id}/reject
Content-Type: application/json

{
  "rejectedBy": 5,
  "reason": "Không đủ điều kiện"
}
```

### 6. Get Transfer Statistics

```http
GET /member-transfer/statistics
```

---

## Member Role APIs

### 1. Get All Member Roles

```http
GET /member-role/get-all
```

### 2. Get Member Roles List (Pagination)

```http
GET /member-role/get-list?page=1&limit=10&memberId=1
```

### 3. Assign Role to Member

```http
POST /member-role
Content-Type: application/json

{
  "memberId": 1,
  "roleId": 2,
  "branchId": 1,
  "startDate": "2024-01-01",
  "assignedBy": 5
}
```

**Common Roles:**

- Bí thư chi đoàn
- Phó bí thư
- Ủy viên BCH
- Đoàn viên

### 4. End Role Assignment

```http
PUT /member-role/{id}/end
Content-Type: application/json

{
  "endDate": "2024-12-31",
  "endReason": "Hết nhiệm kỳ"
}
```

### 5. Get Active Roles

```http
GET /member-role/active?branchId=1
```

### 6. Get Role History

```http
GET /member-role/member/{memberId}/history
```

---

## Member Review APIs

### 1. Get All Reviews

```http
GET /member-review/get-all
```

### 2. Get Reviews List (Pagination)

```http
GET /member-review/get-list?page=1&limit=10&memberId=1&reviewType=khen-thuong
```

**Query Parameters:**

- `memberId`: Lọc theo đoàn viên
- `reviewType`: Loại đánh giá (khen-thuong, ky-luat, thi-dua, danh-gia-dinh-ky, xep-loai)

### 3. Create Review

```http
POST /member-review
Content-Type: application/json

{
  "member_id": 1,
  "review_type": "khen-thuong",
  "title": "Đoàn viên xuất sắc tháng 1/2024",
  "description": "Tích cực tham gia hoạt động, hoàn thành tốt nhiệm vụ",
  "point": 10,
  "created_by": 5
}
```

**Review Types:**

- `khen-thuong`: Khen thưởng (điểm dương)
- `ky-luat`: Kỷ luật (điểm âm)
- `thi-dua`: Thi đua
- `danh-gia-dinh-ky`: Đánh giá định kỳ
- `xep-loai`: Xếp loại đoàn viên
- `khac`: Khác

### 4. Batch Create Reviews

```http
POST /member-review/batch
Content-Type: application/json

{
  "reviews": [
    {
      "member_id": 1,
      "review_type": "khen-thuong",
      "title": "Đoàn viên xuất sắc",
      "description": "Hoàn thành tốt nhiệm vụ",
      "point": 10
    },
    {
      "member_id": 2,
      "review_type": "thi-dua",
      "title": "Chiến sĩ thi đua",
      "description": "Tích cực trong hoạt động",
      "point": 15
    }
  ]
}
```

### 5. Get Member Total Points

```http
GET /member-review/member/{memberId}/total-points
```

**Response:**

```json
{
  "message": "Tính tổng điểm đánh giá thành công",
  "status": 200,
  "metadata": {
    "memberId": 1,
    "totalPoints": 150,
    "reviewCount": 15,
    "averagePoint": "10.00",
    "pointsByType": {
      "khen-thuong": 80,
      "thi-dua": 50,
      "danh-gia-dinh-ky": 20
    }
  }
}
```

### 6. Get Member Review History

```http
GET /member-review/member/{memberId}/history?year=2024&month=1
```

### 7. Get Reviews by Type

```http
GET /member-review/type/khen-thuong?page=1&limit=10
```

### 8. Search Reviews

```http
GET /member-review/search?search=xuất sắc&minPoint=10&maxPoint=50&dateFrom=2024-01-01
```

### 9. Get Review Statistics

```http
GET /member-review/statistics
```

### 10. Update Review

```http
PUT /member-review/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "point": 15
}
```

### 11. Update Review Point Only

```http
PUT /member-review/{id}/point
Content-Type: application/json

{
  "point": 20
}
```

---

## Account APIs

### 1. Get All Accounts

```http
GET /account/get-all
```

### 2. Get Account Profile

```http
GET /account/profile
Authorization: Bearer {accessToken}
```

### 3. Update Account Profile

```http
PUT /account/profile
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0123456789",
  "address": "123 Street, City"
}
```

### 4. Change Password

```http
PUT /account/change-password
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

### 5. Update Account Role

```http
PUT /account/{id}/role
Content-Type: application/json

{
  "roleId": 2
}
```

---

## Slider Banner APIs

### 1. Get All Sliders

```http
GET /slider-banner/get-all
```

### 2. Get Active Sliders for Home

```http
GET /slider-banner/home?limit=5
```

**Response:**

```json
{
  "message": "Lấy slider cho trang chủ thành công",
  "status": 200,
  "metadata": [
    {
      "id": 1,
      "code": "SLIDER_001",
      "name": "Banner chào mừng",
      "image": "https://cdn.example.com/banner.jpg",
      "link": "https://example.com/welcome",
      "order": 1,
      "isActive": true
    }
  ]
}
```

### 3. Create Slider

```http
POST /slider-banner
Content-Type: application/json

{
  "code": "SLIDER_002",
  "name": "Banner sự kiện",
  "image": "https://cdn.example.com/event-banner.jpg",
  "link": "https://example.com/event",
  "order": 2,
  "isActive": true
}
```

### 4. Update Slider

```http
PUT /slider-banner/{id}
Content-Type: application/json

{
  "name": "Updated Banner Name",
  "image": "https://cdn.example.com/new-banner.jpg"
}
```

### 5. Update Slider Image

```http
PUT /slider-banner/{id}/image
Content-Type: application/json

{
  "imageUrl": "https://cdn.example.com/updated-image.jpg"
}
```

### 6. Update Slider Order

```http
PUT /slider-banner/order
Content-Type: application/json

{
  "orderData": [
    { "id": 1, "order": 1 },
    { "id": 2, "order": 2 },
    { "id": 3, "order": 3 }
  ]
}
```

### 7. Search Sliders

```http
GET /slider-banner/search?search=banner&hasImage=true&dateFrom=2024-01-01
```

### 8. Get Slider Statistics

```http
GET /slider-banner/statistics
```

---

## Content Introduct APIs

### 1. Get All Contents

```http
GET /content-introduct/get-all
```

### 2. Get Home Page Contents

```http
GET /content-introduct/home?codes=about-us,mission,vision,values
```

**Response:**

```json
{
  "message": "Lấy nội dung trang chủ thành công",
  "status": 200,
  "metadata": {
    "about-us": {
      "id": 1,
      "code": "about-us",
      "title": "Giới thiệu về Đoàn Trường",
      "content": "<h2>Về chúng tôi</h2><p>Đoàn trường là...</p>",
      "isActive": true
    },
    "mission": {
      "id": 2,
      "code": "mission",
      "title": "Sứ mệnh",
      "content": "<p>Sứ mệnh của chúng tôi...</p>",
      "isActive": true
    }
  }
}
```

### 3. Get Content by Code

```http
GET /content-introduct/code/about-us
```

### 4. Create Content

```http
POST /content-introduct
Content-Type: application/json

{
  "code": "about-us",
  "title": "Giới thiệu về Đoàn Trường",
  "content": "<h2>Về chúng tôi</h2><p>Nội dung giới thiệu...</p>",
  "metaTitle": "Giới thiệu | Đoàn Trường",
  "metaDescription": "Tìm hiểu về Đoàn Thanh niên Trường Đại học",
  "metaKeywords": "đoàn trường, giới thiệu, thanh niên",
  "isActive": true
}
```

### 5. Update Content by Code

```http
PUT /content-introduct/code/about-us
Content-Type: application/json

{
  "title": "Về Đoàn trường",
  "content": "<div>Nội dung đã được cập nhật...</div>"
}
```

### 6. Duplicate Content

```http
POST /content-introduct/{id}/duplicate
```

### 7. Search Contents

```http
GET /content-introduct/search?search=giới thiệu&dateFrom=2024-01-01
```

### 8. Get Content Statistics

```http
GET /content-introduct/statistics
```

---

## File Upload APIs

### 1. Get All Files

```http
GET /file-upload/get-all
```

### 2. Get Files List (Pagination)

```http
GET /file-upload/get-list?page=1&limit=10&memberId=1
```

### 3. Upload File

```http
POST /file-upload
Content-Type: application/json

{
  "memberId": 1,
  "branchId": 1,
  "fileName": "bao-cao-hoat-dong.pdf",
  "fileUrl": "https://cdn.example.com/files/bao-cao.pdf",
  "fileSize": 1024000,
  "mimeType": "application/pdf",
  "description": "Báo cáo hoạt động tháng 1",
  "uploadedBy": 1
}
```

### 4. Batch Upload Files

```http
POST /file-upload/batch
Content-Type: application/json

{
  "files": [
    {
      "memberId": 1,
      "fileName": "cv.pdf",
      "fileUrl": "https://cdn.example.com/cv.pdf",
      "description": "Hồ sơ cá nhân"
    },
    {
      "memberId": 1,
      "fileName": "degree.pdf",
      "fileUrl": "https://cdn.example.com/degree.pdf",
      "description": "Bằng tốt nghiệp"
    }
  ]
}
```

### 5. Get Files by Member

```http
GET /file-upload/member/{memberId}?page=1&limit=10
```

### 6. Get Files by Branch

```http
GET /file-upload/branch/{branchId}?page=1&limit=10
```

### 7. Search Files

```http
GET /file-upload/search?search=báo cáo&memberId=1&dateFrom=2024-01-01
```

### 8. Get File Statistics

```http
GET /file-upload/statistics
```

**Response:**

```json
{
  "message": "Lấy thống kê file thành công",
  "status": 200,
  "metadata": {
    "totalFiles": 150,
    "totalSize": 52428800,
    "totalSizeMB": 50.0,
    "filesByMember": 100,
    "filesByBranch": 50,
    "topUploaders": [{ "uploadedBy": 1, "fileCount": 25 }]
  }
}
```

### 9. Update File

```http
PUT /file-upload/{id}
Content-Type: application/json

{
  "fileName": "updated-file-name.pdf",
  "description": "Mô tả đã cập nhật"
}
```

### 10. Delete File

```http
DELETE /file-upload/{id}
```

---

## Common Response Formats

### Success Response

```json
{
  "message": "Operation successful",
  "status": 200,
  "metadata": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "message": "Error message",
  "status": 400,
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

### Pagination Response

```json
{
  "message": "Success",
  "status": 200,
  "metadata": {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

---

## HTTP Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `500` - Internal Server Error: Server error

---

## Authentication

Most endpoints require authentication using JWT Bearer token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Getting Access Token

1. Login using `/access/login`
2. Get `accessToken` from response
3. Include token in Authorization header for subsequent requests

### Token Expiration

- Access Token: 7 days
- Refresh Token: 30 days

Use `/access/refresh-token` to get new access token when expired.

---

## Best Practices

### 1. Error Handling

Always check `status` code and handle errors appropriately:

```javascript
try {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.status !== 200 && data.status !== 201) {
    throw new Error(data.message);
  }

  return data.metadata;
} catch (error) {
  console.error("API Error:", error);
  // Handle error
}
```

### 2. Pagination

For list endpoints, always implement pagination:

```javascript
const fetchMembers = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${baseUrl}/youth-union-member/get-list?page=${page}&limit=${limit}`
  );
  return response.json();
};
```

### 3. Search & Filter

Combine search with filters for better UX:

```javascript
const searchMembers = async (filters) => {
  const params = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 10,
    search: filters.search || "",
    branchId: filters.branchId || "",
    status: filters.status || "",
  });

  const response = await fetch(
    `${baseUrl}/youth-union-member/search?${params}`
  );
  return response.json();
};
```

### 4. File Upload

For file uploads, first upload file to CDN/Storage, then save URL:

```javascript
// Step 1: Upload file to CDN
const uploadToCDN = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("YOUR_CDN_ENDPOINT", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.url;
};

// Step 2: Save file info to database
const saveFileInfo = async (fileUrl, fileName, memberId) => {
  const response = await fetch(`${baseUrl}/file-upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      memberId,
      fileName,
      fileUrl,
      description: "File description",
    }),
  });

  return response.json();
};
```

---

## Rate Limiting

Currently no rate limiting is implemented, but it's recommended to:

- Debounce search inputs (300-500ms)
- Cache frequently accessed data
- Use pagination for large datasets
- Implement request cancellation for outdated requests

---

## Support

For issues or questions:

- Swagger UI: `http://localhost:3055/api-docs`
- API Repository: Contact your backend team
- Documentation: This file

---

**Last Updated:** November 11, 2025  
**API Version:** 1.0.0
