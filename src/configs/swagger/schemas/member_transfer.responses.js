/**
 * Member Transfer Response Schemas for Swagger Documentation
 */

const memberTransferResponses = {
  // Success Responses
  TransferMemberSuccess: {
    description: "Điều chuyển đoàn viên thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Transfer member successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/TransferResponse",
            },
          },
        },
      },
    },
  },

  GetTransferHistorySuccess: {
    description: "Lấy lịch sử điều chuyển thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get transfer history successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/TransferWithDetailsResponse",
              },
            },
          },
        },
      },
    },
  },

  GetCurrentBranchSuccess: {
    description: "Lấy chi đoàn hiện tại thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get current branch successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/CurrentBranchResponse",
            },
          },
        },
      },
    },
  },

  UpdateTransferSuccess: {
    description: "Cập nhật thông tin điều chuyển thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Update transfer successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/TransferResponse",
            },
          },
        },
      },
    },
  },

  EndTransferSuccess: {
    description: "Kết thúc điều chuyển thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "End transfer successfully",
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

  GetTransferStatisticsSuccess: {
    description: "Lấy thống kê điều chuyển thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Get transfer statistics successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              $ref: "#/components/schemas/TransferStatisticsResponse",
            },
          },
        },
      },
    },
  },

  SearchTransfersSuccess: {
    description: "Tìm kiếm điều chuyển thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Search transfers successfully",
            },
            status: {
              type: "integer",
              example: 200,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/TransferWithDetailsResponse",
              },
            },
          },
        },
      },
    },
  },

  // Error Responses
  TransferNotFound: {
    description: "Không tìm thấy thông tin điều chuyển",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Transfer not found",
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

  TransferBadRequest: {
    description: "Dữ liệu điều chuyển không hợp lệ",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Invalid transfer data",
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

  NoCurrentTransfer: {
    description: "Không có điều chuyển đang hoạt động",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "No active transfer found",
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
};

module.exports = memberTransferResponses;
