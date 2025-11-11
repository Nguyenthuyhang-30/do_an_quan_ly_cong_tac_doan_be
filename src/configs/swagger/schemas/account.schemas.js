/**
 * Account Management Schemas for Swagger Documentation
 */

const accountSchemas = {
  // Request Schemas
  ChangePasswordRequest: {
    type: "object",
    required: ["oldPassword", "newPassword"],
    properties: {
      oldPassword: {
        type: "string",
        format: "password",
        example: "OldPass123!",
        description: "Mật khẩu cũ",
      },
      newPassword: {
        type: "string",
        format: "password",
        minLength: 6,
        example: "NewPass123!",
        description: "Mật khẩu mới (tối thiểu 6 ký tự)",
      },
    },
  },

  ResetPasswordRequest: {
    type: "object",
    required: ["newPassword"],
    properties: {
      newPassword: {
        type: "string",
        format: "password",
        minLength: 6,
        example: "NewPass123!",
        description: "Mật khẩu mới",
      },
    },
  },

  UpdateProfileRequest: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
        example: "Nguyễn Văn A",
        description: "Họ và tên",
      },
      phoneNumber: {
        type: "string",
        example: "0123456789",
        description: "Số điện thoại",
      },
      address: {
        type: "string",
        example: "Hà Nội",
        description: "Địa chỉ",
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2003-01-15",
        description: "Ngày sinh",
      },
      gender: {
        type: "boolean",
        example: true,
        description: "Giới tính (true: Nam, false: Nữ)",
      },
      avatarUrl: {
        type: "string",
        example: "https://cdn.example.com/avatar.jpg",
        description: "URL avatar",
      },
      facebookUrl: {
        type: "string",
        example: "https://facebook.com/user",
        description: "Link Facebook",
      },
      zalo: {
        type: "string",
        example: "0123456789",
        description: "Zalo",
      },
    },
  },

  UpdateAvatarRequest: {
    type: "object",
    required: ["avatarUrl"],
    properties: {
      avatarUrl: {
        type: "string",
        example: "https://cdn.example.com/avatar.jpg",
        description: "URL avatar mới",
      },
    },
  },

  UpdateEmailRequest: {
    type: "object",
    required: ["newEmail"],
    properties: {
      newEmail: {
        type: "string",
        format: "email",
        example: "newemail@example.com",
        description: "Email mới",
      },
    },
  },

  ConfirmEmailRequest: {
    type: "object",
    required: ["confirmationToken"],
    properties: {
      confirmationToken: {
        type: "string",
        example: "abc123xyz456",
        description: "Mã xác nhận email",
      },
    },
  },

  // Response Schemas
  ProfileResponse: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      code: {
        type: "string",
        example: "DV001",
      },
      userName: {
        type: "string",
        example: "nguyen_van_a",
      },
      email: {
        type: "string",
        example: "nva@example.com",
      },
      fullName: {
        type: "string",
        example: "Nguyễn Văn A",
      },
      phoneNumber: {
        type: "string",
        example: "0123456789",
      },
      studentCode: {
        type: "string",
        example: "2021001",
      },
      gender: {
        type: "boolean",
        example: true,
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2003-01-15",
      },
      joinDate: {
        type: "string",
        format: "date",
        example: "2021-09-01",
      },
      status: {
        type: "integer",
        example: 1,
      },
      avatarUrl: {
        type: "string",
        example: "https://cdn.example.com/avatar.jpg",
      },
      address: {
        type: "string",
        example: "Hà Nội",
      },
      facebookUrl: {
        type: "string",
        example: "https://facebook.com/user",
      },
      zalo: {
        type: "string",
        example: "0123456789",
      },
      emailConfirmed: {
        type: "boolean",
        example: true,
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  ChangePasswordResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Password changed successfully",
      },
      status: {
        type: "integer",
        example: 200,
      },
    },
  },

  UpdateProfileResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Profile updated successfully",
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

  UpdateEmailResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example:
          "Email updated successfully. Please check your email to confirm.",
      },
      status: {
        type: "integer",
        example: 200,
      },
    },
  },
};

module.exports = accountSchemas;
