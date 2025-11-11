/**
 * Swagger response schemas for Content Introduct API
 */

module.exports = {
  // Success responses
  ContentIntroductCreatedResponse: {
    description: "Tạo nội dung thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ContentIntroductResponse",
        },
        example: {
          message: "Tạo nội dung thành công",
          status: 201,
          metadata: {
            id: 1,
            code: "about-us",
            title: "Giới thiệu về Đoàn Trường",
            content: "<h2>Về chúng tôi</h2><p>Đoàn trường là...</p>",
            metaTitle: "Giới thiệu | Đoàn Trường",
            metaDescription: "Tìm hiểu về Đoàn Thanh niên Trường",
            isActive: true,
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
          },
        },
      },
    },
  },

  ContentIntroductUpdatedResponse: {
    description: "Cập nhật nội dung thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ContentIntroductResponse",
        },
        example: {
          message: "Cập nhật nội dung thành công",
          status: 200,
          metadata: {
            id: 1,
            code: "about-us",
            title: "Giới thiệu về Đoàn Trường (Updated)",
            content: "<h2>Về chúng tôi</h2><p>Nội dung đã được cập nhật...</p>",
            isActive: true,
          },
        },
      },
    },
  },

  ContentIntroductDeletedResponse: {
    description: "Xóa nội dung thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Xóa nội dung thành công",
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

  ContentIntroductListResponse: {
    description: "Lấy danh sách nội dung thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ContentIntroductListResponse",
        },
      },
    },
  },

  ContentIntroductHomeResponse: {
    description: "Lấy nội dung trang chủ thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ContentIntroductHomeResponse",
        },
      },
    },
  },

  ContentIntroductNotFoundResponse: {
    description: "Không tìm thấy nội dung",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Không tìm thấy nội dung",
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

  ContentIntroductDuplicatedResponse: {
    description: "Nhân bản nội dung thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ContentIntroductResponse",
        },
        example: {
          message: "Nhân bản nội dung thành công",
          status: 201,
          metadata: {
            id: 2,
            code: "about-us-copy",
            title: "Giới thiệu về Đoàn Trường (Copy)",
            content: "<h2>Về chúng tôi</h2><p>Đoàn trường là...</p>",
            isActive: false,
          },
        },
      },
    },
  },
};
