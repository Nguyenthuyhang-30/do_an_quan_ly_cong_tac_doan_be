# Data Models - Hệ thống Quản lý Công tác Đoàn

## 📋 Table of Contents

1. [Youth Union Member](#youth-union-member)
2. [Youth Union Branch](#youth-union-branch)
3. [Cohort](#cohort)
4. [Activity](#activity)
5. [Member Activity Map](#member-activity-map)
6. [Member Transfer](#member-transfer)
7. [Member Role](#member-role)
8. [Member Review](#member-review)
9. [Member Branch History](#member-branch-history)
10. [Role & Permission](#role--permission)
11. [Account](#account)
12. [Slider Banner](#slider-banner)
13. [Content Introduct](#content-introduct)
14. [File Upload](#file-upload)
15. [Audit Log](#audit-log)

---

## Youth Union Member

Thông tin đoàn viên

### Fields

| Field        | Type        | Required | Description                                          | Example                    |
| ------------ | ----------- | -------- | ---------------------------------------------------- | -------------------------- |
| id           | Integer     | Auto     | ID đoàn viên                                         | 1                          |
| code         | String(50)  | Yes      | Mã đoàn viên (unique)                                | DV001                      |
| fullName     | String(255) | Yes      | Họ và tên                                            | Nguyễn Văn A               |
| email        | String(255) | Yes      | Email (unique)                                       | nguyenvana@example.com     |
| phoneNumber  | String(20)  | No       | Số điện thoại                                        | 0123456789                 |
| dateOfBirth  | Date        | No       | Ngày sinh                                            | 2000-01-15                 |
| gender       | String(10)  | No       | Giới tính: male, female, other                       | male                       |
| address      | Text        | No       | Địa chỉ                                              | 123 Đường ABC, TP.HCM      |
| identityCard | String(20)  | No       | CMND/CCCD                                            | 001234567890               |
| placeOfBirth | String(255) | No       | Nơi sinh                                             | TP. Hồ Chí Minh            |
| ethnicity    | String(50)  | No       | Dân tộc                                              | Kinh                       |
| religion     | String(50)  | No       | Tôn giáo                                             | Không                      |
| joinDate     | Date        | No       | Ngày vào đoàn                                        | 2020-09-01                 |
| status       | String(20)  | No       | Trạng thái: active, inactive, graduated, transferred | active                     |
| branchId     | Integer     | Yes      | ID chi đoàn                                          | 1                          |
| cohortId     | Integer     | Yes      | ID khóa học                                          | 1                          |
| avatar       | String(500) | No       | URL ảnh đại diện                                     | https://cdn.com/avatar.jpg |
| studentId    | String(50)  | No       | Mã sinh viên                                         | SV001                      |
| class        | String(50)  | No       | Lớp                                                  | 16DTHC1                    |
| faculty      | String(255) | No       | Khoa                                                 | Công nghệ Thông tin        |
| major        | String(255) | No       | Chuyên ngành                                         | Hệ thống thông tin         |
| createdAt    | DateTime    | Auto     | Ngày tạo                                             | 2024-01-15T10:30:00Z       |
| updatedAt    | DateTime    | Auto     | Ngày cập nhật                                        | 2024-01-20T15:45:00Z       |

### Relationships

- **belongsTo** YouthUnionBranch (via branchId)
- **belongsTo** Cohort (via cohortId)
- **hasMany** MemberActivityMap
- **hasMany** MemberTransfer (both from and to)
- **hasMany** MemberRole
- **hasMany** MemberReview
- **hasMany** MemberBranchHistory
- **hasMany** FileUpload

### Status Values

```typescript
type MemberStatus =
  | "active" // Đang hoạt động
  | "inactive" // Không hoạt động
  | "graduated" // Đã tốt nghiệp
  | "transferred"; // Đã chuyển đi
```

### Example Object

```json
{
  "id": 1,
  "code": "DV001",
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phoneNumber": "0123456789",
  "dateOfBirth": "2000-01-15",
  "gender": "male",
  "address": "123 Đường ABC, TP.HCM",
  "identityCard": "001234567890",
  "placeOfBirth": "TP. Hồ Chí Minh",
  "ethnicity": "Kinh",
  "religion": "Không",
  "joinDate": "2020-09-01",
  "status": "active",
  "branchId": 1,
  "cohortId": 1,
  "avatar": "https://cdn.com/avatar.jpg",
  "studentId": "SV001",
  "class": "16DTHC1",
  "faculty": "Công nghệ Thông tin",
  "major": "Hệ thống thông tin",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T15:45:00Z",
  "branch": {
    "id": 1,
    "name": "Chi đoàn CNTT"
  },
  "cohort": {
    "id": 1,
    "name": "Khóa 16"
  }
}
```

---

## Youth Union Branch

Thông tin chi đoàn

### Fields

| Field           | Type        | Required | Description                  | Example                      |
| --------------- | ----------- | -------- | ---------------------------- | ---------------------------- |
| id              | Integer     | Auto     | ID chi đoàn                  | 1                            |
| code            | String(50)  | Yes      | Mã chi đoàn (unique)         | CD001                        |
| name            | String(255) | Yes      | Tên chi đoàn                 | Chi đoàn Công nghệ Thông tin |
| description     | Text        | No       | Mô tả                        | Chi đoàn khoa CNTT           |
| establishedDate | Date        | No       | Ngày thành lập               | 2020-01-01                   |
| status          | String(20)  | No       | Trạng thái: active, inactive | active                       |
| secretary       | String(255) | No       | Bí thư chi đoàn              | Nguyễn Văn A                 |
| viceSecretary   | String(255) | No       | Phó bí thư                   | Trần Thị B                   |
| createdAt       | DateTime    | Auto     | Ngày tạo                     | 2024-01-15T10:30:00Z         |
| updatedAt       | DateTime    | Auto     | Ngày cập nhật                | 2024-01-20T15:45:00Z         |

### Relationships

- **hasMany** YouthUnionMember
- **hasMany** FileUpload

---

## Cohort

Thông tin khóa học

### Fields

| Field       | Type        | Required | Description      | Example              |
| ----------- | ----------- | -------- | ---------------- | -------------------- |
| id          | Integer     | Auto     | ID khóa          | 1                    |
| code        | String(50)  | Yes      | Mã khóa (unique) | K16                  |
| name        | String(255) | Yes      | Tên khóa         | Khóa 16              |
| startYear   | Integer     | Yes      | Năm bắt đầu      | 2020                 |
| endYear     | Integer     | No       | Năm kết thúc     | 2024                 |
| description | Text        | No       | Mô tả            | Khóa 16 - 2020-2024  |
| createdAt   | DateTime    | Auto     | Ngày tạo         | 2024-01-15T10:30:00Z |
| updatedAt   | DateTime    | Auto     | Ngày cập nhật    | 2024-01-20T15:45:00Z |

### Relationships

- **hasMany** YouthUnionMember

---

## Activity

Hoạt động đoàn

### Fields

| Field               | Type        | Required | Description              | Example                            |
| ------------------- | ----------- | -------- | ------------------------ | ---------------------------------- |
| id                  | Integer     | Auto     | ID hoạt động             | 1                                  |
| code                | String(50)  | Yes      | Mã hoạt động (unique)    | HĐ001                              |
| name                | String(255) | Yes      | Tên hoạt động            | Chiến dịch Mùa hè xanh 2024        |
| description         | Text        | No       | Mô tả chi tiết           | Hoạt động tình nguyện vì cộng đồng |
| activityType        | String(50)  | No       | Loại hoạt động           | tinh-nguyen                        |
| startDate           | DateTime    | No       | Ngày bắt đầu             | 2024-06-01T08:00:00Z               |
| endDate             | DateTime    | No       | Ngày kết thúc            | 2024-06-30T17:00:00Z               |
| location            | String(500) | No       | Địa điểm                 | Tỉnh Đồng Nai                      |
| organizer           | String(255) | No       | Đơn vị tổ chức           | Đoàn trường                        |
| maxParticipants     | Integer     | No       | Số người tối đa          | 100                                |
| currentParticipants | Integer     | No       | Số người đã đăng ký      | 75                                 |
| status              | String(20)  | No       | Trạng thái               | planned                            |
| images              | Text        | No       | JSON array URLs hình ảnh | ["url1", "url2"]                   |
| documents           | Text        | No       | JSON array URLs tài liệu | ["url1", "url2"]                   |
| createdBy           | Integer     | No       | ID người tạo             | 5                                  |
| createdAt           | DateTime    | Auto     | Ngày tạo                 | 2024-01-15T10:30:00Z               |
| updatedAt           | DateTime    | Auto     | Ngày cập nhật            | 2024-01-20T15:45:00Z               |

### Activity Types

```typescript
type ActivityType =
  | "tinh-nguyen" // Tình nguyện
  | "hoc-tap" // Học tập
  | "the-thao" // Thể thao
  | "van-hoa" // Văn hóa
  | "thi-dua" // Thi đua
  | "khac"; // Khác
```

### Status Values

```typescript
type ActivityStatus =
  | "planned" // Đã lên kế hoạch
  | "ongoing" // Đang diễn ra
  | "completed" // Đã hoàn thành
  | "cancelled"; // Đã hủy
```

### Relationships

- **hasMany** MemberActivityMap

---

## Member Activity Map

Bảng trung gian: Đoàn viên - Hoạt động

### Fields

| Field            | Type       | Required | Description                                       | Example              |
| ---------------- | ---------- | -------- | ------------------------------------------------- | -------------------- |
| id               | Integer    | Auto     | ID                                                | 1                    |
| memberId         | Integer    | Yes      | ID đoàn viên                                      | 1                    |
| activityId       | Integer    | Yes      | ID hoạt động                                      | 1                    |
| registrationDate | DateTime   | No       | Ngày đăng ký                                      | 2024-01-15T10:30:00Z |
| attendanceStatus | String(20) | No       | Trạng thái: registered, attended, absent, excused | registered           |
| attendanceDate   | DateTime   | No       | Ngày điểm danh                                    | 2024-06-01T08:00:00Z |
| notes            | Text       | No       | Ghi chú                                           | Tham gia tích cực    |
| createdAt        | DateTime   | Auto     | Ngày tạo                                          | 2024-01-15T10:30:00Z |
| updatedAt        | DateTime   | Auto     | Ngày cập nhật                                     | 2024-01-20T15:45:00Z |

### Attendance Status

```typescript
type AttendanceStatus =
  | "registered" // Đã đăng ký
  | "attended" // Đã tham gia
  | "absent" // Vắng mặt
  | "excused"; // Có phép
```

### Relationships

- **belongsTo** YouthUnionMember
- **belongsTo** Activity

---

## Member Transfer

Chuyển chi đoàn

### Fields

| Field           | Type       | Required | Description      | Example              |
| --------------- | ---------- | -------- | ---------------- | -------------------- |
| id              | Integer    | Auto     | ID               | 1                    |
| memberId        | Integer    | Yes      | ID đoàn viên     | 1                    |
| fromBranchId    | Integer    | Yes      | Chi đoàn cũ      | 1                    |
| toBranchId      | Integer    | Yes      | Chi đoàn mới     | 2                    |
| transferDate    | Date       | Yes      | Ngày chuyển      | 2024-01-15           |
| reason          | Text       | No       | Lý do chuyển     | Chuyển ngành học     |
| status          | String(20) | No       | Trạng thái       | pending              |
| requestedBy     | Integer    | No       | ID người yêu cầu | 1                    |
| approvedBy      | Integer    | No       | ID người duyệt   | 5                    |
| approvedDate    | DateTime   | No       | Ngày duyệt       | 2024-01-20T10:00:00Z |
| rejectedBy      | Integer    | No       | ID người từ chối | 5                    |
| rejectedDate    | DateTime   | No       | Ngày từ chối     | 2024-01-20T10:00:00Z |
| rejectionReason | Text       | No       | Lý do từ chối    | Không đủ điều kiện   |
| notes           | Text       | No       | Ghi chú          | Đã hoàn tất thủ tục  |
| createdAt       | DateTime   | Auto     | Ngày tạo         | 2024-01-15T10:30:00Z |
| updatedAt       | DateTime   | Auto     | Ngày cập nhật    | 2024-01-20T15:45:00Z |

### Status Values

```typescript
type TransferStatus =
  | "pending" // Chờ duyệt
  | "approved" // Đã duyệt
  | "rejected" // Đã từ chối
  | "completed"; // Đã hoàn tất
```

### Relationships

- **belongsTo** YouthUnionMember
- **belongsTo** YouthUnionBranch (fromBranch)
- **belongsTo** YouthUnionBranch (toBranch)

---

## Member Role

Vai trò đoàn viên

### Fields

| Field      | Type     | Required | Description        | Example                 |
| ---------- | -------- | -------- | ------------------ | ----------------------- |
| id         | Integer  | Auto     | ID                 | 1                       |
| memberId   | Integer  | Yes      | ID đoàn viên       | 1                       |
| roleId     | Integer  | Yes      | ID vai trò         | 2                       |
| branchId   | Integer  | No       | ID chi đoàn        | 1                       |
| startDate  | Date     | Yes      | Ngày bắt đầu       | 2024-01-01              |
| endDate    | Date     | No       | Ngày kết thúc      | 2024-12-31              |
| isActive   | Boolean  | No       | Đang hoạt động     | true                    |
| assignedBy | Integer  | No       | ID người phân công | 5                       |
| endReason  | Text     | No       | Lý do kết thúc     | Hết nhiệm kỳ            |
| notes      | Text     | No       | Ghi chú            | Hoàn thành tốt nhiệm vụ |
| createdAt  | DateTime | Auto     | Ngày tạo           | 2024-01-15T10:30:00Z    |
| updatedAt  | DateTime | Auto     | Ngày cập nhật      | 2024-01-20T15:45:00Z    |

### Common Roles

- Bí thư chi đoàn
- Phó bí thư chi đoàn
- Ủy viên BCH
- Đoàn viên
- Bí thư liên chi
- Phó bí thư liên chi

### Relationships

- **belongsTo** YouthUnionMember
- **belongsTo** Role
- **belongsTo** YouthUnionBranch

---

## Member Review

Đánh giá đoàn viên

### Fields

| Field       | Type        | Required | Description    | Example                         |
| ----------- | ----------- | -------- | -------------- | ------------------------------- |
| id          | Integer     | Auto     | ID             | 1                               |
| member_id   | Integer     | Yes      | ID đoàn viên   | 1                               |
| review_type | String(50)  | No       | Loại đánh giá  | khen-thuong                     |
| title       | String(255) | No       | Tiêu đề        | Đoàn viên xuất sắc tháng 1/2024 |
| description | Text        | No       | Mô tả chi tiết | Tích cực tham gia hoạt động...  |
| point       | Integer     | No       | Điểm đánh giá  | 10                              |
| created_at  | DateTime    | Auto     | Ngày tạo       | 2024-01-15T10:30:00Z            |
| created_by  | Integer     | No       | ID người tạo   | 5                               |

### Review Types

```typescript
type ReviewType =
  | "khen-thuong" // Khen thưởng (điểm dương)
  | "ky-luat" // Kỷ luật (điểm âm)
  | "thi-dua" // Thi đua
  | "danh-gia-dinh-ky" // Đánh giá định kỳ
  | "xep-loai" // Xếp loại đoàn viên
  | "khac"; // Khác
```

### Point System

- **Khen thưởng:** Điểm dương (5-20)
- **Kỷ luật:** Điểm âm (-5 đến -20)
- **Thi đua:** Điểm dương (10-30)
- **Đánh giá định kỳ:** 0-10 điểm
- **Xếp loại:** 0-15 điểm

### Relationships

- **belongsTo** YouthUnionMember

---

## Member Branch History

Lịch sử chi đoàn của đoàn viên

### Fields

| Field     | Type     | Required | Description   | Example              |
| --------- | -------- | -------- | ------------- | -------------------- |
| id        | Integer  | Auto     | ID            | 1                    |
| memberId  | Integer  | Yes      | ID đoàn viên  | 1                    |
| branchId  | Integer  | Yes      | ID chi đoàn   | 1                    |
| startDate | Date     | Yes      | Ngày bắt đầu  | 2020-09-01           |
| endDate   | Date     | No       | Ngày kết thúc | 2024-06-30           |
| reason    | Text     | No       | Lý do         | Chuyển chi đoàn      |
| createdAt | DateTime | Auto     | Ngày tạo      | 2024-01-15T10:30:00Z |
| updatedAt | DateTime | Auto     | Ngày cập nhật | 2024-01-20T15:45:00Z |

### Relationships

- **belongsTo** YouthUnionMember
- **belongsTo** YouthUnionBranch

---

## Role & Permission

### Role

| Field       | Type        | Required | Description   | Example              |
| ----------- | ----------- | -------- | ------------- | -------------------- |
| id          | Integer     | Auto     | ID vai trò    | 1                    |
| name        | String(100) | Yes      | Tên vai trò   | Bí thư chi đoàn      |
| code        | String(50)  | Yes      | Mã vai trò    | bi-thu-chi-doan      |
| description | Text        | No       | Mô tả         | Lãnh đạo chi đoàn    |
| level       | Integer     | No       | Cấp độ        | 1                    |
| createdAt   | DateTime    | Auto     | Ngày tạo      | 2024-01-15T10:30:00Z |
| updatedAt   | DateTime    | Auto     | Ngày cập nhật | 2024-01-20T15:45:00Z |

### Permission

| Field       | Type        | Required | Description   | Example                      |
| ----------- | ----------- | -------- | ------------- | ---------------------------- |
| id          | Integer     | Auto     | ID quyền      | 1                            |
| name        | String(100) | Yes      | Tên quyền     | Quản lý đoàn viên            |
| code        | String(50)  | Yes      | Mã quyền      | manage-members               |
| description | Text        | No       | Mô tả         | Quyền quản lý đoàn viên      |
| resource    | String(50)  | No       | Resource      | member                       |
| action      | String(50)  | No       | Action        | create, read, update, delete |
| createdAt   | DateTime    | Auto     | Ngày tạo      | 2024-01-15T10:30:00Z         |
| updatedAt   | DateTime    | Auto     | Ngày cập nhật | 2024-01-20T15:45:00Z         |

---

## Account

Tài khoản người dùng

### Fields

| Field       | Type        | Required | Description        | Example                    |
| ----------- | ----------- | -------- | ------------------ | -------------------------- |
| id          | Integer     | Auto     | ID                 | 1                          |
| username    | String(100) | Yes      | Tên đăng nhập      | admin                      |
| email       | String(255) | Yes      | Email (unique)     | admin@example.com          |
| password    | String(255) | Yes      | Mật khẩu (hashed)  | $2b$10$...                 |
| fullName    | String(255) | No       | Họ và tên          | Nguyễn Văn A               |
| phoneNumber | String(20)  | No       | Số điện thoại      | 0123456789                 |
| avatar      | String(500) | No       | URL ảnh đại diện   | https://cdn.com/avatar.jpg |
| status      | String(20)  | No       | Trạng thái         | active                     |
| roleId      | Integer     | No       | ID vai trò         | 1                          |
| lastLogin   | DateTime    | No       | Lần đăng nhập cuối | 2024-01-20T10:00:00Z       |
| createdAt   | DateTime    | Auto     | Ngày tạo           | 2024-01-15T10:30:00Z       |
| updatedAt   | DateTime    | Auto     | Ngày cập nhật      | 2024-01-20T15:45:00Z       |

---

## Slider Banner

Banner/Slider trang chủ

### Fields

| Field     | Type        | Required | Description        | Example                    |
| --------- | ----------- | -------- | ------------------ | -------------------------- |
| id        | Integer     | Auto     | ID                 | 1                          |
| code      | String(50)  | Yes      | Mã slider (unique) | SLIDER_001                 |
| name      | String(255) | Yes      | Tên slider         | Banner chào mừng           |
| image     | String(500) | No       | URL hình ảnh       | https://cdn.com/banner.jpg |
| link      | String(500) | No       | Link đích          | https://example.com        |
| order     | Integer     | No       | Thứ tự hiển thị    | 1                          |
| isActive  | Boolean     | No       | Đang hoạt động     | true                       |
| createdAt | DateTime    | Auto     | Ngày tạo           | 2024-01-15T10:30:00Z       |
| updatedAt | DateTime    | Auto     | Ngày cập nhật      | 2024-01-20T15:45:00Z       |

---

## Content Introduct

Nội dung giới thiệu/CMS

### Fields

| Field           | Type        | Required | Description          | Example                   |
| --------------- | ----------- | -------- | -------------------- | ------------------------- |
| id              | Integer     | Auto     | ID                   | 1                         |
| code            | String(50)  | Yes      | Mã nội dung (unique) | about-us                  |
| title           | String(255) | Yes      | Tiêu đề              | Giới thiệu về Đoàn Trường |
| content         | Text        | Yes      | Nội dung HTML        | `<h2>Về chúng tôi</h2>`   |
| metaTitle       | String(255) | No       | Meta title           | Giới thiệu \| Đoàn Trường |
| metaDescription | Text        | No       | Meta description     | Tìm hiểu về Đoàn...       |
| metaKeywords    | String(255) | No       | Meta keywords        | đoàn trường, giới thiệu   |
| isActive        | Boolean     | No       | Đang hoạt động       | true                      |
| createdAt       | DateTime    | Auto     | Ngày tạo             | 2024-01-15T10:30:00Z      |
| updatedAt       | DateTime    | Auto     | Ngày cập nhật        | 2024-01-20T15:45:00Z      |

### Common Codes

- `about-us`: Giới thiệu
- `mission`: Sứ mệnh
- `vision`: Tầm nhìn
- `values`: Giá trị cốt lõi
- `history`: Lịch sử hình thành
- `organization`: Cơ cấu tổ chức

---

## File Upload

Quản lý file upload

### Fields

| Field       | Type        | Required | Description        | Example                           |
| ----------- | ----------- | -------- | ------------------ | --------------------------------- |
| id          | Integer     | Auto     | ID                 | 1                                 |
| memberId    | Integer     | No       | ID đoàn viên       | 1                                 |
| branchId    | Integer     | No       | ID chi đoàn        | 1                                 |
| fileName    | String(255) | Yes      | Tên file           | bao-cao.pdf                       |
| fileUrl     | String(500) | Yes      | URL file           | https://cdn.com/files/bao-cao.pdf |
| fileSize    | Integer     | No       | Kích thước (bytes) | 1024000                           |
| mimeType    | String(100) | No       | Loại MIME          | application/pdf                   |
| description | Text        | No       | Mô tả              | Báo cáo hoạt động tháng 1         |
| uploadedBy  | Integer     | No       | ID người upload    | 5                                 |
| createdAt   | DateTime    | Auto     | Ngày upload        | 2024-01-15T10:30:00Z              |
| updatedAt   | DateTime    | Auto     | Ngày cập nhật      | 2024-01-20T15:45:00Z              |

### Common MIME Types

- `application/pdf`: PDF
- `image/jpeg`, `image/png`: Hình ảnh
- `application/vnd.ms-excel`: Excel
- `application/msword`: Word
- `application/zip`: ZIP

### Relationships

- **belongsTo** YouthUnionMember
- **belongsTo** YouthUnionBranch

---

## Audit Log

Nhật ký hoạt động

### Fields

| Field      | Type        | Required | Description   | Example              |
| ---------- | ----------- | -------- | ------------- | -------------------- |
| id         | Integer     | Auto     | ID            | 1                    |
| userId     | Integer     | No       | ID người dùng | 1                    |
| action     | String(100) | No       | Hành động     | CREATE_MEMBER        |
| resource   | String(100) | No       | Resource      | youth_union_member   |
| resourceId | Integer     | No       | ID resource   | 1                    |
| oldData    | JSON        | No       | Dữ liệu cũ    | {...}                |
| newData    | JSON        | No       | Dữ liệu mới   | {...}                |
| ipAddress  | String(45)  | No       | IP address    | 192.168.1.1          |
| userAgent  | String(500) | No       | User agent    | Mozilla/5.0...       |
| createdAt  | DateTime    | Auto     | Ngày tạo      | 2024-01-15T10:30:00Z |

---

## Enums Summary

### Member Status

- `active`: Đang hoạt động
- `inactive`: Không hoạt động
- `graduated`: Đã tốt nghiệp
- `transferred`: Đã chuyển đi

### Activity Type

- `tinh-nguyen`: Tình nguyện
- `hoc-tap`: Học tập
- `the-thao`: Thể thao
- `van-hoa`: Văn hóa
- `thi-dua`: Thi đua
- `khac`: Khác

### Activity Status

- `planned`: Đã lên kế hoạch
- `ongoing`: Đang diễn ra
- `completed`: Đã hoàn thành
- `cancelled`: Đã hủy

### Attendance Status

- `registered`: Đã đăng ký
- `attended`: Đã tham gia
- `absent`: Vắng mặt
- `excused`: Có phép

### Transfer Status

- `pending`: Chờ duyệt
- `approved`: Đã duyệt
- `rejected`: Đã từ chối
- `completed`: Đã hoàn tất

### Review Type

- `khen-thuong`: Khen thưởng
- `ky-luat`: Kỷ luật
- `thi-dua`: Thi đua
- `danh-gia-dinh-ky`: Đánh giá định kỳ
- `xep-loai`: Xếp loại
- `khac`: Khác

---

**Last Updated:** November 11, 2025  
**Version:** 1.0.0
