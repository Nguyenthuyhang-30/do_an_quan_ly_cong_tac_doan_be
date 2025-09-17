const swaggerJsdoc = require("swagger-jsdoc");

// Import schemas and components
const commonSchemas = require("./swagger/schemas/common.schemas");
const cohortSchemas = require("./swagger/schemas/cohort.schemas");
const cohortResponses = require("./swagger/schemas/cohort.responses");
const commonParameters = require("./swagger/parameters");
const commonResponses = require("./swagger/responses");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Base NodeJS API",
      version: "1.0.0",
      description: "API documentation for Base NodeJS project",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.DEV_APP_PORT || 3055}/v1/api`,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        // Common schemas
        ...commonSchemas,
        // Cohort schemas
        ...cohortSchemas,
        // Cohort response schemas
        ...cohortResponses,
      },
      parameters: {
        ...commonParameters,
      },
      responses: {
        ...commonResponses,
      },
    },
  },
  apis: ["./src/routes/**/*.js"], // Đường dẫn tới các file định nghĩa API
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerOptions };