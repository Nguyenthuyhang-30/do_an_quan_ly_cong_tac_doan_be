# 📚 API Documentation - Hệ thống Quản lý Công tác Đoàn

Tài liệu hướng dẫn sử dụng API cho Frontend Developers

---

## 🚀 Quick Start

### 1. Base URLs

- **Development:** `http://localhost:3055/v1/api`
- **Production:** `https://dtn-api.aiotlab.edu.vn/v1/api`
- **Swagger UI:** `http://localhost:3055/api-docs`

### 2. Authentication

```javascript
// Login
POST /access/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "metadata": {
    "user": { ... },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}

// Use token in subsequent requests
Authorization: Bearer {accessToken}
```

### 3. Common Response Format

```javascript
// Success
{
  "message": "Operation successful",
  "status": 200,
  "metadata": { ... }
}

// Error
{
  "message": "Error message",
  "status": 400,
  "error": { ... }
}

// Pagination
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

## 📖 Available Documentation

### 1. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

**Chi tiết tất cả endpoints có sẵn**

Bao gồm:

- ✅ Authentication APIs (Login, Register, Logout, Refresh Token)
- ✅ Youth Union Member APIs (CRUD, Search, Statistics, Transfer)
- ✅ Youth Union Branch APIs (CRUD, Statistics)
- ✅ Cohort APIs (CRUD)
- ✅ Activity APIs (CRUD, Registration, Attendance, Statistics)
- ✅ Member Transfer APIs (Create, Approve, Reject, Statistics)
- ✅ Member Role APIs (Assign, End, History)
- ✅ Member Review APIs (CRUD, Points, History, Statistics)
- ✅ Account APIs (Profile, Change Password, Role Management)
- ✅ Slider Banner APIs (CRUD, Order Management)
- ✅ Content Introduct APIs (CMS, SEO Management)
- ✅ File Upload APIs (Upload, Batch Upload, Management)

**Tổng số:** ~100+ endpoints được documented đầy đủ

### 2. [DATA_MODELS.md](./DATA_MODELS.md)

**Cấu trúc dữ liệu của tất cả models**

Bao gồm:

- YouthUnionMember (Đoàn viên)
- YouthUnionBranch (Chi đoàn)
- Cohort (Khóa học)
- Activity (Hoạt động)
- MemberActivityMap (Đăng ký hoạt động)
- MemberTransfer (Chuyển chi đoàn)
- MemberRole (Vai trò)
- MemberReview (Đánh giá)
- Account (Tài khoản)
- SliderBanner (Banner trang chủ)
- ContentIntroduct (Nội dung CMS)
- FileUpload (Quản lý file)
- And more...

### 3. [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md)

**Hướng dẫn tích hợp cho Frontend**

Bao gồm:

- Setup & Configuration
- Authentication Flow với JWT
- API Client Setup (Axios, Interceptors)
- React Examples (với React Query)
- Vue.js Examples (với Vue Query)
- State Management (Zustand, Pinia)
- Error Handling
- File Upload Flow
- Best Practices
- Testing Examples

---

## 🎯 API Modules Overview

### Core Modules (Quản lý chính)

| Module         | Endpoints    | Description                                          |
| -------------- | ------------ | ---------------------------------------------------- |
| **Members**    | 15 endpoints | Quản lý đoàn viên (CRUD, search, statistics, status) |
| **Branches**   | 10 endpoints | Quản lý chi đoàn                                     |
| **Cohorts**    | 8 endpoints  | Quản lý khóa học                                     |
| **Activities** | 18 endpoints | Quản lý hoạt động đoàn                               |

### Management Modules (Quản lý nghiệp vụ)

| Module              | Endpoints    | Description                                |
| ------------------- | ------------ | ------------------------------------------ |
| **Member Transfer** | 12 endpoints | Chuyển chi đoàn (request, approve, reject) |
| **Member Role**     | 10 endpoints | Phân công vai trò đoàn viên                |
| **Member Review**   | 19 endpoints | Đánh giá, khen thưởng, kỷ luật             |
| **Account**         | 8 endpoints  | Quản lý tài khoản người dùng               |

### Website Configuration (Cấu hình website)

| Module                | Endpoints    | Description                     |
| --------------------- | ------------ | ------------------------------- |
| **Slider Banner**     | 13 endpoints | Quản lý banner/slider trang chủ |
| **Content Introduct** | 14 endpoints | CMS nội dung giới thiệu         |
| **File Upload**       | 13 endpoints | Quản lý file upload             |

---

## 🔑 Key Features

### 1. Member Management

- ✅ CRUD operations
- ✅ Advanced search & filters
- ✅ Status tracking (active, inactive, graduated, transferred)
- ✅ Branch & cohort assignment
- ✅ Import/export capabilities
- ✅ Statistics & analytics

### 2. Activity Management

- ✅ Activity CRUD
- ✅ Member registration
- ✅ Attendance tracking
- ✅ Participant management
- ✅ Activity types (tình nguyện, học tập, thể thao, văn hóa, thi đua)
- ✅ Statistics by type, status

### 3. Review & Evaluation

- ✅ Multiple review types (khen thưởng, kỷ luật, thi đua, đánh giá định kỳ, xếp loại)
- ✅ Point system (positive & negative)
- ✅ Total points calculation
- ✅ Review history by period
- ✅ Batch review creation
- ✅ Comprehensive statistics

### 4. Transfer Management

- ✅ Transfer request workflow
- ✅ Approval/rejection process
- ✅ Transfer history tracking
- ✅ Automatic status updates
- ✅ Statistics & reporting

### 5. Role Management

- ✅ Role assignment
- ✅ Active role tracking
- ✅ Role history
- ✅ Multiple roles per member
- ✅ Role expiration

### 6. Website Configuration

- ✅ Dynamic slider/banner management
- ✅ Order management for sliders
- ✅ CMS for content pages
- ✅ SEO optimization (meta tags)
- ✅ File upload & management
- ✅ Association with members/branches

---

## 📊 Common API Patterns

### 1. List with Pagination

```javascript
GET /endpoint/get-list?page=1&limit=10&search=keyword

// Response
{
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

### 2. Search with Filters

```javascript
GET /endpoint/search?search=keyword&dateFrom=2024-01-01&status=active

// Multiple filters supported
```

### 3. Statistics

```javascript
GET / endpoint / statistics;

// Response includes:
// - Total counts
// - Breakdown by categories
// - Top items
// - Recent activities
// - Trend data
```

### 4. Batch Operations

```javascript
// Batch create
POST /endpoint/batch
{
  "items": [...]
}

// Batch delete
DELETE /endpoint
{
  "ids": [1, 2, 3]
}
```

---

## 🛠️ Setup Instructions

### For React Projects

```bash
# Install dependencies
npm install axios @tanstack/react-query react-hook-form zustand

# Setup API client
# See FRONTEND_INTEGRATION.md for detailed setup
```

### For Vue.js Projects

```bash
# Install dependencies
npm install axios @tanstack/vue-query pinia

# Setup API client
# See FRONTEND_INTEGRATION.md for detailed setup
```

---

## 📝 Usage Examples

### Example 1: Fetch Members with Pagination

```javascript
import memberService from "./api/memberService";

const fetchMembers = async (page = 1) => {
  try {
    const data = await memberService.getList({
      page,
      limit: 10,
      search: "",
      branchId: null,
      status: "active",
    });

    console.log("Members:", data.data);
    console.log("Total:", data.pagination.total);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Example 2: Create Member Review

```javascript
import reviewService from "./api/reviewService";

const createReview = async () => {
  try {
    const review = await reviewService.create({
      member_id: 1,
      review_type: "khen-thuong",
      title: "Đoàn viên xuất sắc tháng 1/2024",
      description: "Tích cực tham gia hoạt động",
      point: 10,
      created_by: 5,
    });

    console.log("Review created:", review);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Example 3: Register for Activity

```javascript
import activityService from "./api/activityService";

const registerActivity = async (activityId, memberId) => {
  try {
    const result = await activityService.register(activityId, memberId);
    console.log("Registered successfully:", result);
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
};
```

### Example 4: Upload File

```javascript
import { uploadFile } from "./utils/uploadFile";

const handleFileUpload = async (file, memberId) => {
  try {
    const result = await uploadFile(file, {
      memberId,
      description: "Hồ sơ đoàn viên",
      onProgress: (percent) => console.log(`Progress: ${percent}%`),
    });

    console.log("File uploaded:", result);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
};
```

---

## 🔒 Authentication & Authorization

### Token Management

```javascript
// Store tokens after login
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Include token in requests
headers: {
  'Authorization': `Bearer ${accessToken}`
}

// Refresh token when expired
POST /access/refresh-token
{
  "refreshToken": "..."
}
```

### Token Expiration

- **Access Token:** 7 days
- **Refresh Token:** 30 days

---

## ❌ Error Handling

### HTTP Status Codes

| Code | Meaning      | Description              |
| ---- | ------------ | ------------------------ |
| 200  | OK           | Request successful       |
| 201  | Created      | Resource created         |
| 400  | Bad Request  | Invalid data             |
| 401  | Unauthorized | Authentication required  |
| 403  | Forbidden    | Insufficient permissions |
| 404  | Not Found    | Resource not found       |
| 409  | Conflict     | Resource conflict        |
| 500  | Server Error | Internal error           |

### Error Response Format

```javascript
{
  "message": "Error description",
  "status": 400,
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

---

## 📊 Response Data Types

### Member Object

```typescript
interface Member {
  id: number;
  code: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  address?: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  branchId: number;
  cohortId: number;
  branch?: Branch;
  cohort?: Cohort;
  createdAt: string;
  updatedAt: string;
}
```

### Activity Object

```typescript
interface Activity {
  id: number;
  code: string;
  name: string;
  description?: string;
  activityType:
    | "tinh-nguyen"
    | "hoc-tap"
    | "the-thao"
    | "van-hoa"
    | "thi-dua"
    | "khac";
  startDate?: string;
  endDate?: string;
  location?: string;
  status: "planned" | "ongoing" | "completed" | "cancelled";
  maxParticipants?: number;
  currentParticipants?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Review Object

```typescript
interface Review {
  id: number;
  member_id: number;
  review_type:
    | "khen-thuong"
    | "ky-luat"
    | "thi-dua"
    | "danh-gia-dinh-ky"
    | "xep-loai"
    | "khac";
  title: string;
  description?: string;
  point?: number;
  created_at: string;
  created_by?: number;
  member?: Member;
}
```

---

## 🎨 UI/UX Recommendations

### Pagination

- Default: 10 items per page
- Options: 10, 20, 50, 100
- Show total count and current page

### Search

- Implement debounce (300-500ms)
- Show loading indicator
- Clear search button
- Show "No results" message

### Filters

- Multiple filter support
- Clear filters button
- Save filter preferences
- Filter count badge

### Forms

- Client-side validation
- Show error messages
- Disable submit during API call
- Success/error notifications

### Tables

- Sortable columns
- Row actions (view, edit, delete)
- Bulk selection
- Export functionality

---

## 🚦 Rate Limiting & Performance

### Best Practices

1. **Debounce search inputs** (300-500ms)
2. **Cache frequently accessed data**
3. **Use pagination** for large datasets
4. **Implement request cancellation** for outdated requests
5. **Optimize images** before upload
6. **Lazy load** components and data
7. **Use optimistic updates** for better UX

### Caching Strategy

```javascript
// React Query example
{
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false
}
```

---

## 🧪 Testing

### API Testing Tools

- **Swagger UI:** `http://localhost:3055/api-docs`
- **Postman/Insomnia:** Import collection from docs
- **REST Client (VS Code):** Use `.http` files in `src/postman/`

### Test Data

- Use test accounts provided by backend team
- Don't use production data in development
- Reset test database when needed

---

## 📞 Support & Resources

### Documentation Files

- `API_DOCUMENTATION.md` - Complete API reference
- `DATA_MODELS.md` - Database models & relationships
- `FRONTEND_INTEGRATION.md` - Integration guide with code examples

### Swagger UI

- Development: `http://localhost:3055/api-docs`
- Production: `https://dtn-api.aiotlab.edu.vn/api-docs`

### Contact

- Backend Team: [Contact information]
- Issue Tracker: [Repository issues]
- Slack Channel: [Channel name]

---

## 📅 Version History

### v1.0.0 (November 11, 2025)

- ✅ Initial release
- ✅ All core modules implemented
- ✅ Authentication & authorization
- ✅ Member management (15 endpoints)
- ✅ Activity management (18 endpoints)
- ✅ Review system (19 endpoints)
- ✅ Transfer workflow (12 endpoints)
- ✅ Role management (10 endpoints)
- ✅ Website configuration (40 endpoints)
- ✅ File upload system (13 endpoints)
- ✅ Comprehensive Swagger documentation
- ✅ Frontend integration examples

**Total:** 100+ documented endpoints

---

## 🎯 Next Steps

1. **Read** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference
2. **Review** [DATA_MODELS.md](./DATA_MODELS.md) to understand data structure
3. **Follow** [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) for integration
4. **Test** APIs using Swagger UI
5. **Start** building your frontend application

---

**Happy Coding! 🚀**

---

**Last Updated:** November 11, 2025  
**API Version:** 1.0.0  
**Documentation Version:** 1.0.0
