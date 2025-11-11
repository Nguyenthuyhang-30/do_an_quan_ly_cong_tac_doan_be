/**
 * Youth Union Member Schemas for Swagger Documentation
 */

const memberSchemas = {
  // Request Schemas
  CreateMemberRequest: {
    type: "object",
    required: ["code", "fullName", "email"],
    properties: {
      code: {
        type: "string",
        example: "DV001",
        description: "Mã đoàn viên (unique)",
      },
      userName: {
        type: "string",
        example: "nguyen_van_a",
        description: "Tên đăng nhập (unique)",
      },
      email: {
        type: "string",
        format: "email",
        example: "nva@example.com",
        description: "Email (unique)",
      },
      passwordHash: {
        type: "string",
        format: "password",
        example: "123456",
        description: "Mật khẩu",
      },
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
      studentCode: {
        type: "string",
        example: "2021001",
        description: "Mã sinh viên",
      },
      gender: {
        type: "boolean",
        example: true,
        description: "Giới tính (true: Nam, false: Nữ)",
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2003-01-15",
        description: "Ngày sinh",
      },
      joinDate: {
        type: "string",
        format: "date",
        example: "2021-09-01",
        description: "Ngày vào đoàn",
      },
      status: {
        type: "integer",
        enum: [0, 1],
        example: 1,
        description: "Trạng thái (0: Inactive, 1: Active)",
      },
      avatarUrl: {
        type: "string",
        example: "https://cdn.example.com/avatar.jpg",
        description: "URL avatar",
      },
      address: {
        type: "string",
        example: "Hà Nội",
        description: "Địa chỉ",
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

  UpdateMemberRequest: {
    type: "object",
    properties: {
      userName: {
        type: "string",
        example: "nguyen_van_a",
        description: "Tên đăng nhập",
      },
      email: {
        type: "string",
        format: "email",
        example: "nva@example.com",
        description: "Email",
      },
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
      studentCode: {
        type: "string",
        example: "2021001",
        description: "Mã sinh viên",
      },
      gender: {
        type: "boolean",
        example: true,
        description: "Giới tính",
      },
      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2003-01-15",
        description: "Ngày sinh",
      },
      address: {
        type: "string",
        example: "Hà Nội",
        description: "Địa chỉ",
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

  UpdateMemberStatusRequest: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "integer",
        enum: [0, 1],
        example: 1,
        description: "Trạng thái (0: Inactive, 1: Active)",
      },
    },
  },

  MemberSearchQuery: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        example: 1,
        description: "Số trang",
      },
      limit: {
        type: "integer",
        example: 10,
        description: "Số lượng mỗi trang",
      },
      search: {
        type: "string",
        example: "Nguyễn",
        description: "Từ khóa tìm kiếm (tên, email, mã)",
      },
      status: {
        type: "integer",
        enum: [0, 1],
        example: 1,
        description: "Lọc theo trạng thái",
      },
      branchId: {
        type: "integer",
        example: 1,
        description: "Lọc theo chi đoàn",
      },
      roleId: {
        type: "integer",
        example: 1,
        description: "Lọc theo vai trò",
      },
      gender: {
        type: "boolean",
        example: true,
        description: "Lọc theo giới tính",
      },
    },
  },

  // Response Schemas
  MemberResponse: {
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

  MemberProfileResponse: {
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
      fullName: {
        type: "string",
        example: "Nguyễn Văn A",
      },
      email: {
        type: "string",
        example: "nva@example.com",
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
      },
      joinDate: {
        type: "string",
        format: "date",
      },
      status: {
        type: "integer",
        example: 1,
      },
      avatarUrl: {
        type: "string",
        example: "https://cdn.example.com/avatar.jpg",
      },
      roles: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
      currentBranch: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          position: { type: "string" },
          startDate: { type: "string", format: "date" },
        },
      },
      branchHistory: {
        type: "array",
        items: {
          type: "object",
          properties: {
            branchName: { type: "string" },
            position: { type: "string" },
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
          },
        },
      },
    },
  },

  MemberListResponse: {
    type: "object",
    properties: {
      members: {
        type: "array",
        items: {
          $ref: "#/components/schemas/MemberResponse",
        },
      },
      pagination: {
        type: "object",
        properties: {
          total: { type: "integer", example: 100 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 10 },
          totalPages: { type: "integer", example: 10 },
        },
      },
    },
  },

  MemberStatisticsResponse: {
    type: "object",
    properties: {
      total: {
        type: "integer",
        example: 100,
        description: "Tổng số đoàn viên",
      },
      active: {
        type: "integer",
        example: 85,
        description: "Số đoàn viên hoạt động",
      },
      inactive: {
        type: "integer",
        example: 15,
        description: "Số đoàn viên không hoạt động",
      },
      male: {
        type: "integer",
        example: 60,
        description: "Số đoàn viên nam",
      },
      female: {
        type: "integer",
        example: 40,
        description: "Số đoàn viên nữ",
      },
      byBranch: {
        type: "array",
        items: {
          type: "object",
          properties: {
            branchId: { type: "integer" },
            branchName: { type: "string" },
            count: { type: "integer" },
          },
        },
      },
      byRole: {
        type: "array",
        items: {
          type: "object",
          properties: {
            roleId: { type: "integer" },
            roleName: { type: "string" },
            count: { type: "integer" },
          },
        },
      },
    },
  },
};

module.exports = memberSchemas;
