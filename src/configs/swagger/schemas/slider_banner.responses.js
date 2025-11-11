/**
 * Swagger response schemas for Slider Banner API
 */

module.exports = {
  // Success responses
  SliderBannerCreatedResponse: {
    description: "Tạo slider thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SliderBannerResponse",
        },
        example: {
          message: "Tạo slider thành công",
          status: 201,
          metadata: {
            id: 1,
            code: "SLIDER_WELCOME",
            name: "Banner chào mừng",
            image: "https://cdn.example.com/banner.jpg",
            link: "https://example.com/welcome",
            order: 1,
            isActive: true,
            createdAt: "2024-01-15T10:30:00Z",
            updatedAt: "2024-01-15T10:30:00Z",
          },
        },
      },
    },
  },

  SliderBannerUpdatedResponse: {
    description: "Cập nhật slider thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SliderBannerResponse",
        },
        example: {
          message: "Cập nhật slider thành công",
          status: 200,
          metadata: {
            id: 1,
            code: "SLIDER_WELCOME",
            name: "Banner chào mừng (Updated)",
            image: "https://cdn.example.com/banner-new.jpg",
            order: 1,
            isActive: true,
          },
        },
      },
    },
  },

  SliderBannerDeletedResponse: {
    description: "Xóa slider thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Xóa slider thành công",
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

  SliderBannerListResponse: {
    description: "Lấy danh sách slider thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/SliderBannerListResponse",
        },
      },
    },
  },

  SliderBannerNotFoundResponse: {
    description: "Không tìm thấy slider",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Không tìm thấy slider",
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

  SliderBannerOrderUpdatedResponse: {
    description: "Cập nhật thứ tự slider thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Cập nhật thứ tự slider thành công",
            },
            status: {
              type: "integer",
              example: 200,
            },
            metadata: {
              type: "object",
              properties: {
                updatedCount: {
                  type: "integer",
                  example: 3,
                },
              },
            },
          },
        },
      },
    },
  },
};
