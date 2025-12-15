# Frontend Integration Guide

Hướng dẫn tích hợp API cho Frontend Developer

## 1. Overview

Tài liệu này hướng dẫn Frontend Developer cách tích hợp với API Backend của hệ thống Quản lý Công tác Đoàn. Tài liệu bao gồm các ví dụ thực tế với React và Vue.js, cùng với các best practices để xây dựng ứng dụng frontend hiệu quả.

**Nội dung chính:**

- Setup và configuration cho dự án frontend
- Authentication flow và token management
- API client setup với Axios
- Common patterns (pagination, search, filter)
- React examples với React Query
- Vue.js examples với Composition API
- State management với Zustand/Pinia
- Error handling và toast notifications
- File upload integration
- Testing strategies

**Tech Stack được hỗ trợ:**

- React 18+ với React Query
- Vue 3+ với Composition API
- Axios cho HTTP client
- Zustand/Pinia cho state management

---

## 2. Requirements / Prerequisites

### Yêu cầu kỹ thuật

**Node.js và Package Manager:**

- Node.js >= 16.x
- npm >= 8.x hoặc yarn >= 1.22.x

**Framework:**

- React >= 18.x hoặc Vue >= 3.x
- React Router >= 6.x (cho React)
- Vue Router >= 4.x (cho Vue)

**Thư viện bắt buộc:**

- axios >= 1.x
- @tanstack/react-query >= 4.x (React) hoặc @tanstack/vue-query >= 4.x (Vue)

**Thư viện khuyến nghị:**

- react-hook-form hoặc formik (React forms)
- react-hot-toast hoặc react-toastify (Notifications)
- zustand hoặc redux-toolkit (React state)
- pinia (Vue state)

### Kiến thức cần có

- JavaScript ES6+ (async/await, destructuring, spread operator)
- React Hooks hoặc Vue Composition API
- HTTP methods và RESTful API
- JWT authentication
- Promise và error handling
- State management concepts

### API Backend

- Backend server đã chạy tại `http://localhost:3052`
- API documentation có tại `/api-docs`
- Access token và refresh token mechanism

---

## 3. Setup / Installation

### Bước 1: Khởi tạo dự án

**React với Vite:**

```bash
npm create vite@latest my-doan-app -- --template react
cd my-doan-app
npm install
```

**Vue với Vite:**

```bash
npm create vite@latest my-doan-app -- --template vue
cd my-doan-app
npm install
```

### Bước 2: Cài đặt dependencies

```bash
# Core dependencies
npm install axios

# React Query (cho React)
npm install @tanstack/react-query

# Vue Query (cho Vue)
npm install @tanstack/vue-query

# Form handling (React)
npm install react-hook-form

# State management
npm install zustand          # React
npm install pinia           # Vue

# Notifications
npm install react-hot-toast  # React

# Routing
npm install react-router-dom # React (nếu chưa có)
```

### Bước 3: Cấu hình Environment Variables

### Bước 3: Cấu hình Environment Variables

Tạo file `.env` trong thư mục root của dự án:

```bash
# .env
VITE_API_BASE_URL=http://localhost:3052/v1/api
VITE_API_TIMEOUT=30000
VITE_CDN_URL=https://cdn.example.com
VITE_CDN_UPLOAD_URL=https://cdn.example.com/upload
```

### Bước 4: Cấu trúc thư mục đề xuất

```
src/
├── api/
│   ├── interceptors.js      # Axios interceptors
│   ├── baseService.js       # Base service class
│   ├── authService.js       # Authentication service
│   ├── memberService.js     # Member API service
│   ├── activityService.js   # Activity API service
│   └── ...
├── components/
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── FileUpload.jsx
│   └── ...
├── pages/
│   ├── MemberList.jsx
│   ├── MemberForm.jsx
│   ├── Dashboard.jsx
│   └── ...
├── hooks/
│   ├── useDebounce.js
│   └── useCancellableQuery.js
├── store/
│   ├── authStore.js         # Auth state management
│   └── ...
├── utils/
│   ├── errorHandler.js
│   ├── validation.js
│   └── uploadFile.js
└── App.jsx
```

### Bước 5: Setup Axios Interceptors

Tạo file `src/api/interceptors.js`:

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

// Response interceptor
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

#### Login

Tạo file `src/api/authService.js`:

```javascript
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/access/login`, {
      email,
      password,
    });

    if (response.data.status === 200) {
      const { accessToken, refreshToken } = response.data.metadata.tokens;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.metadata.user));

      return response.data.metadata;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    await axios.post(
      `${API_URL}/access/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
```

#### Base API Service

Tạo file `src/api/baseService.js`:

```javascript
import apiClient from "./interceptors";

class BaseService {
  constructor(resource) {
    this.resource = resource;
  }

  async getAll() {
    const response = await apiClient.get(`/${this.resource}/get-all`);
    return response.data.metadata;
  }

  async getList(params = {}) {
    const { page = 1, limit = 10, search = "", ...filters } = params;
    const response = await apiClient.get(`/${this.resource}/get-list`, {
      params: { page, limit, search, ...filters },
    });
    return response.data.metadata;
  }

  async getById(id) {
    const response = await apiClient.get(`/${this.resource}/${id}`);
    return response.data.metadata;
  }

  async create(data) {
    const response = await apiClient.post(`/${this.resource}`, data);
    return response.data.metadata;
  }

  async update(id, data) {
    const response = await apiClient.put(`/${this.resource}/${id}`, data);
    return response.data.metadata;
  }

  async delete(id) {
    const response = await apiClient.delete(`/${this.resource}/${id}`);
    return response.data;
  }

  async search(params) {
    const response = await apiClient.get(`/${this.resource}/search`, {
      params,
    });
    return response.data.metadata;
  }

  async getStatistics() {
    const response = await apiClient.get(`/${this.resource}/statistics`);
    return response.data.metadata;
  }
}

export default BaseService;
```

#### Specific Service Examples

**Member Service** (`src/api/memberService.js`):

```javascript
import BaseService from "./baseService";
import apiClient from "./interceptors";

class MemberService extends BaseService {
  constructor() {
    super("youth-union-member");
  }

  async getByBranch(branchId, params = {}) {
    const response = await apiClient.get(
      `/youth-union-member/branch/${branchId}`,
      { params }
    );
    return response.data.metadata;
  }

  async getByCohort(cohortId, params = {}) {
    const response = await apiClient.get(
      `/youth-union-member/cohort/${cohortId}`,
      { params }
    );
    return response.data.metadata;
  }

  async updateStatus(id, status) {
    const response = await apiClient.put(`/youth-union-member/${id}/status`, {
      status,
    });
    return response.data.metadata;
  }
}

export default new MemberService();
```

**Activity Service** (`src/api/activityService.js`):

```javascript
import BaseService from "./baseService";
import apiClient from "./interceptors";

class ActivityService extends BaseService {
  constructor() {
    super("activity");
  }

  async register(activityId, memberId) {
    const response = await apiClient.post(`/activity/${activityId}/register`, {
      memberId,
    });
    return response.data.metadata;
  }

  async getParticipants(activityId, params = {}) {
    const response = await apiClient.get(
      `/activity/${activityId}/participants`,
      { params }
    );
    return response.data.metadata;
  }
}

export default new ActivityService();
```

### Common Patterns

#### 1. Pagination Component

```javascript
// components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
```

#### 2. Search with Debounce

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

```javascript
// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Tìm kiếm..."
    />
  );
};

export default SearchBar;
```

#### 3. Filter Component

```javascript
// components/MemberFilter.jsx
import React from "react";

const MemberFilter = ({ filters, onFilterChange, branches, cohorts }) => {
  return (
    <div className="filters">
      <select
        value={filters.branchId || ""}
        onChange={(e) => onFilterChange("branchId", e.target.value)}
      >
        <option value="">Tất cả chi đoàn</option>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>

      <select
        value={filters.cohortId || ""}
        onChange={(e) => onFilterChange("cohortId", e.target.value)}
      >
        <option value="">Tất cả khóa</option>
        {cohorts.map((cohort) => (
          <option key={cohort.id} value={cohort.id}>
            {cohort.name}
          </option>
        ))}
      </select>

      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange("status", e.target.value)}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang hoạt động</option>
        <option value="inactive">Không hoạt động</option>
        <option value="graduated">Đã tốt nghiệp</option>
        <option value="transferred">Đã chuyển đi</option>
      </select>
    </div>
  );
};

export default MemberFilter;
```

### React Examples

#### Member List with React Query

        <option value="active">Đang hoạt động</option>
        <option value="inactive">Không hoạt động</option>
        <option value="graduated">Đã tốt nghiệp</option>
        <option value="transferred">Đã chuyển đi</option>
      </select>
    </div>

);
};

export default MemberFilter;

````

---

## React Examples

### 1. Member List with React Query

```javascript
// pages/MemberList.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import memberService from "../api/memberService";
import SearchBar from "../components/SearchBar";
import MemberFilter from "../components/MemberFilter";
import Pagination from "../components/Pagination";

const MemberList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    branchId: "",
    cohortId: "",
    status: "",
  });

  // Fetch members
  const { data, isLoading, error } = useQuery({
    queryKey: ["members", page, search, filters],
    queryFn: () =>
      memberService.getList({
        page,
        limit: 10,
        search,
        ...filters,
      }),
    keepPreviousData: true,
  });

  // Fetch branches for filter
  const { data: branches } = useQuery({
    queryKey: ["branches"],
    queryFn: () => memberService.getAll(), // Assume you have branchService
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="member-list">
      <h1>Danh sách đoàn viên</h1>

      <SearchBar onSearch={setSearch} />

      <MemberFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        branches={branches || []}
      />

      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Chi đoàn</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((member) => (
            <tr key={member.id}>
              <td>{member.code}</td>
              <td>{member.fullName}</td>
              <td>{member.email}</td>
              <td>{member.branch?.name}</td>
              <td>{member.status}</td>
              <td>
                <button>Xem</button>
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={data?.pagination.page}
        totalPages={data?.pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MemberList;
````

### 2. Create/Edit Member Form

```javascript
// pages/MemberForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import memberService from "../api/memberService";

const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (isEdit) {
        return await memberService.getById(id);
      }
      return {};
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return isEdit
        ? memberService.update(id, data)
        : memberService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      navigate("/members");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isEdit ? "Sửa đoàn viên" : "Thêm đoàn viên"}</h1>

      <div>
        <label>Mã đoàn viên *</label>
        <input
          {...register("code", { required: "Vui lòng nhập mã đoàn viên" })}
        />
        {errors.code && <span>{errors.code.message}</span>}
      </div>

      <div>
        <label>Họ và tên *</label>
        <input
          {...register("fullName", { required: "Vui lòng nhập họ tên" })}
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
      </div>

      <div>
        <label>Email *</label>
        <input
          type="email"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Số điện thoại</label>
        <input {...register("phoneNumber")} />
      </div>

      <div>
        <label>Ngày sinh</label>
        <input type="date" {...register("dateOfBirth")} />
      </div>

      <div>
        <label>Giới tính</label>
        <select {...register("gender")}>
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>

      <div>
        <label>Địa chỉ</label>
        <textarea {...register("address")} />
      </div>

      <div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Đang lưu..." : "Lưu"}
        </button>
        <button type="button" onClick={() => navigate("/members")}>
          Hủy
        </button>
      </div>

      {mutation.isError && (
        <div className="error">{mutation.error.message}</div>
      )}
    </form>
  );
};

export default MemberForm;
```

### 3. Dashboard with Statistics

```javascript
// pages/Dashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import memberService from "../api/memberService";
import activityService from "../api/activityService";
import reviewService from "../api/reviewService";

const Dashboard = () => {
  const { data: memberStats } = useQuery({
    queryKey: ["member-statistics"],
    queryFn: () => memberService.getStatistics(),
  });

  const { data: activityStats } = useQuery({
    queryKey: ["activity-statistics"],
    queryFn: () => activityService.getStatistics(),
  });

  const { data: reviewStats } = useQuery({
    queryKey: ["review-statistics"],
    queryFn: () => reviewService.getStatistics(),
  });

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng đoàn viên</h3>
          <p className="stat-number">{memberStats?.totalMembers}</p>
          <div className="stat-details">
            <span>Đang hoạt động: {memberStats?.activeMembers}</span>
            <span>Không hoạt động: {memberStats?.inactiveMembers}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>Hoạt động</h3>
          <p className="stat-number">{activityStats?.totalActivities}</p>
          <div className="stat-details">
            <span>Đang diễn ra: {activityStats?.ongoingActivities}</span>
            <span>Đã hoàn thành: {activityStats?.completedActivities}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>Đánh giá</h3>
          <p className="stat-number">{reviewStats?.totalReviews}</p>
          <div className="stat-details">
            <span>
              Khen thưởng:{" "}
              {reviewStats?.reviewsByType?.find(
                (t) => t.review_type === "khen-thuong"
              )?.count || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="charts">
        {/* Add charts here using libraries like Chart.js or Recharts */}
      </div>
    </div>
  );
};

export default Dashboard;
```

---

## Vue.js Examples

### 1. Member List (Vue 3 Composition API)

```vue
<!-- pages/MemberList.vue -->
<template>
  <div class="member-list">
    <h1>Danh sách đoàn viên</h1>

    <SearchBar @search="handleSearch" />

    <MemberFilter
      :filters="filters"
      :branches="branches"
      @filter-change="handleFilterChange"
    />

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>

    <table v-else>
      <thead>
        <tr>
          <th>Mã</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Chi đoàn</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members?.data" :key="member.id">
          <td>{{ member.code }}</td>
          <td>{{ member.fullName }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.branch?.name }}</td>
          <td>{{ member.status }}</td>
          <td>
            <button @click="viewMember(member.id)">Xem</button>
            <button @click="editMember(member.id)">Sửa</button>
            <button @click="deleteMember(member.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :current-page="members?.pagination.page"
      :total-pages="members?.pagination.totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useQuery } from "@tanstack/vue-query";
import memberService from "@/api/memberService";
import SearchBar from "@/components/SearchBar.vue";
import MemberFilter from "@/components/MemberFilter.vue";
import Pagination from "@/components/Pagination.vue";

const page = ref(1);
const search = ref("");
const filters = reactive({
  branchId: "",
  cohortId: "",
  status: "",
});

const {
  data: members,
  isLoading,
  error,
} = useQuery({
  queryKey: ["members", page, search, filters],
  queryFn: () =>
    memberService.getList({
      page: page.value,
      limit: 10,
      search: search.value,
      ...filters,
    }),
  keepPreviousData: true,
});

const { data: branches } = useQuery({
  queryKey: ["branches"],
  queryFn: () => branchService.getAll(),
});

const handleSearch = (term) => {
  search.value = term;
  page.value = 1;
};

const handleFilterChange = (key, value) => {
  filters[key] = value;
  page.value = 1;
};

const handlePageChange = (newPage) => {
  page.value = newPage;
};

const viewMember = (id) => {
  // Navigate to member detail
};

const editMember = (id) => {
  // Navigate to edit form
};

const deleteMember = async (id) => {
  if (confirm("Bạn có chắc muốn xóa đoàn viên này?")) {
    await memberService.delete(id);
    // Refetch data
  }
};
</script>
```

---

## State Management

### Zustand (React)

```javascript
// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginApi, logout as logoutApi } from "../api/authService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const data = await loginApi(email, password);
        set({
          user: data.user,
          token: data.tokens.accessToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await logoutApi();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
```

### Pinia (Vue)

```javascript
// store/auth.js
import { defineStore } from "pinia";
import { login as loginApi, logout as logoutApi } from "@/api/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email, password) {
      const data = await loginApi(email, password);
      this.user = data.user;
      this.token = data.tokens.accessToken;
      this.isAuthenticated = true;
    },

    async logout() {
      await logoutApi();
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    updateUser(user) {
      this.user = user;
    },
  },

  persist: true,
});
```

---

## Error Handling

### Global Error Handler

```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return {
          message: data.message || "Dữ liệu không hợp lệ",
          type: "validation",
        };
      case 401:
        return {
          message: "Phiên đăng nhập hết hạn",
          type: "auth",
        };
      case 403:
        return {
          message: "Bạn không có quyền thực hiện thao tác này",
          type: "permission",
        };
      case 404:
        return {
          message: "Không tìm thấy dữ liệu",
          type: "notfound",
        };
      case 500:
        return {
          message: "Lỗi hệ thống, vui lòng thử lại sau",
          type: "server",
        };
      default:
        return {
          message: data.message || "Đã có lỗi xảy ra",
          type: "unknown",
        };
    }
  } else if (error.request) {
    // Request made but no response
    return {
      message: "Không thể kết nối đến server",
      type: "network",
    };
  } else {
    // Other errors
    return {
      message: error.message || "Đã có lỗi xảy ra",
      type: "unknown",
    };
  }
};
```

### Toast Notification

```javascript
// components/Toast.jsx
import { toast } from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (error) => {
  const errorInfo = handleApiError(error);
  toast.error(errorInfo.message);
};

export const showInfo = (message) => {
  toast(message);
};

// Usage
import { showSuccess, showError } from "./components/Toast";

try {
  await memberService.create(data);
  showSuccess("Tạo đoàn viên thành công");
} catch (error) {
  showError(error);
}
```

---

## File Upload

### Upload to CDN then Save URL

```javascript
// utils/uploadFile.js
import axios from "axios";
import fileUploadService from "../api/fileUploadService";

export const uploadFile = async (file, options = {}) => {
  try {
    // Step 1: Upload to CDN/Storage
    const formData = new FormData();
    formData.append("file", file);

    const cdnResponse = await axios.post(
      import.meta.env.VITE_CDN_UPLOAD_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress?.(percentCompleted);
        },
      }
    );

    const fileUrl = cdnResponse.data.url;

    // Step 2: Save file info to database
    const fileInfo = await fileUploadService.create({
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
      description: options.description || "",
      memberId: options.memberId,
      branchId: options.branchId,
      uploadedBy: options.uploadedBy,
    });

    return fileInfo;
  } catch (error) {
    throw error;
  }
};
```

### Upload Component

```javascript
// components/FileUpload.jsx
import React, { useState } from "react";
import { uploadFile } from "../utils/uploadFile";

const FileUpload = ({ memberId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFile(file, {
        memberId,
        onProgress: setProgress,
      });
      onUploadSuccess(result);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {uploading && (
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
```

---

## Best Practices

### 1. Request Cancellation

```javascript
// hooks/useCancellableQuery.js
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import axios from "axios";

export const useCancellableQuery = (queryKey, queryFn, options = {}) => {
  const cancelTokenSource = useRef(null);

  useEffect(() => {
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Query cancelled");
      }
    };
  }, []);

  return useQuery({
    ...options,
    queryKey,
    queryFn: async (...args) => {
      cancelTokenSource.current = axios.CancelToken.source();
      return queryFn(...args, cancelTokenSource.current.token);
    },
  });
};
```

### 2. Optimistic Updates

```javascript
// Example: Update member with optimistic update
const updateMemberMutation = useMutation({
  mutationFn: (data) => memberService.update(id, data),
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(["members", id]);

    // Snapshot previous value
    const previousMember = queryClient.getQueryData(["members", id]);

    // Optimistically update
    queryClient.setQueryData(["members", id], newData);

    // Return context with snapshot
    return { previousMember };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["members", id], context.previousMember);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries(["members", id]);
  },
});
```

### 3. Caching Strategy

```javascript
// Configure React Query client
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
```

### 4. Form Validation

```javascript
// utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone) => {
  const re = /^[0-9]{10,11}$/;
  return re.test(phone);
};

export const validateMemberForm = (data) => {
  const errors = {};

  if (!data.code) {
    errors.code = "Mã đoàn viên là bắt buộc";
  }

  if (!data.fullName) {
    errors.fullName = "Họ tên là bắt buộc";
  }

  if (!data.email) {
    errors.email = "Email là bắt buộc";
  } else if (!validateEmail(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  if (data.phoneNumber && !validatePhoneNumber(data.phoneNumber)) {
    errors.phoneNumber = "Số điện thoại không hợp lệ";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
```

---

## React Examples

### 1. Member List with React Query

```javascript
// pages/MemberList.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import memberService from "../api/memberService";
import SearchBar from "../components/SearchBar";
import MemberFilter from "../components/MemberFilter";
import Pagination from "../components/Pagination";

const MemberList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    branchId: "",
    cohortId: "",
    status: "",
  });

  // Fetch members
  const { data, isLoading, error } = useQuery({
    queryKey: ["members", page, search, filters],
    queryFn: () =>
      memberService.getList({
        page,
        limit: 10,
        search,
        ...filters,
      }),
    keepPreviousData: true,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="member-list">
      <h1>Danh sách đoàn viên</h1>

      <SearchBar onSearch={setSearch} />
      <MemberFilter filters={filters} onFilterChange={handleFilterChange} />

      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Chi đoàn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((member) => (
            <tr key={member.id}>
              <td>{member.code}</td>
              <td>{member.fullName}</td>
              <td>{member.email}</td>
              <td>{member.branch?.name}</td>
              <td>{member.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={data?.pagination.page}
        totalPages={data?.pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MemberList;
```

### 2. Create/Edit Member Form

```javascript
// pages/MemberForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import memberService from "../api/memberService";

const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      if (isEdit) {
        return await memberService.getById(id);
      }
      return {};
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return isEdit
        ? memberService.update(id, data)
        : memberService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      navigate("/members");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isEdit ? "Sửa đoàn viên" : "Thêm đoàn viên"}</h1>

      <div>
        <label>Mã đoàn viên *</label>
        <input
          {...register("code", { required: "Vui lòng nhập mã đoàn viên" })}
        />
        {errors.code && <span>{errors.code.message}</span>}
      </div>

      <div>
        <label>Họ và tên *</label>
        <input
          {...register("fullName", { required: "Vui lòng nhập họ tên" })}
        />
        {errors.fullName && <span>{errors.fullName.message}</span>}
      </div>

      <div>
        <label>Email *</label>
        <input
          type="email"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Đang lưu..." : "Lưu"}
        </button>
        <button type="button" onClick={() => navigate("/members")}>
          Hủy
        </button>
      </div>

      {mutation.isError && (
        <div className="error">{mutation.error.message}</div>
      )}
    </form>
  );
};

export default MemberForm;
```

### 3. Dashboard with Statistics

```javascript
// pages/Dashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import memberService from "../api/memberService";
import activityService from "../api/activityService";

const Dashboard = () => {
  const { data: memberStats } = useQuery({
    queryKey: ["member-statistics"],
    queryFn: () => memberService.getStatistics(),
  });

  const { data: activityStats } = useQuery({
    queryKey: ["activity-statistics"],
    queryFn: () => activityService.getStatistics(),
  });

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tổng đoàn viên</h3>
          <p className="stat-number">{memberStats?.totalMembers}</p>
          <div className="stat-details">
            <span>Đang hoạt động: {memberStats?.activeMembers}</span>
            <span>Không hoạt động: {memberStats?.inactiveMembers}</span>
          </div>
        </div>

        <div className="stat-card">
          <h3>Hoạt động</h3>
          <p className="stat-number">{activityStats?.totalActivities}</p>
          <div className="stat-details">
            <span>Đang diễn ra: {activityStats?.ongoingActivities}</span>
            <span>Đã hoàn thành: {activityStats?.completedActivities}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

### Vue.js Examples

#### Member List (Vue 3 Composition API)

```vue
<!-- pages/MemberList.vue -->
<template>
  <div class="member-list">
    <h1>Danh sách đoàn viên</h1>

    <SearchBar @search="handleSearch" />
    <MemberFilter :filters="filters" @filter-change="handleFilterChange" />

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>

    <table v-else>
      <thead>
        <tr>
          <th>Mã</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members?.data" :key="member.id">
          <td>{{ member.code }}</td>
          <td>{{ member.fullName }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.status }}</td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :current-page="members?.pagination.page"
      :total-pages="members?.pagination.totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useQuery } from "@tanstack/vue-query";
import memberService from "@/api/memberService";

const page = ref(1);
const search = ref("");
const filters = reactive({
  branchId: "",
  status: "",
});

const {
  data: members,
  isLoading,
  error,
} = useQuery({
  queryKey: ["members", page, search, filters],
  queryFn: () =>
    memberService.getList({
      page: page.value,
      limit: 10,
      search: search.value,
      ...filters,
    }),
});

const handleSearch = (term) => {
  search.value = term;
  page.value = 1;
};

const handleFilterChange = (key, value) => {
  filters[key] = value;
  page.value = 1;
};

const handlePageChange = (newPage) => {
  page.value = newPage;
};
</script>
```

### State Management

#### Zustand (React)

```javascript
// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginApi, logout as logoutApi } from "../api/authService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const data = await loginApi(email, password);
        set({
          user: data.user,
          token: data.tokens.accessToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await logoutApi();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
```

#### Pinia (Vue)

```javascript
// store/auth.js
import { defineStore } from "pinia";
import { login as loginApi, logout as logoutApi } from "@/api/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email, password) {
      const data = await loginApi(email, password);
      this.user = data.user;
      this.token = data.tokens.accessToken;
      this.isAuthenticated = true;
    },

    async logout() {
      await logoutApi();
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },

  persist: true,
});
```

### File Upload

#### Upload to CDN then Save URL

```javascript
// utils/uploadFile.js
import axios from "axios";
import fileUploadService from "../api/fileUploadService";

export const uploadFile = async (file, options = {}) => {
  try {
    // Step 1: Upload to CDN/Storage
    const formData = new FormData();
    formData.append("file", file);

    const cdnResponse = await axios.post(
      import.meta.env.VITE_CDN_UPLOAD_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          options.onProgress?.(percentCompleted);
        },
      }
    );

    const fileUrl = cdnResponse.data.url;

    // Step 2: Save file info to database
    const fileInfo = await fileUploadService.create({
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
      memberId: options.memberId,
    });

    return fileInfo;
  } catch (error) {
    throw error;
  }
};
```

#### Upload Component

```javascript
// components/FileUpload.jsx
import React, { useState } from "react";
import { uploadFile } from "../utils/uploadFile";

const FileUpload = ({ memberId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFile(file, {
        memberId,
        onProgress: setProgress,
      });
      onUploadSuccess(result);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {uploading && (
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
```

---

## 5. Configuration

### React Query Configuration

```javascript
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Vue Query Configuration

```javascript
// main.js
import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";

const app = createApp(App);

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  },
});

app.mount("#app");
```

### Axios Configuration Options

```javascript
// api/interceptors.js - Extended configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Set true if using cookies
});

// Add request ID for tracking
apiClient.interceptors.request.use((config) => {
  config.headers["X-Request-ID"] = Date.now().toString();
  return config;
});
```

---

## 6. Error & Troubleshooting

### Common Errors

#### 1. CORS Errors

**Error:**

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Giải pháp:**

- Đảm bảo backend đã cấu hình CORS cho frontend domain
- Kiểm tra `CORS_ORIGIN` trong backend .env
- Thêm credentials nếu cần: `withCredentials: true` trong axios config

#### 2. Token Expired

**Error:**

```
401 Unauthorized - Token expired
```

**Giải pháp:**

- Axios interceptor sẽ tự động refresh token
- Kiểm tra refresh token còn hợp lệ
- Nếu refresh token hết hạn, redirect về login page

```javascript
// Check interceptor logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
    }
    return Promise.reject(error);
  }
);
```

#### 3. Network Errors

**Error:**

```
Network Error - Unable to connect to server
```

**Giải pháp:**

- Kiểm tra backend server đang chạy
- Verify API_BASE_URL trong .env file
- Check network connectivity

```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  } else if (error.request) {
    // No response from server
    return {
      message: "Không thể kết nối đến server",
      status: 0,
    };
  } else {
    // Other errors
    return {
      message: error.message,
      status: -1,
    };
  }
};
```

#### 4. Validation Errors

**Error:**

```
400 Bad Request - Validation failed
```

**Giải pháp:**

- Check request payload format
- Ensure all required fields are provided
- Validate data types match API expectations

```javascript
// Example validation before API call
const validateMemberData = (data) => {
  if (!data.code) throw new Error("Mã đoàn viên là bắt buộc");
  if (!data.email) throw new Error("Email là bắt buộc");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("Email không hợp lệ");
  }
};
```

### Debugging Tips

**1. Enable Request Logging:**

```javascript
apiClient.interceptors.request.use((config) => {
  console.log("Request:", config.method.toUpperCase(), config.url, config.data);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);
```

**2. Use React Query Devtools:**

```javascript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// In your app component
<ReactQueryDevtools initialIsOpen={false} />;
```

**3. Check Browser Network Tab:**

- Inspect request headers
- Verify request payload
- Check response status and data

---

## 7. FAQ / Notes

### Frequently Asked Questions

**Q1: Làm sao để handle multiple file uploads?**

A: Sử dụng `Promise.all` để upload nhiều files song song:

```javascript
const uploadMultipleFiles = async (files, memberId) => {
  try {
    const uploadPromises = Array.from(files).map((file) =>
      uploadFile(file, { memberId })
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
```

**Q2: Caching strategy nào tốt nhất?**

A: Tùy thuộc vào loại data:

- Static data (branches, cohorts): `staleTime: 30 * 60 * 1000` (30 phút)
- Dynamic data (members list): `staleTime: 5 * 60 * 1000` (5 phút)
- Real-time data: `staleTime: 0` (always refetch)

**Q3: Làm sao để cancel requests khi component unmount?**

A: React Query tự động cancel requests. Hoặc sử dụng AbortController:

```javascript
useEffect(() => {
  const controller = new AbortController();

  fetchData(controller.signal);

  return () => controller.abort();
}, []);
```

**Q4: Optimistic updates hoạt động thế nào?**

A: Update UI ngay lập tức trước khi API response, rollback nếu có lỗi:

```javascript
const mutation = useMutation({
  mutationFn: updateMember,
  onMutate: async (newData) => {
    await queryClient.cancelQueries(["member", id]);
    const previous = queryClient.getQueryData(["member", id]);
    queryClient.setQueryData(["member", id], newData);
    return { previous };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(["member", id], context.previous);
  },
});
```

**Q5: Làm sao để implement infinite scroll/pagination?**

A: Sử dụng `useInfiniteQuery`:

```javascript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["members"],
  queryFn: ({ pageParam = 1 }) =>
    memberService.getList({ page: pageParam, limit: 20 }),
  getNextPageParam: (lastPage) => {
    const { page, totalPages } = lastPage.pagination;
    return page < totalPages ? page + 1 : undefined;
  },
});
```

### Important Notes

**Authentication:**

- Always store tokens in localStorage (or secure storage for mobile)
- Implement token refresh logic to avoid frequent re-login
- Clear all auth data on logout
- Handle 401 responses globally in axios interceptor

**Performance Optimization:**

- Use React.memo hoặc useMemo cho heavy computations
- Implement virtualization cho long lists (react-window, react-virtualized)
- Debounce search inputs (300-500ms)
- Use pagination thay vì load all data

**Security:**

- Never store sensitive data in localStorage without encryption
- Always validate user input before API calls
- Sanitize data trước khi render (XSS protection)
- Use HTTPS trong production

**Best Practices:**

1. **Consistent Error Handling:**

```javascript
try {
  const data = await memberService.create(formData);
  toast.success("Tạo thành công");
  return data;
} catch (error) {
  const errorInfo = handleApiError(error);
  toast.error(errorInfo.message);
  throw error;
}
```

2. **Loading States:**

```javascript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;
return <DataView data={data} />;
```

3. **Form Validation:**

```javascript
// Client-side validation
const {
  register,
  formState: { errors },
} = useForm({
  mode: "onBlur", // Validate on blur
  resolver: yupResolver(schema), // Or zod, joi
});
```

4. **Query Key Naming:**

```javascript
// Good
["members", { page: 1, status: "active" }][("member", id)]["member-statistics"][
  // Bad
  "data"
]["list"];
```

### Testing Recommendations

**Unit Testing API Services:**

```javascript
// __tests__/memberService.test.js
import { describe, it, expect, vi } from "vitest";
import memberService from "../api/memberService";

vi.mock("../api/interceptors");

describe("MemberService", () => {
  it("should fetch all members", async () => {
    const mockData = { metadata: [{ id: 1 }] };
    apiClient.get.mockResolvedValue({ data: mockData });

    const result = await memberService.getAll();
    expect(result).toEqual(mockData.metadata);
  });
});
```

**Integration Testing with React Testing Library:**

```javascript
// __tests__/MemberList.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MemberList from "../pages/MemberList";

test("renders member list", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemberList />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("Danh sách đoàn viên")).toBeInTheDocument();
  });
});
```

### Resources

- **React Query Docs:** https://tanstack.com/query/latest
- **Axios Docs:** https://axios-http.com/docs/intro
- **React Hook Form:** https://react-hook-form.com/
- **Zustand:** https://github.com/pmndrs/zustand
- **Pinia:** https://pinia.vuejs.org/

**Support:**

- Backend API Documentation: `/api-docs`
- Contact backend team for API issues
- Check server logs for debugging

---

**Last Updated:** December 15, 2025  
**Version:** 1.0.0
