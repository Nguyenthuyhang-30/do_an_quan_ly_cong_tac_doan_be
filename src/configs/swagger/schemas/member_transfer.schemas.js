/**
 * Member Transfer (Branch History) Schemas for Swagger Documentation
 */

const memberTransferSchemas = {
  // Request Schemas
  TransferMemberRequest: {
    type: "object",
    required: ["memberId", "branchId", "startDate"],
    properties: {
      memberId: {
        type: "integer",
        example: 1,
        description: "ID đoàn viên",
      },
      branchId: {
        type: "integer",
        example: 2,
        description: "ID chi đoàn mới",
      },
      position: {
        type: "string",
        example: "Bí thư chi đoàn",
        description: "Chức vụ",
      },
      startDate: {
        type: "string",
        format: "date",
        example: "2024-01-01",
        description: "Ngày bắt đầu",
      },
      note: {
        type: "string",
        example: "Điều chuyển công tác",
        description: "Ghi chú",
      },
    },
  },

  UpdateTransferRequest: {
    type: "object",
    properties: {
      position: {
        type: "string",
        example: "Phó bí thư chi đoàn",
        description: "Chức vụ",
      },
      startDate: {
        type: "string",
        format: "date",
        example: "2024-01-01",
        description: "Ngày bắt đầu",
      },
      endDate: {
        type: "string",
        format: "date",
        example: "2024-12-31",
        description: "Ngày kết thúc",
      },
      note: {
        type: "string",
        example: "Cập nhật thông tin",
        description: "Ghi chú",
      },
    },
  },

  EndTransferRequest: {
    type: "object",
    required: ["endDate"],
    properties: {
      endDate: {
        type: "string",
        format: "date",
        example: "2024-12-31",
        description: "Ngày kết thúc",
      },
    },
  },

  TransferSearchQuery: {
    type: "object",
    properties: {
      memberId: {
        type: "integer",
        example: 1,
        description: "ID đoàn viên",
      },
      branchId: {
        type: "integer",
        example: 2,
        description: "ID chi đoàn",
      },
      startDate: {
        type: "string",
        format: "date",
        example: "2024-01-01",
        description: "Từ ngày",
      },
      endDate: {
        type: "string",
        format: "date",
        example: "2024-12-31",
        description: "Đến ngày",
      },
      status: {
        type: "integer",
        enum: [0, 1],
        example: 1,
        description: "Trạng thái (0: Đã kết thúc, 1: Đang hoạt động)",
      },
    },
  },

  // Response Schemas
  TransferResponse: {
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
      branchId: {
        type: "integer",
        example: 2,
      },
      position: {
        type: "string",
        example: "Bí thư chi đoàn",
      },
      startDate: {
        type: "string",
        format: "date",
        example: "2024-01-01",
      },
      endDate: {
        type: "string",
        format: "date",
        example: "2024-12-31",
        nullable: true,
      },
      status: {
        type: "integer",
        example: 1,
        description: "0: Đã kết thúc, 1: Đang hoạt động",
      },
      note: {
        type: "string",
        example: "Điều chuyển công tác",
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

  TransferWithDetailsResponse: {
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
      branchId: {
        type: "integer",
        example: 2,
      },
      branchName: {
        type: "string",
        example: "Chi đoàn Khoa CNTT",
      },
      position: {
        type: "string",
        example: "Bí thư chi đoàn",
      },
      startDate: {
        type: "string",
        format: "date",
      },
      endDate: {
        type: "string",
        format: "date",
        nullable: true,
      },
      status: {
        type: "integer",
        example: 1,
      },
      note: {
        type: "string",
        example: "Điều chuyển công tác",
      },
    },
  },

  CurrentBranchResponse: {
    type: "object",
    properties: {
      branchId: {
        type: "integer",
        example: 2,
      },
      branchName: {
        type: "string",
        example: "Chi đoàn Khoa CNTT",
      },
      position: {
        type: "string",
        example: "Bí thư chi đoàn",
      },
      startDate: {
        type: "string",
        format: "date",
        example: "2024-01-01",
      },
    },
  },

  TransferStatisticsResponse: {
    type: "object",
    properties: {
      totalTransfers: {
        type: "integer",
        example: 150,
        description: "Tổng số lần điều chuyển",
      },
      activeTransfers: {
        type: "integer",
        example: 100,
        description: "Số điều chuyển đang hoạt động",
      },
      endedTransfers: {
        type: "integer",
        example: 50,
        description: "Số điều chuyển đã kết thúc",
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
      byMonth: {
        type: "array",
        items: {
          type: "object",
          properties: {
            month: { type: "string", example: "2024-01" },
            count: { type: "integer" },
          },
        },
      },
    },
  },
};

module.exports = memberTransferSchemas;
