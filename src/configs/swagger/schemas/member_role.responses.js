/**
 * Member Role Response Schemas for Swagger Documentation
 */

const memberRoleResponses = {
  // Success Responses
  AssignRoleSuccess: {
    description: "Gán vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Assign role successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberRoleResponse",
            },
          },
        },
      },
    },
  },

  AssignMultipleRolesSuccess: {
    description: "Gán nhiều vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Assign multiple roles successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/MemberRoleResponse",
              },
            },
          },
        },
      },
    },
  },

  ChangeRoleSuccess: {
    description: "Thay đổi vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Change role successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberRoleResponse",
            },
          },
        },
      },
    },
  },

  RemoveRoleSuccess: {
    description: "Gỡ vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Remove role successfully",
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

  GetMemberRolesSuccess: {
    description: "Lấy danh sách vai trò của đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get member roles successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MemberRolesListResponse",
            },
          },
        },
      },
    },
  },

  GetMembersByRoleSuccess: {
    description: "Lấy danh sách đoàn viên theo vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get members by role successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/MembersByRoleResponse",
            },
          },
        },
      },
    },
  },

  GetRoleStatisticsSuccess: {
    description: "Lấy thống kê vai trò thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get role statistics successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/RoleStatisticsResponse",
            },
          },
        },
      },
    },
  },

  // Error Responses
  RoleNotFound: {
    description: "Không tìm thấy vai trò",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Role not found",
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

  MemberRoleNotFound: {
    description: "Không tìm thấy vai trò của đoàn viên",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Member role not found",
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

  RoleAlreadyAssigned: {
    description: "Vai trò đã được gán cho đoàn viên",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Role already assigned to member",
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

  RoleBadRequest: {
    description: "Dữ liệu vai trò không hợp lệ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid role data",
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

module.exports = memberRoleResponses;
