/**
 * Youth Union Member Response Schemas for Swagger Documentation
 */

const memberResponses = {
  // Success Responses
  GetAllMembersSuccess: {
    description: "Lấy danh sách đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get all members successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/MemberResponse",
              },
            },
          },
        },
      },
    },
  },

  GetMemberListSuccess: {
    description: "Lấy danh sách đoàn viên có phân trang thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get member list successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberListResponse",
            },
          },
        },
      },
    },
  },

  GetMemberSuccess: {
    description: "Lấy thông tin đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get member successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberResponse",
            },
          },
        },
      },
    },
  },

  GetMemberProfileSuccess: {
    description: "Lấy profile đầy đủ của đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get member profile successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberProfileResponse",
            },
          },
        },
      },
    },
  },

  CreateMemberSuccess: {
    description: "Tạo đoàn viên mới thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Create member successfully",
            },
            status: {
              type: "integer",
              example: 201,
            },
            data: {
              $ref: "#/components/schemas/MemberResponse",
            },
          },
        },
      },
    },
  },

  UpdateMemberSuccess: {
    description: "Cập nhật thông tin đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Update member successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberResponse",
            },
          },
        },
      },
    },
  },

  DeleteMemberSuccess: {
    description: "Xóa đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Delete member successfully",
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

  GetMemberStatisticsSuccess: {
    description: "Lấy thống kê đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get member statistics successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberStatisticsResponse",
            },
          },
        },
      },
    },
  },

  SearchMembersSuccess: {
    description: "Tìm kiếm đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Search members successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberListResponse",
            },
          },
        },
      },
    },
  },

  // Error Responses
  MemberNotFound: {
    description: "Không tìm thấy đoàn viên",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Member not found",
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

  MemberBadRequest: {
    description: "Dữ liệu không hợp lệ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid member data",
            },
            status: {
              type: "integer",
              example: 400,
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },

  MemberConflict: {
    description: "Đoàn viên đã tồn tại (email hoặc code trùng)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Member already exists",
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
};

module.exports = memberResponses;
