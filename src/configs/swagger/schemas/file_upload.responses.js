/**
 * Swagger response schemas for File Upload API
 */

module.exports = {
  // Success responses
  FileUploadCreatedResponse: {
    description: "Upload file thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/FileUploadResponse",
        },
        example: {
          message: "Upload file thành công",
          status: 201,
          metadata: {
            id: 1,
            memberId: 1,
            branchId: 1,
            fileName: "bao-cao-hoat-dong.pdf",
            fileUrl: "https://cdn.example.com/files/bao-cao.pdf",
            fileSize: 1024000,
            mimeType: "application/pdf",
            description: "Báo cáo hoạt động tháng 1",
            uploadedBy: 1,
            createdAt: "2024-01-15T10:30:00Z",
            member: {
              id: 1,
              fullName: "Nguyễn Văn A",
              code: "DV001",
            },
            branch: {
              id: 1,
              name: "Chi đoàn CNTT",
              code: "CD001",
            },
          },
        },
      },
    },
  },

  FileUploadBatchCreatedResponse: {
    description: "Upload nhiều file thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/FileUploadBatchResponse",
        },
        example: {
          message: "Upload nhiều file thành công",
          status: 201,
          metadata: {
            uploadedCount: 3,
            files: [
              {
                id: 1,
                fileName: "cv.pdf",
                fileUrl: "https://cdn.example.com/cv.pdf",
                description: "Hồ sơ cá nhân",
              },
              {
                id: 2,
                fileName: "degree.pdf",
                fileUrl: "https://cdn.example.com/degree.pdf",
                description: "Bằng tốt nghiệp",
              },
              {
                id: 3,
                fileName: "cert.pdf",
                fileUrl: "https://cdn.example.com/cert.pdf",
                description: "Chứng chỉ",
              },
            ],
          },
        },
      },
    },
  },

  FileUploadUpdatedResponse: {
    description: "Cập nhật file thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/FileUploadResponse",
        },
        example: {
          message: "Cập nhật file thành công",
          status: 200,
          metadata: {
            id: 1,
            fileName: "bao-cao-hoat-dong-updated.pdf",
            description: "Báo cáo hoạt động tháng 1 (Đã chỉnh sửa)",
          },
        },
      },
    },
  },

  FileUploadDeletedResponse: {
    description: "Xóa file thành công",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Xóa file thành công",
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

  FileUploadListResponse: {
    description: "Lấy danh sách file thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/FileUploadListResponse",
        },
      },
    },
  },

  FileUploadNotFoundResponse: {
    description: "Không tìm thấy file",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Không tìm thấy file",
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

  FileUploadStatisticsResponse: {
    description: "Lấy thống kê file thành công",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/FileUploadStatistics",
        },
      },
    },
  },
};
