# API Documentation - Hệ thống Quản lý Công tác Đoàn

Tài liệu hướng dẫn sử dụng API cho Frontend Developers

## 1. Overview

Hệ thống API RESTful toàn diện cho việc quản lý công tác Đoàn thanh niên, cung cấp các chức năng từ quản lý đoàn viên, hoạt động, đánh giá đến cấu hình website.

**Base URLs:**

- **Development:** `http://localhost:3052/v1/api`
- **Production:** `https://dtn-api.aiotlab.edu.vn/v1/api`
- **Swagger UI:** `http://localhost:3052/api-docs`

**Tổng số:** 100+ documented endpoints

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

### Key Features

**Member Management:**

- CRUD operations
- Advanced search & filters
- Status tracking (active, inactive, graduated, transferred)
- Branch & cohort assignment
- Import/export capabilities
- Statistics & analytics

**Activity Management:**

- Activity CRUD
- Member registration
- Attendance tracking
- Participant management
- Activity types (tình nguyện, học tập, thể thao, văn hóa, thi đua)
- Statistics by type, status

**Review & Evaluation:**

- Multiple review types (khen thưởng, kỷ luật, thi đua, đánh giá định kỳ, xếp loại)
- Point system (positive & negative)
- Total points calculation
- Review history by period
- Batch review creation
- Comprehensive statistics

**Transfer Management:**

- Transfer request workflow
- Approval/rejection process
- Transfer history tracking
- Automatic status updates
- Statistics & reporting

**Role Management:**

- Role assignment
- Active role tracking
- Role history
- Multiple roles per member
- Role expiration

**Website Configuration:**

- Dynamic slider/banner management
- Order management for sliders
- CMS for content pages
- SEO optimization (meta tags)
- File upload & management
- Association with members/branches

---

## 2. Requirements / Prerequisites

### Technical Requirements

**Backend:**

- Node.js >= 14.x
- PostgreSQL >= 12.x
- MongoDB >= 4.x (optional)

**Frontend:**

- Modern browser with ES6+ support
- HTTP Client library (Axios recommended)
- State management library (optional but recommended)

### Knowledge Prerequisites

- Understanding of RESTful APIs
- HTTP methods (GET, POST, PUT, DELETE)
- JSON format
- JWT authentication
- Pagination and filtering concepts
- Async/await or Promises

### Available Documentation Files

1. **API_DOCUMENTATION.md** - Complete API reference with all endpoints
2. **DATA_MODELS.md** - Database models & relationships
3. **FRONTEND_INTEGRATION.md** - Integration guide with React/Vue examples

---

## 3. Setup / Installation

### For React Projects

```bash
# Install dependencies
npm install axios @tanstack/react-query react-hook-form zustand

# Create environment file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3052/v1/api
VITE_API_TIMEOUT=30000
EOF
```

### For Vue.js Projects

```bash
# Install dependencies
npm install axios @tanstack/vue-query pinia

# Create environment file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3052/v1/api
VITE_API_TIMEOUT=30000
EOF
```

### API Client Setup

Create `src/api/interceptors.js`:

```javascript
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/access/refresh-token`,
          { refreshToken }
        );

        const { accessToken } = response.data.metadata;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 4. Usage

### Authentication Flow

#### Login

```javascript
POST /access/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

// Response
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

// Use token in subsequent requests
Authorization: Bearer {accessToken}
```

#### Token Management

```javascript
// Store tokens after login
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Refresh token when expired
POST /access/refresh-token
{
  "refreshToken": "..."
}
```

**Token Expiration:**

- Access Token: 7 days
- Refresh Token: 30 days

### Common Response Formats

**Success Response:**

```javascript
{
  "message": "Operation successful",
  "status": 200,
  "metadata": { ... }
}
```

**Error Response:**

```javascript
{
  "message": "Error message",
  "status": 400,
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

**Pagination Response:**

```javascript
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

### Common API Patterns

#### 1. List with Pagination

```javascript
GET /endpoint/get-list?page=1&limit=10&search=keyword

// Response includes data and pagination info
```

#### 2. Search with Filters

```javascript
GET /endpoint/search?search=keyword&dateFrom=2024-01-01&status=active

// Multiple filters supported for refined results
```

#### 3. Statistics

```javascript
GET / endpoint / statistics;

// Response includes:
// - Total counts
// - Breakdown by categories
// - Top items
// - Recent activities
// - Trend data
```

#### 4. Batch Operations

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

### Usage Examples

#### Example 1: Fetch Members with Pagination

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

#### Example 2: Create Member Review

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

#### Example 3: Register for Activity

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

#### Example 4: Upload File

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

### Response Data Types

#### Member Object

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

#### Activity Object

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

#### Review Object

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

## 5. Configuration

### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3052/v1/api
VITE_API_TIMEOUT=30000

# CDN Configuration (if using file upload)
VITE_CDN_URL=https://cdn.example.com
VITE_CDN_UPLOAD_URL=https://cdn.example.com/upload
```

### React Query Configuration

```javascript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Caching Strategy

**Static data** (branches, cohorts):

```javascript
{
  staleTime: 30 * 60 * 1000,  // 30 minutes
  cacheTime: 60 * 60 * 1000   // 60 minutes
}
```

**Dynamic data** (members list):

```javascript
{
  staleTime: 5 * 60 * 1000,   // 5 minutes
  cacheTime: 10 * 60 * 1000   // 10 minutes
}
```

**Real-time data**:

```javascript
{
  staleTime: 0,  // Always refetch
  cacheTime: 0
}
```

### UI/UX Recommendations

**Pagination:**

- Default: 10 items per page
- Options: 10, 20, 50, 100
- Show total count and current page

**Search:**

- Implement debounce (300-500ms)
- Show loading indicator
- Clear search button
- Show "No results" message

**Filters:**

- Multiple filter support
- Clear filters button
- Save filter preferences
- Filter count badge

**Forms:**

- Client-side validation
- Show error messages
- Disable submit during API call
- Success/error notifications

**Tables:**

- Sortable columns
- Row actions (view, edit, delete)
- Bulk selection
- Export functionality

---

## 6. Error & Troubleshooting

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

### Common Errors

#### 1. Authentication Errors

**Error 401: Unauthorized**

```javascript
{
  "message": "Unauthorized",
  "status": 401
}
```

**Solutions:**

- Check if access token is valid
- Use refresh token to get new access token
- Re-login if refresh token expired

#### 2. Validation Errors

**Error 400: Bad Request**

```javascript
{
  "message": "Validation failed",
  "status": 400,
  "error": {
    "details": "Email không đúng định dạng"
  }
}
```

**Solutions:**

- Check request payload format
- Ensure all required fields are provided
- Validate data types match API expectations

#### 3. Network Errors

**Error: Network Error**

```
Unable to connect to server
```

**Solutions:**

- Verify backend server is running
- Check API_BASE_URL in .env file
- Verify network connectivity
- Check CORS configuration

#### 4. Rate Limiting

**Too many requests**

**Solutions:**

- Implement debounce for search inputs (300-500ms)
- Cache frequently accessed data
- Use pagination for large datasets
- Implement request cancellation for outdated requests

### Performance Best Practices

1. **Debounce search inputs** (300-500ms)
2. **Cache frequently accessed data**
3. **Use pagination** for large datasets
4. **Implement request cancellation** for outdated requests
5. **Optimize images** before upload
6. **Lazy load** components and data
7. **Use optimistic updates** for better UX

### Testing Tools

**Swagger UI:**

- Development: `http://localhost:3052/api-docs`
- Production: `https://dtn-api.aiotlab.edu.vn/api-docs`

**Postman/Insomnia:**

- Import collection from docs
- Use test data provided by backend team

**REST Client (VS Code):**

- Use `.http` files in `src/postman/` directory

---

## 7. FAQ / Notes

### Frequently Asked Questions

**Q1: How do I handle token expiration?**

A: The axios interceptor automatically handles token refresh. If refresh fails, user is redirected to login page.

**Q2: What pagination parameters are supported?**

A: Common parameters are `page`, `limit`, `search`. Some endpoints support additional filters like `branchId`, `cohortId`, `status`, `dateFrom`, `dateTo`.

**Q3: How do I upload files?**

A: Upload file to CDN first, then save the URL to database via `/file-upload` endpoint. See FRONTEND_INTEGRATION.md for detailed example.

**Q4: Can I batch create/delete items?**

A: Yes, many endpoints support batch operations. Use `/batch` for creation and send `ids` array for deletion.

**Q5: How are statistics calculated?**

A: Statistics endpoints aggregate data from database and return counts, breakdowns, and trend data. Results are cached for performance.

**Q6: What caching strategy should I use?**

A: Use longer cache times (30+ minutes) for static data like branches/cohorts. Use shorter times (5 minutes) for dynamic data like member lists.

**Q7: How do I handle search with multiple filters?**

A: Combine query parameters in the URL. Most search endpoints support multiple filters simultaneously.

### Important Notes

**Authentication:**

- Store tokens in localStorage (or secure storage for mobile)
- Implement automatic token refresh
- Clear all auth data on logout
- Handle 401 responses globally

**Data Validation:**

- Validate on client-side before API call
- Display clear error messages
- Use proper data types (dates, numbers, strings)
- Handle edge cases (empty arrays, null values)

**Performance:**

- Implement debouncing for search/filter inputs
- Use pagination instead of loading all data
- Cache frequently accessed data
- Cancel outdated requests
- Lazy load images and heavy components

**Security:**

- Never store sensitive data in localStorage without encryption
- Always use HTTPS in production
- Validate and sanitize user input
- Implement CSRF protection if needed

**Best Practices:**

- Use TypeScript for better type safety
- Implement proper error boundaries
- Add loading states for all async operations
- Provide user feedback for all actions
- Follow consistent naming conventions

### Version History

**v1.0.0 (December 15, 2025)**

- Initial release
- All core modules implemented
- Authentication & authorization
- 100+ documented endpoints
- Comprehensive Swagger documentation
- Frontend integration examples
- React and Vue.js examples

### Next Steps

1. **Read** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference
2. **Review** [DATA_MODELS.md](./DATA_MODELS.md) to understand data structure
3. **Follow** [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) for integration
4. **Test** APIs using Swagger UI
5. **Start** building your frontend application

### Support & Resources

**Documentation:**

- API_DOCUMENTATION.md - Complete API reference
- DATA_MODELS.md - Database models & relationships
- FRONTEND_INTEGRATION.md - Integration guide with code examples

**Swagger UI:**

- Development: `http://localhost:3052/api-docs`
- Production: `https://dtn-api.aiotlab.edu.vn/api-docs`

**Contact:**

- Backend Team: Contact your backend team for issues
- Issue Tracker: Repository issues
- Project Documentation: Check `/docs` folder

---

**Last Updated:** December 15, 2025  
**API Version:** 1.0.0  
**Documentation Version:** 1.0.0
