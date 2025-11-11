/**
 * Swagger schemas for Slider Banner API
 */

module.exports = {
  // Request body schema for creating/updating slider banner
  SliderBannerInput: {
    type: "object",
    required: ["code", "name"],
    properties: {
      code: {
        type: "string",
        description: "Mã định danh slider (unique)",
        example: "SLIDER_WELCOME",
      },
      name: {
        type: "string",
        description: "Tên slider/banner",
        example: "Banner chào mừng",
      },
      image: {
        type: "string",
        format: "uri",
        description: "URL hình ảnh slider",
        example: "https://cdn.example.com/banner-welcome.jpg",
      },
      link: {
        type: "string",
        format: "uri",
        description: "Link đích khi click vào slider",
        example: "https://example.com/welcome",
      },
      order: {
        type: "integer",
        description: "Thứ tự hiển thị",
        example: 1,
      },
      isActive: {
        type: "boolean",
        description: "Trạng thái hoạt động",
        example: true,
      },
    },
  },

  // Update slider image only
  SliderBannerImageUpdate: {
    type: "object",
    required: ["imageUrl"],
    properties: {
      imageUrl: {
        type: "string",
        format: "uri",
        description: "URL hình ảnh mới",
        example: "https://cdn.example.com/new-banner.jpg",
      },
    },
  },

  // Update slider order
  SliderBannerOrderUpdate: {
    type: "object",
    required: ["orderData"],
    properties: {
      orderData: {
        type: "array",
        description: "Danh sách thứ tự slider",
        items: {
          type: "object",
          required: ["id", "order"],
          properties: {
            id: {
              type: "integer",
              description: "ID của slider",
              example: 1,
            },
            order: {
              type: "integer",
              description: "Thứ tự mới",
              example: 1,
            },
          },
        },
        example: [
          { id: 1, order: 1 },
          { id: 2, order: 2 },
          { id: 3, order: 3 },
        ],
      },
    },
  },

  // Slider banner object
  SliderBanner: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID slider",
        example: 1,
      },
      code: {
        type: "string",
        description: "Mã định danh",
        example: "SLIDER_WELCOME",
      },
      name: {
        type: "string",
        description: "Tên slider",
        example: "Banner chào mừng",
      },
      image: {
        type: "string",
        format: "uri",
        description: "URL hình ảnh",
        example: "https://cdn.example.com/banner.jpg",
      },
      link: {
        type: "string",
        format: "uri",
        description: "Link đích",
        example: "https://example.com/welcome",
      },
      order: {
        type: "integer",
        description: "Thứ tự hiển thị",
        example: 1,
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

  // Slider banner list response
  SliderBannerListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách slider thành công",
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
              $ref: "#/components/schemas/SliderBanner",
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

  // Slider banner single response
  SliderBannerResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thông tin slider thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        $ref: "#/components/schemas/SliderBanner",
      },
    },
  },

  // Statistics response
  SliderBannerStatistics: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thống kê slider thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          totalSliders: {
            type: "integer",
            description: "Tổng số slider",
            example: 10,
          },
          activeSliders: {
            type: "integer",
            description: "Số slider đang hoạt động",
            example: 7,
          },
          inactiveSliders: {
            type: "integer",
            description: "Số slider không hoạt động",
            example: 3,
          },
          slidersWithImage: {
            type: "integer",
            description: "Số slider có hình ảnh",
            example: 8,
          },
          slidersWithoutImage: {
            type: "integer",
            description: "Số slider không có hình ảnh",
            example: 2,
          },
        },
      },
    },
  },

  // Select options response
  SliderBannerSelectResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách chọn slider thành công",
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
              description: "ID slider",
              example: 1,
            },
            label: {
              type: "string",
              description: "Tên slider",
              example: "Banner chào mừng",
            },
          },
        },
      },
    },
  },
};
