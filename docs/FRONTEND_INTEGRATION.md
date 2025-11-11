# Frontend Integration Guide

Hướng dẫn tích hợp API cho Frontend Developer

## 📋 Table of Contents

1. [Setup & Configuration](#setup--configuration)
2. [Authentication Flow](#authentication-flow)
3. [API Client Setup](#api-client-setup)
4. [Common Patterns](#common-patterns)
5. [React Examples](#react-examples)
6. [Vue.js Examples](#vuejs-examples)
7. [State Management](#state-management)
8. [Error Handling](#error-handling)
9. [File Upload](#file-upload)
10. [Best Practices](#best-practices)

---

## Setup & Configuration

### Environment Variables

```bash
# .env
VITE_API_BASE_URL=http://localhost:3055/v1/api
VITE_API_TIMEOUT=30000
VITE_CDN_URL=https://cdn.example.com
```

### Install Dependencies

```bash
# Using npm
npm install axios

# Or using yarn
yarn add axios

# For React Query (recommended)
npm install @tanstack/react-query

# For Vue
npm install @tanstack/vue-query
```

---

## Authentication Flow

### 1. Login Flow

```javascript
// authService.js
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

      // Save tokens
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

### 2. Token Refresh

```javascript
// api/interceptors.js
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
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired
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

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
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

## API Client Setup

### Base API Service

```javascript
// api/baseService.js
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

  async deleteMany(ids) {
    const response = await apiClient.delete(`/${this.resource}`, {
      data: { ids },
    });
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

### Specific Service Examples

```javascript
// api/memberService.js
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

```javascript
// api/activityService.js
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

  async updateAttendance(activityId, memberId, status) {
    const response = await apiClient.put(`/activity/${activityId}/attendance`, {
      memberId,
      status,
    });
    return response.data.metadata;
  }
}

export default new ActivityService();
```

```javascript
// api/reviewService.js
import BaseService from "./baseService";
import apiClient from "./interceptors";

class ReviewService extends BaseService {
  constructor() {
    super("member-review");
  }

  async getMemberTotalPoints(memberId) {
    const response = await apiClient.get(
      `/member-review/member/${memberId}/total-points`
    );
    return response.data.metadata;
  }

  async getMemberHistory(memberId, year, month) {
    const response = await apiClient.get(
      `/member-review/member/${memberId}/history`,
      { params: { year, month } }
    );
    return response.data.metadata;
  }

  async batchCreate(reviews) {
    const response = await apiClient.post("/member-review/batch", {
      reviews,
    });
    return response.data.metadata;
  }

  async updatePoint(id, point) {
    const response = await apiClient.put(`/member-review/${id}/point`, {
      point,
    });
    return response.data.metadata;
  }
}

export default new ReviewService();
```

---

## Common Patterns

### 1. Pagination Component

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

### 2. Search with Debounce

```javascript
// hooks/useDebounce.js
import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
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

### 3. Filter Component

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

## Testing

### API Service Testing

```javascript
// __tests__/memberService.test.js
import { describe, it, expect, vi } from "vitest";
import memberService from "../api/memberService";
import apiClient from "../api/interceptors";

vi.mock("../api/interceptors");

describe("MemberService", () => {
  it("should fetch all members", async () => {
    const mockData = { metadata: [{ id: 1, name: "Test" }] };
    apiClient.get.mockResolvedValue({ data: mockData });

    const result = await memberService.getAll();

    expect(apiClient.get).toHaveBeenCalledWith("/youth-union-member/get-all");
    expect(result).toEqual(mockData.metadata);
  });

  it("should create a member", async () => {
    const newMember = { fullName: "New Member", email: "test@example.com" };
    const mockResponse = { data: { metadata: { id: 1, ...newMember } } };

    apiClient.post.mockResolvedValue(mockResponse);

    const result = await memberService.create(newMember);

    expect(apiClient.post).toHaveBeenCalledWith(
      "/youth-union-member",
      newMember
    );
    expect(result).toEqual(mockResponse.data.metadata);
  });
});
```

---

**Last Updated:** November 11, 2025  
**Version:** 1.0.0
