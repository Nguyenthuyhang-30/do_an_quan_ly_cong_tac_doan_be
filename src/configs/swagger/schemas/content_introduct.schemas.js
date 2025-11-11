/**
 * Swagger schemas for Content Introduct API
 */

module.exports = {
  // Request body schema for creating/updating content
  ContentIntroductInput: {
    type: "object",
    required: ["code", "title", "content"],
    properties: {
      code: {
        type: "string",
        description:
          "Mã định danh nội dung (unique): about-us, mission, vision, values, etc.",
        example: "about-us",
      },
      title: {
        type: "string",
        description: "Tiêu đề nội dung",
        example: "Giới thiệu về Đoàn Trường",
      },
      content: {
        type: "string",
        description: "Nội dung HTML",
        example: "<h2>Về chúng tôi</h2><p>Đoàn trường là tổ chức...</p>",
      },
      metaTitle: {
        type: "string",
        description: "Meta title cho SEO",
        example: "Giới thiệu | Đoàn Trường",
      },
      metaDescription: {
        type: "string",
        description: "Meta description cho SEO",
        example: "Tìm hiểu về Đoàn Thanh niên Trường Đại học",
      },
      metaKeywords: {
        type: "string",
        description: "Meta keywords cho SEO",
        example: "đoàn trường, giới thiệu, thanh niên",
      },
      isActive: {
        type: "boolean",
        description: "Trạng thái hoạt động",
        example: true,
      },
    },
  },

  // Content object
  ContentIntroduct: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID nội dung",
        example: 1,
      },
      code: {
        type: "string",
        description: "Mã định danh",
        example: "about-us",
      },
      title: {
        type: "string",
        description: "Tiêu đề",
        example: "Giới thiệu về Đoàn Trường",
      },
      content: {
        type: "string",
        description: "Nội dung HTML",
        example: "<h2>Về chúng tôi</h2><p>Đoàn trường là...</p>",
      },
      metaTitle: {
        type: "string",
        description: "Meta title",
        example: "Giới thiệu | Đoàn Trường",
      },
      metaDescription: {
        type: "string",
        description: "Meta description",
        example: "Tìm hiểu về Đoàn Thanh niên Trường",
      },
      metaKeywords: {
        type: "string",
        description: "Meta keywords",
        example: "đoàn trường, giới thiệu",
      },
      isActive: {
        type: "boolean",
        description: "Trạng thái",
        example: true,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Ngày tạo",
        example: "2024-01-15T10:30:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Ngày cập nhật",
        example: "2024-01-20T15:45:00Z",
      },
    },
  },

  // Content list response
  ContentIntroductListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách nội dung thành công",
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
              $ref: "#/components/schemas/ContentIntroduct",
            },
          },
          pagination: {
            type: "object",
            properties: {
              page: { type: "integer", example: 1 },
              limit: { type: "integer", example: 10 },
              total: { type: "integer", example: 50 },
              totalPages: { type: "integer", example: 5 },
            },
          },
        },
      },
    },
  },

  // Content single response
  ContentIntroductResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thông tin nội dung thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        $ref: "#/components/schemas/ContentIntroduct",
      },
    },
  },

  // Home page contents response
  ContentIntroductHomeResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy nội dung trang chủ thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          "about-us": {
            $ref: "#/components/schemas/ContentIntroduct",
          },
          mission: {
            $ref: "#/components/schemas/ContentIntroduct",
          },
          vision: {
            $ref: "#/components/schemas/ContentIntroduct",
          },
        },
        example: {
          "about-us": {
            id: 1,
            code: "about-us",
            title: "Giới thiệu",
            content: "<h2>Về chúng tôi</h2>",
            isActive: true,
          },
          mission: {
            id: 2,
            code: "mission",
            title: "Sứ mệnh",
            content: "<p>Sứ mệnh của chúng tôi...</p>",
            isActive: true,
          },
          vision: {
            id: 3,
            code: "vision",
            title: "Tầm nhìn",
            content: "<p>Tầm nhìn của chúng tôi...</p>",
            isActive: true,
          },
        },
      },
    },
  },

  // Statistics response
  ContentIntroductStatistics: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thống kê nội dung thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          totalContents: {
            type: "integer",
            description: "Tổng số nội dung",
            example: 15,
          },
          activeContents: {
            type: "integer",
            description: "Số nội dung đang hoạt động",
            example: 12,
          },
          inactiveContents: {
            type: "integer",
            description: "Số nội dung không hoạt động",
            example: 3,
          },
          recentlyUpdated: {
            type: "array",
            description: "5 nội dung cập nhật gần đây",
            items: {
              $ref: "#/components/schemas/ContentIntroduct",
            },
          },
        },
      },
    },
  },

  // Select options response
  ContentIntroductSelectResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách chọn nội dung thành công",
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
              description: "ID nội dung",
              example: 1,
            },
            label: {
              type: "string",
              description: "Tiêu đề nội dung",
              example: "Giới thiệu về Đoàn Trường",
            },
          },
        },
      },
    },
  },
};
