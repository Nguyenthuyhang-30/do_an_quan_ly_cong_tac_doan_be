/**
 * Authentication Response Schemas for Swagger Documentation
 */

const authResponses = {
  SignUpSuccess: {
    description: "Đăng ký thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthSuccessResponse",
        },
      },
    },
  },

  SignInSuccess: {
    description: "Đăng nhập thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthSuccessResponse",
        },
      },
    },
  },

  SignOutSuccess: {
    description: "Đăng xuất thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SignOutSuccessResponse",
        },
      },
    },
  },

  RefreshTokenSuccess: {
    description: "Refresh token thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/RefreshTokenSuccessResponse",
        },
      },
    },
  },

  AuthBadRequest: {
    description: "Lỗi validation hoặc dữ liệu không hợp lệ",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthErrorResponse",
        },
        examples: {
          emailExists: {
            summary: "Email đã tồn tại",
            value: {
              code: "4001",
              message: "Email đã được sử dụng",
              status: "error",
            },
          },
          usernameTaken: {
            summary: "Username đã tồn tại",
            value: {
              code: "4002",
              message: "Username đã được sử dụng",
              status: "error",
            },
          },
          missingFields: {
            summary: "Thiếu thông tin bắt buộc",
            value: {
              code: "4000",
              message: "Email và password là bắt buộc",
              status: "error",
            },
          },
        },
      },
    },
  },

  AuthUnauthorized: {
    description: "Không có quyền truy cập hoặc thông tin xác thực không hợp lệ",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthErrorResponse",
        },
        examples: {
          invalidCredentials: {
            summary: "Thông tin đăng nhập không đúng",
            value: {
              code: "4003",
              message: "Email hoặc mật khẩu không đúng",
              status: "error",
            },
          },
          accountSuspended: {
            summary: "Tài khoản bị khóa",
            value: {
              code: "4004",
              message: "Tài khoản đã bị tạm khóa",
              status: "error",
            },
          },
          accountInactive: {
            summary: "Tài khoản chưa kích hoạt",
            value: {
              code: "4005",
              message: "Tài khoản chưa được kích hoạt",
              status: "error",
            },
          },
          invalidToken: {
            summary: "Token không hợp lệ",
            value: {
              code: "4006",
              message: "Refresh token không hợp lệ hoặc đã hết hạn",
              status: "error",
            },
          },
          tokenUsed: {
            summary: "Token đã được sử dụng",
            value: {
              code: "4007",
              message: "Refresh token đã được sử dụng",
              status: "error",
            },
          },
        },
      },
    },
  },

  AuthServerError: {
    description: "Lỗi server",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthErrorResponse",
        },
        example: {
          code: "5000",
          message: "Internal server error",
          status: "error",
        },
      },
    },
  },
};

module.exports = authResponses;
