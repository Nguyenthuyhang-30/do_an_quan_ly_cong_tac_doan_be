/**
 * Swagger schemas for File Upload API
 */

module.exports = {
  // Request body schema for uploading file
  FileUploadInput: {
    type: "object",
    required: ["fileName", "fileUrl"],
    properties: {
      memberId: {
        type: "integer",
        description: "ID đoàn viên (tùy chọn, nếu file thuộc đoàn viên)",
        example: 1,
      },
      branchId: {
        type: "integer",
        description: "ID chi đoàn (tùy chọn, nếu file thuộc chi đoàn)",
        example: 1,
      },
      fileName: {
        type: "string",
        description: "Tên file",
        example: "bao-cao-hoat-dong.pdf",
      },
      fileUrl: {
        type: "string",
        format: "uri",
        description: "URL file đã upload lên CDN/Storage",
        example: "https://cdn.example.com/files/bao-cao.pdf",
      },
      fileSize: {
        type: "integer",
        description: "Kích thước file (bytes)",
        example: 1024000,
      },
      mimeType: {
        type: "string",
        description: "Loại MIME của file",
        example: "application/pdf",
      },
      description: {
        type: "string",
        description: "Mô tả file",
        example: "Báo cáo hoạt động tháng 1",
      },
      uploadedBy: {
        type: "integer",
        description: "ID người upload",
        example: 1,
      },
    },
  },

  // Batch upload request
  FileUploadBatchInput: {
    type: "object",
    required: ["files"],
    properties: {
      files: {
        type: "array",
        description: "Danh sách file cần upload",
        items: {
          $ref: "#/components/schemas/FileUploadInput",
        },
        example: [
          {
            memberId: 1,
            fileName: "cv.pdf",
            fileUrl: "https://cdn.example.com/cv.pdf",
            description: "Hồ sơ cá nhân",
          },
          {
            memberId: 1,
            fileName: "degree.pdf",
            fileUrl: "https://cdn.example.com/degree.pdf",
            description: "Bằng tốt nghiệp",
          },
        ],
      },
    },
  },

  // File upload object
  FileUpload: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID file",
        example: 1,
      },
      memberId: {
        type: "integer",
        description: "ID đoàn viên",
        example: 1,
      },
      branchId: {
        type: "integer",
        description: "ID chi đoàn",
        example: 1,
      },
      fileName: {
        type: "string",
        description: "Tên file",
        example: "bao-cao-hoat-dong.pdf",
      },
      fileUrl: {
        type: "string",
        format: "uri",
        description: "URL file",
        example: "https://cdn.example.com/files/bao-cao.pdf",
      },
      fileSize: {
        type: "integer",
        description: "Kích thước file (bytes)",
        example: 1024000,
      },
      mimeType: {
        type: "string",
        description: "Loại MIME",
        example: "application/pdf",
      },
      description: {
        type: "string",
        description: "Mô tả",
        example: "Báo cáo hoạt động tháng 1",
      },
      uploadedBy: {
        type: "integer",
        description: "ID người upload",
        example: 1,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Ngày upload",
        example: "2024-01-15T10:30:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Ngày cập nhật",
        example: "2024-01-20T15:45:00Z",
      },
      member: {
        type: "object",
        description: "Thông tin đoàn viên (nếu có)",
        properties: {
          id: { type: "integer", example: 1 },
          fullName: { type: "string", example: "Nguyễn Văn A" },
          code: { type: "string", example: "DV001" },
        },
      },
      branch: {
        type: "object",
        description: "Thông tin chi đoàn (nếu có)",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Chi đoàn CNTT" },
          code: { type: "string", example: "CD001" },
        },
      },
    },
  },

  // File upload list response
  FileUploadListResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy danh sách file thành công",
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
              $ref: "#/components/schemas/FileUpload",
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

  // File upload single response
  FileUploadResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Upload file thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        $ref: "#/components/schemas/FileUpload",
      },
    },
  },

  // Batch upload response
  FileUploadBatchResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Upload nhiều file thành công",
      },
      status: {
        type: "integer",
        example: 201,
      },
      metadata: {
        type: "object",
        properties: {
          uploadedCount: {
            type: "integer",
            description: "Số file đã upload",
            example: 3,
          },
          files: {
            type: "array",
            description: "Danh sách file đã upload",
            items: {
              $ref: "#/components/schemas/FileUpload",
            },
          },
        },
      },
    },
  },

  // Statistics response
  FileUploadStatistics: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Lấy thống kê file thành công",
      },
      status: {
        type: "integer",
        example: 200,
      },
      metadata: {
        type: "object",
        properties: {
          totalFiles: {
            type: "integer",
            description: "Tổng số file",
            example: 150,
          },
          totalSize: {
            type: "integer",
            description: "Tổng dung lượng (bytes)",
            example: 52428800,
          },
          totalSizeMB: {
            type: "number",
            format: "float",
            description: "Tổng dung lượng (MB)",
            example: 50.0,
          },
          filesByMember: {
            type: "integer",
            description: "Số file của đoàn viên",
            example: 100,
          },
          filesByBranch: {
            type: "integer",
            description: "Số file của chi đoàn",
            example: 50,
          },
          topUploaders: {
            type: "array",
            description: "Top 5 người upload nhiều nhất",
            items: {
              type: "object",
              properties: {
                uploadedBy: { type: "integer", example: 1 },
                fileCount: { type: "integer", example: 25 },
              },
            },
          },
        },
      },
    },
  },
};
