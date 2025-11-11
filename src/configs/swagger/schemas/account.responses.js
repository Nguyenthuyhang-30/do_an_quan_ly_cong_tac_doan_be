/**
 * Account Management Response Schemas for Swagger Documentation
 */

const accountResponses = {
  // Success Responses
  GetProfileSuccess: {
    description: "Lấy thông tin profile thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get profile successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/ProfileResponse",
            },
          },
        },
      },
    },
  },

  UpdateProfileSuccess: {
    description: "Cập nhật profile thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UpdateProfileResponse",
        },
      },
    },
  },

  ChangePasswordSuccess: {
    description: "Đổi mật khẩu thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ChangePasswordResponse",
        },
      },
    },
  },

  ResetPasswordSuccess: {
    description: "Reset mật khẩu thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Reset password successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
          },
        },
      },
    },
  },

  UpdateAvatarSuccess: {
    description: "Cập nhật avatar thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Update avatar successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "object",
              properties: {
                avatarUrl: {
                  type: "string",
                  example: "https://cdn.example.com/avatar.jpg",
                },
              },
            },
          },
        },
      },
    },
  },

  UpdateEmailSuccess: {
    description: "Cập nhật email thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UpdateEmailResponse",
        },
      },
    },
  },

  ConfirmEmailSuccess: {
    description: "Xác nhận email thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Email confirmed successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
          },
        },
      },
    },
  },

  DeactivateAccountSuccess: {
    description: "Vô hiệu hóa tài khoản thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Account deactivated successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
          },
        },
      },
    },
  },

  ActivateAccountSuccess: {
    description: "Kích hoạt tài khoản thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Account activated successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
          },
        },
      },
    },
  },

  // Error Responses
  InvalidOldPassword: {
    description: "Mật khẩu cũ không đúng",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Old password is incorrect",
            },
            status: {
              type: "integer",
              example: 400,
            },
          },
        },
      },
    },
  },

  WeakPassword: {
    description: "Mật khẩu không đủ mạnh",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Password must be at least 6 characters",
            },
            status: {
              type: "integer",
              example: 400,
            },
          },
        },
      },
    },
  },

  EmailAlreadyExists: {
    description: "Email đã tồn tại",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Email already exists",
            },
            status: {
              type: "integer",
              example: 409,
            },
          },
        },
      },
    },
  },

  InvalidConfirmationToken: {
    description: "Mã xác nhận không hợp lệ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid confirmation token",
            },
            status: {
              type: "integer",
              example: 400,
            },
          },
        },
      },
    },
  },

  AccountNotFound: {
    description: "Không tìm thấy tài khoản",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Account not found",
            },
            status: {
              type: "integer",
              example: 404,
            },
          },
        },
      },
    },
  },

  AccountBadRequest: {
    description: "Dữ liệu không hợp lệ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid account data",
            },
            status: {
              type: "integer",
              example: 400,
            },
          },
        },
      },
    },
  },
};

module.exports = accountResponses;
