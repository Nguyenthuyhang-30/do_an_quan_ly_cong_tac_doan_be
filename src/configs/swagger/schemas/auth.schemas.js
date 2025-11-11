/**
 * Authentication Schemas for Swagger Documentation
 */

const authSchemas = {
  // Request Schemas
  SignUpRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "member@example.com",
        description: "Email của thành viên",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 6,
        example: "Password123!",
        description: "Mật khẩu (tối thiểu 6 ký tự)",
      },
      userName: {
        type: "string",
        example: "member001",
        description: "Tên đăng nhập (username)",
      },
      fullName: {
        type: "string",
        example: "Nguyễn Văn A",
        description: "Họ và tên đầy đủ",
      },
      phoneNumber: {
        type: "string",
        example: "0123456789",
        description: "Số điện thoại",
      },
    },
  },

  SignInRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "member@example.com",
        description: "Email đăng nhập",
      },
      password: {
        type: "string",
        format: "password",
        example: "Password123!",
        description: "Mật khẩu",
      },
    },
  },

  RefreshTokenRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDA2MDQ3OTl9.signature",
        description: "Refresh token để lấy access token mới",
      },
    },
  },

  // Response Data Schemas
  RoleInfo: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
        description: "ID vai trò",
      },
      roleName: {
        type: "string",
        example: "Member",
        description: "Tên vai trò",
      },
      roleDescription: {
        type: "string",
        example: "Đoàn viên thông thường",
        description: "Mô tả vai trò",
      },
      assignedAt: {
        type: "string",
        format: "date-time",
        example: "2024-01-15T10:30:00Z",
        description: "Ngày được gán vai trò",
      },
    },
  },

  MemberInfo: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
        description: "ID thành viên",
      },
      email: {
        type: "string",
        example: "member@example.com",
        description: "Email thành viên",
      },
      userName: {
        type: "string",
        example: "member001",
        description: "Username",
      },
      fullName: {
        type: "string",
        example: "Nguyễn Văn A",
        description: "Họ và tên",
      },
      status: {
        type: "string",
        enum: ["active", "inactive", "suspended", "pending"],
        example: "pending",
        description: "Trạng thái tài khoản",
      },
      roles: {
        type: "array",
        items: {
          $ref: "#/components/schemas/RoleInfo",
        },
        description: "Danh sách vai trò của thành viên",
      },
    },
  },

  TokenPair: {
    type: "object",
    properties: {
      accessToken: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDAwMDA4OTl9.signature",
        description: "Access token (hết hạn sau 15 phút)",
      },
      refreshToken: {
        type: "string",
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDA2MDQ3OTl9.signature",
        description: "Refresh token (hết hạn sau 7 ngày)",
      },
    },
  },

  AuthSuccessData: {
    type: "object",
    properties: {
      member: {
        $ref: "#/components/schemas/MemberInfo",
      },
      tokens: {
        $ref: "#/components/schemas/TokenPair",
      },
    },
  },

  AuthSuccessResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        example: "0000",
        description: "Mã phản hồi",
      },
      message: {
        type: "string",
        example: "Đăng ký thành công",
        description: "Thông báo",
      },
      status: {
        type: "string",
        example: "success",
        description: "Trạng thái",
      },
      data: {
        $ref: "#/components/schemas/AuthSuccessData",
      },
    },
  },

  SignOutSuccessResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        example: "0000",
        description: "Mã phản hồi",
      },
      message: {
        type: "string",
        example: "Đăng xuất thành công",
        description: "Thông báo",
      },
      status: {
        type: "string",
        example: "success",
        description: "Trạng thái",
      },
    },
  },

  RefreshTokenSuccessData: {
    type: "object",
    properties: {
      tokens: {
        $ref: "#/components/schemas/TokenPair",
      },
    },
  },

  RefreshTokenSuccessResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        example: "0000",
        description: "Mã phản hồi",
      },
      message: {
        type: "string",
        example: "Refresh token thành công",
        description: "Thông báo",
      },
      status: {
        type: "string",
        example: "success",
        description: "Trạng thái",
      },
      data: {
        $ref: "#/components/schemas/RefreshTokenSuccessData",
      },
    },
  },

  AuthErrorResponse: {
    type: "object",
    properties: {
      code: {
        type: "string",
        example: "4001",
        description: "Mã lỗi",
      },
      message: {
        type: "string",
        example: "Email đã được sử dụng",
        description: "Thông báo lỗi",
      },
      status: {
        type: "string",
        example: "error",
        description: "Trạng thái",
      },
    },
  },
};

module.exports = authSchemas;
