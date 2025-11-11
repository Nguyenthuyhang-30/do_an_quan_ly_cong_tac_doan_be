const swaggerJsdoc = require("swagger-jsdoc");

// Import schemas and components
const commonSchemas = require("./swagger/schemas/common.schemas");
const cohortSchemas = require("./swagger/schemas/cohort.schemas");
const cohortResponses = require("./swagger/schemas/cohort.responses");
const youthUnionBranchSchemas = require("./swagger/schemas/youth_union_branch.schemas");
const youthUnionBranchResponses = require("./swagger/schemas/youth_union_branch.responses");
const authSchemas = require("./swagger/schemas/auth.schemas");
const authResponses = require("./swagger/schemas/auth.responses");
const commonParameters = require("./swagger/parameters");
const commonResponses = require("./swagger/responses");
const BASE_URL =
  process.env.BASE_URL ||
  `http://localhost:${process.env.DEV_APP_PORT || 3055}`;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Youth Branches Management API",
      version: "1.0.0",
      description: "API documentation for Youth Branches Management project",
      contact: {
        name: "API Support",
        email: "",
      },
    },
    servers: [
      {
        url: `${BASE_URL}/v1/api`,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        // Common schemas
        ...commonSchemas,
        // Cohort schemas
        ...cohortSchemas,
        // Youth Union Branch schemas
        ...youthUnionBranchSchemas,
        // Auth schemas
        ...authSchemas,
        // Cohort response schemas
        ...cohortResponses,
        // Youth Union Branch response schemas
        ...youthUnionBranchResponses,
      },
      parameters: {
        ...commonParameters,
      },
      responses: {
        ...commonResponses,
        // Auth responses
        ...authResponses,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"], // Đường dẫn tới các file định nghĩa API
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerOptions };
