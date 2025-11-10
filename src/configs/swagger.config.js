const swaggerJsdoc = require("swagger-jsdoc");

// Import schemas and components
const commonSchemas = require("./swagger/schemas/common.schemas");
const cohortSchemas = require("./swagger/schemas/cohort.schemas");
const cohortResponses = require("./swagger/schemas/cohort.responses");
const youthUnionBranchSchemas = require("./swagger/schemas/youth_union_branch.schemas");
const youthUnionBranchResponses = require("./swagger/schemas/youth_union_branch.responses");
const commonParameters = require("./swagger/parameters");
const commonResponses = require("./swagger/responses");

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
        url: `https://dtn-api.aiotlab.edu.vn/v1/api`,
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
      },
    },
  },
  apis: ["./src/routes/**/*.js"], // Đường dẫn tới các file định nghĩa API
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerOptions };
