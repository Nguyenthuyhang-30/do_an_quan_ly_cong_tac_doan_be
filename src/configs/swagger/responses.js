const commonResponses = {
  200: {
    description: "Success",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiResponse",
        },
      },
    },
  },
  201: {
    description: "Created",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiResponse",
        },
      },
    },
  },
  400: {
    description: "Bad Request",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },
  404: {
    description: "Not Found",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorResponse",
        },
      },
    },
  },
};

module.exports = commonResponses;
