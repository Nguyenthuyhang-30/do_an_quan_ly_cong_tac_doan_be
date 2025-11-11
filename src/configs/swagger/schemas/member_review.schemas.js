/**
 * Swagger schemas for Member Review API
 */

module.exports = {
  // Request body schema for creating/updating member review
  MemberReviewInput: {
    type: "object",
    required: ["member_id", "review_type", "title"],
    properties: {
      member_id: {
        type: "integer",
        description: "ID đoàn viên được đánh giá",
        example: 1,
      },
      review_type: {
        type: "string",
        description:
          "Loại đánh giá: khen-thuong, ky-luat, thi-dua, danh-gia-dinh-ky, etc.",
        example: "khen-thuong",
        enum: [
          "khen-thuong",
          "ky-luat",
          "thi-dua",
          "danh-gia-dinh-ky",
          "xep-loai",
          "khac",
        ],
      },
      title: {
        type: "string",
        description: "Tiêu đề đánh giá",
        example: "Đoàn viên xuất sắc tháng 1/2024",
      },
      description: {
        type: "string",
        description: "Mô tả chi tiết đánh giá",
        example:
          "Tích cực tham gia hoạt động, hoàn thành tốt nhiệm vụ được giao",
      },
      point: {
        type: "integer",
        description: "Điểm đánh giá (có thể âm hoặc dương)",
        example: 10,
      },
      created_by: {
        type: "integer",
        description: "ID người tạo đánh giá",
        example: 1,
      },
    },
  },

  // Batch create reviews
  MemberReviewBatchInput: {
    type: "object",
    required: ["reviews"],
    properties: {
      reviews: {
        type: "array",
        description: "Danh sách đánh giá cần tạo",
        items: {
          $ref: "#/components/schemas/MemberReviewInput",
        },
        example: [
          {
            member_id: 1,
            review_type: "khen-thuong",
            title: "Đoàn viên xuất sắc",
            description: "Hoàn thành tốt nhiệm vụ",
            point: 10,
          },
          {
            member_id: 2,
            review_type: "thi-dua",
            title: "Chiến sĩ thi đua cơ sở",
            description: "Tích cực trong hoạt động",
            point: 15,
          },
        ],
      },
    },
  },

  // Member review object
  MemberReview: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID đánh giá",
        example: 1,
      },
      member_id: {
        type: "integer",
        description: "ID đoàn viên",
        example: 1,
      },
      review_type: {
        type: "string",
        description: "Loại đánh giá",
        example: "khen-thuong",
      },
      title: {
        type: "string",
        description: "Tiêu đề",
        example: "Đoàn viên xuất sắc tháng 1/2024",
      },
      description: {
        type: "string",
        description: "Mô tả",
        example: "Tích cực tham gia hoạt động",
      },
      point: {
        type: "integer",
        description: "Điểm đánh giá",
        example: 10,
      },
      created_at: {
        type: "string",
        format: "date-time",
        description: "Ngày tạo",
        example: "2024-01-15T10:30:00Z",
      },
      created_by: {
        type: "integer",
        description: "ID người tạo",
        example: 1,
      },
      member: {
        type: "object",
        description: "Thông tin đoàn viên",
        properties: {
          id: { type: "integer", example: 1 },
          code: { type: "string", example: "DV001" },
          fullName: { type: "string", example: "Nguyễn Văn A" },
          email: { type: "string", example: "nguyenvana@example.com" },
          phoneNumber: { type: "string", example: "0123456789" },
        },
      },
    },
  },

  // Member review list response
  MemberReviewListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MemberReview",
            },
          },
          pagination: {
            type: "object",
            properties: {
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              total: { type: "integer", example: 100 },
              totalPages: { type: "integer", example: 10 },
            },
          },
        },
      },
    },
  },

  // Member review single response
  MemberReviewResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thông tin đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        $ref: "#/components/schemas/MemberReview",
      },
    },
  },

  // Total points response
  MemberReviewTotalPointsResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Tính tổng điểm đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          memberId: {
            type: "integer",
            description: "ID đoàn viên",
            example: 1,
          },
          totalPoints: {
            type: "integer",
            description: "Tổng điểm",
            example: 150,
          },
          reviewCount: {
            type: "integer",
            description: "Số lượng đánh giá",
            example: 15,
          },
          averagePoint: {
            type: "string",
            description: "Điểm trung bình",
            example: "10.00",
          },
          pointsByType: {
            type: "object",
            description: "Điểm theo từng loại",
            example: {
              "khen-thuong": 80,
              "thi-dua": 50,
              "danh-gia-dinh-ky": 20,
            },
          },
        },
      },
    },
  },

  // Statistics response
  MemberReviewStatisticsResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thống kê đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          totalReviews: {
            type: "integer",
            description: "Tổng số đánh giá",
            example: 500,
          },
          reviewsByType: {
            type: "array",
            description: "Phân loại theo loại đánh giá",
            items: {
              type: "object",
              properties: {
                review_type: { type: "string", example: "khen-thuong" },
                count: { type: "integer", example: 200 },
                totalPoints: { type: "integer", example: 2000 },
                avgPoints: { type: "number", example: 10.5 },
              },
            },
          },
          topMembers: {
            type: "array",
            description: "Top 5 đoàn viên có nhiều đánh giá nhất",
            items: {
              type: "object",
              properties: {
                member_id: { type: "integer", example: 1 },
                reviewCount: { type: "integer", example: 25 },
                totalPoints: { type: "integer", example: 250 },
                member: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    code: { type: "string", example: "DV001" },
                    fullName: { type: "string", example: "Nguyễn Văn A" },
                  },
                },
              },
            },
          },
          recentReviews: {
            type: "array",
            description: "5 đánh giá gần đây",
            items: {
              $ref: "#/components/schemas/MemberReview",
            },
          },
          pointStats: {
            type: "object",
            description: "Thống kê điểm",
            properties: {
              maxPoint: { type: "number", example: 50 },
              minPoint: { type: "number", example: -10 },
              avgPoint: { type: "string", example: "12.50" },
              totalPoints: { type: "integer", example: 5000 },
            },
          },
        },
      },
    },
  },

  // Review history response
  MemberReviewHistoryResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy lịch sử đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          memberId: {
            type: "integer",
            example: 1,
          },
          period: {
            type: "object",
            properties: {
              year: { type: "integer", example: 2024 },
              month: { type: "integer", example: 1 },
            },
          },
          reviews: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MemberReview",
            },
          },
          summary: {
            type: "object",
            properties: {
              totalReviews: { type: "integer", example: 10 },
              totalPoints: { type: "integer", example: 100 },
              averagePoint: { type: "string", example: "10.00" },
            },
          },
        },
      },
    },
  },

  // Select options response
  MemberReviewSelectResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách chọn đánh giá thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "array",
        items: {
          type: "object",
          properties: {
            value: {
              type: "integer",
              description: "ID đánh giá",
              example: 1,
            },
            label: {
              type: "string",
              description: "Tiêu đề đánh giá",
              example: "Đoàn viên xuất sắc tháng 1/2024",
            },
          },
        },
      },
    },
  },
};
