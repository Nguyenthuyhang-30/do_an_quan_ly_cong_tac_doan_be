const commonSchemas = {
  // Common Request/Response Schemas
  DeleteManyRequest: {
    type: "object",
    required: ["ids"],
    properties: {
      ids: {
        type: "array",
        items: {
          type: "integer",
        },
        description: "Array of IDs to delete",
        example: [1, 2, 3],
        minItems: 1,
      },
    },
  },
  // Response Schemas
  ApiResponse: {
    type: "object",
    properties: {
      code: {
        type: "integer",
        description: "HTTP status code",
        example: 200,
      },
      message: {
        type: "string",
        description: "Response message",
        example: "Success",
      },
      data: {
        description: "Response data",
      },
    },
  },
  ErrorResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          code: {
            type: "integer",
            example: 400,
          },
          message: {
            type: "string",
            example: "Bad Request",
          },
          data: {
            type: "null",
            example: null,
          },
        },
      },
    ],
  },
  PaginationInfo: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        description: "Current page number",
        example: 1,
        minimum: 1,
      },
      limit: {
        type: "integer",
        description: "Number of items per page",
        example: 10,
        minimum: 1,
      },
      total: {
        type: "integer",
        description: "Total number of items",
        example: 100,
        minimum: 0,
      },
      totalPages: {
        type: "integer",
        description: "Total number of pages",
        example: 10,
        minimum: 0,
      },
    },
  },
};

module.exports = commonSchemas;
