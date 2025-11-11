/**
 * Member Role Schemas for Swagger Documentation
 */

const memberRoleSchemas = {
  // Request Schemas
  AssignRoleRequest: {
    type: "object",
    required: ["memberId", "roleId"],
    properties: {
      memberId: {
        type: "integer",
        example: 1,
        description: "ID đoàn viên",
      },
      roleId: {
        type: "integer",
        example: 2,
        description: "ID vai trò",
      },
    },
  },

  AssignMultipleRolesRequest: {
    type: "object",
    required: ["memberId", "roleIds"],
    properties: {
      memberId: {
        type: "integer",
        example: 1,
        description: "ID đoàn viên",
      },
      roleIds: {
        type: "array",
        items: {
          type: "integer",
        },
        example: [1, 2, 3],
        description: "Danh sách ID vai trò",
      },
    },
  },

  ChangeRoleRequest: {
    type: "object",
    required: ["memberId", "oldRoleId", "newRoleId"],
    properties: {
      memberId: {
        type: "integer",
        example: 1,
        description: "ID đoàn viên",
      },
      oldRoleId: {
        type: "integer",
        example: 2,
        description: "ID vai trò cũ",
      },
      newRoleId: {
        type: "integer",
        example: 3,
        description: "ID vai trò mới",
      },
    },
  },

  // Response Schemas
  MemberRoleResponse: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      memberId: {
        type: "integer",
        example: 1,
      },
      roleId: {
        type: "integer",
        example: 2,
      },
      assignedAt: {
        type: "string",
        format: "date-time",
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

  MemberRoleWithDetailsResponse: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      memberId: {
        type: "integer",
        example: 1,
      },
      memberName: {
        type: "string",
        example: "Nguyễn Văn A",
      },
      roleId: {
        type: "integer",
        example: 2,
      },
      roleName: {
        type: "string",
        example: "Ban chấp hành",
      },
      roleDescription: {
        type: "string",
        example: "Thành viên ban chấp hành chi đoàn",
      },
      assignedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  MemberRolesListResponse: {
    type: "object",
    properties: {
      memberId: {
        type: "integer",
        example: 1,
      },
      memberName: {
        type: "string",
        example: "Nguyễn Văn A",
      },
      roles: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 2,
            },
            name: {
              type: "string",
              example: "Ban chấp hành",
            },
            description: {
              type: "string",
              example: "Thành viên ban chấp hành chi đoàn",
            },
            assignedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  MembersByRoleResponse: {
    type: "object",
    properties: {
      roleId: {
        type: "integer",
        example: 2,
      },
      roleName: {
        type: "string",
        example: "Ban chấp hành",
      },
      members: {
        type: "array",
        items: {
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
            assignedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },

  RoleStatisticsResponse: {
    type: "object",
    properties: {
      totalAssignments: {
        type: "integer",
        example: 150,
        description: "Tổng số lượt gán vai trò",
      },
      byRole: {
        type: "array",
        items: {
          type: "object",
          properties: {
            roleId: {
              type: "integer",
              example: 1,
            },
            roleName: {
              type: "string",
              example: "Admin",
            },
            count: {
              type: "integer",
              example: 5,
              description: "Số lượng đoàn viên có vai trò này",
            },
          },
        },
      },
      membersWithMultipleRoles: {
        type: "integer",
        example: 15,
        description: "Số đoàn viên có nhiều vai trò",
      },
      membersWithNoRole: {
        type: "integer",
        example: 10,
        description: "Số đoàn viên chưa có vai trò",
      },
    },
  },
};

module.exports = memberRoleSchemas;
