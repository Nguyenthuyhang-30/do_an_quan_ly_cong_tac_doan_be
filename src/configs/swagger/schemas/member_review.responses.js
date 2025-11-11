/**
 * Swagger response schemas for Member Review API
 */

module.exports = {
  // Success responses
  MemberReviewCreatedResponse: {
    description: "Tạo đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewResponse",
        },
        example: {
          message: "Tạo đánh giá thành công",
          status: 201,
          metadata: {
            id: 1,
            member_id: 1,
            review_type: "khen-thuong",
            title: "Đoàn viên xuất sắc tháng 1/2024",
            description: "Tích cực tham gia hoạt động, hoàn thành tốt nhiệm vụ",
            point: 10,
            created_at: "2024-01-15T10:30:00Z",
            created_by: 1,
            member: {
              id: 1,
              code: "DV001",
              fullName: "Nguyễn Văn A",
              email: "nguyenvana@example.com",
            },
          },
        },
      },
    },
  },

  MemberReviewBatchCreatedResponse: {
    description: "Tạo nhiều đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Tạo nhiều đánh giá thành công",
            },
            status: {
              type: "integer",
              example: 201,
            },
            metadata: {
              type: "object",
              properties: {
                createdCount: {
                  type: "integer",
                  example: 5,
                },
                reviews: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/MemberReview",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  MemberReviewUpdatedResponse: {
    description: "Cập nhật đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewResponse",
        },
        example: {
          message: "Cập nhật đánh giá thành công",
          status: 200,
          metadata: {
            id: 1,
            member_id: 1,
            review_type: "khen-thuong",
            title: "Đoàn viên xuất sắc tháng 1/2024 (Updated)",
            description: "Đã cập nhật mô tả",
            point: 15,
          },
        },
      },
    },
  },

  MemberReviewDeletedResponse: {
    description: "Xóa đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Xóa đánh giá thành công",
            },
            status: {
              type: "integer",
              example: 200,
            },
            metadata: {
              type: "object",
              properties: {
                deletedCount: {
                  type: "integer",
                  example: 1,
                },
              },
            },
          },
        },
      },
    },
  },

  MemberReviewListResponse: {
    description: "Lấy danh sách đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewListResponse",
        },
      },
    },
  },

  MemberReviewNotFoundResponse: {
    description: "Không tìm thấy đánh giá",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Không tìm thấy đánh giá",
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

  MemberReviewTotalPointsResponse: {
    description: "Lấy tổng điểm đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewTotalPointsResponse",
        },
      },
    },
  },

  MemberReviewStatisticsResponse: {
    description: "Lấy thống kê đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewStatisticsResponse",
        },
      },
    },
  },

  MemberReviewHistoryResponse: {
    description: "Lấy lịch sử đánh giá thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/MemberReviewHistoryResponse",
        },
      },
    },
  },
};
