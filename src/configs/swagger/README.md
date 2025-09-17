# Swagger Documentation Structure

## Cấu trúc thư mục

```
src/configs/swagger/
├── swagger.config.js          # File config chính
├── parameters.js              # Parameters chung (ID, pagination, search...)
├── responses.js               # Response templates chung
└── schemas/
    ├── common.schemas.js      # Schemas chung (ApiResponse, ErrorResponse, PaginationInfo...)
    ├── cohort.schemas.js      # Schemas cho Cohort entity
    └── cohort.responses.js    # Response schemas cho Cohort
```

## Cách thêm entity mới

### 1. Tạo schemas cho entity mới

Tạo file `src/configs/swagger/schemas/{entity}.schemas.js`:

```javascript
const userSchemas = {
  User: {
    type: "object",
    required: ["email", "name"],
    properties: {
      id: {
        type: "integer",
        description: "User ID",
        example: 1,
        readOnly: true,
      },
      email: {
        type: "string",
        format: "email",
        description: "User email",
        example: "user@example.com",
      },
      name: {
        type: "string",
        description: "User name",
        example: "John Doe",
      },
      // ... other fields
    },
  },
  UserCreate: {
    // Schema for creating user
  },
  UserUpdate: {
    // Schema for updating user
  },
};

module.exports = userSchemas;
```

### 2. Tạo response schemas

Tạo file `src/configs/swagger/schemas/{entity}.responses.js`:

```javascript
const userResponses = {
  UserResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    ],
  },
  // ... other responses
};

module.exports = userResponses;
```

### 3. Cập nhật swagger.config.js

```javascript
// Import new schemas
const userSchemas = require("./swagger/schemas/user.schemas");
const userResponses = require("./swagger/schemas/user.responses");

// Add to components
components: {
  schemas: {
    ...commonSchemas,
    ...cohortSchemas,
    ...userSchemas,     // Add here
    ...cohortResponses,
    ...userResponses,   // Add here
  },
  // ...
}
```

### 4. Thêm parameters mới (nếu cần)

Trong `src/configs/swagger/parameters.js`:

```javascript
const commonParameters = {
  // ... existing parameters
  UserId: {
    name: "id",
    in: "path",
    required: true,
    description: "User ID",
    schema: {
      type: "integer",
      example: 1,
    },
  },
};
```

## Ưu điểm của cấu trúc này

1. **Modular**: Mỗi entity có file riêng, dễ quản lý
2. **Reusable**: Components chung có thể tái sử dụng
3. **Maintainable**: Dễ dàng thêm/sửa/xóa entity
4. **Scalable**: Có thể mở rộng cho nhiều entity
5. **Clean**: File config chính ngắn gọn và rõ ràng

## Best Practices

1. **Naming Convention**:

   - Schemas: `{Entity}`, `{Entity}Create`, `{Entity}Update`
   - Responses: `{Entity}Response`, `{Entity}ListResponse`
   - Parameters: `{Entity}Id`, `{Field}Param`

2. **Required Fields**: Luôn định nghĩa `required` fields
3. **Examples**: Thêm examples cho tất cả fields
4. **Validation**: Thêm `minLength`, `maxLength`, `minimum`, `maximum`
5. **ReadOnly**: Đánh dấu fields như `id`, `created_at` là `readOnly: true`
