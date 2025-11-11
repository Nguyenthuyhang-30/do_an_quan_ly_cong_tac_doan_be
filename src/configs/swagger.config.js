const swaggerJsdoc = require("swagger-jsdoc");

// Import schemas and components
const commonSchemas = require("./swagger/schemas/common.schemas");
const cohortSchemas = require("./swagger/schemas/cohort.schemas");
const cohortResponses = require("./swagger/schemas/cohort.responses");
const youthUnionBranchSchemas = require("./swagger/schemas/youth_union_branch.schemas");
const youthUnionBranchResponses = require("./swagger/schemas/youth_union_branch.responses");
const authSchemas = require("./swagger/schemas/auth.schemas");
const authResponses = require("./swagger/schemas/auth.responses");
const memberSchemas = require("./swagger/schemas/member.schemas");
const memberResponses = require("./swagger/schemas/member.responses");
const memberTransferSchemas = require("./swagger/schemas/member_transfer.schemas");
const memberTransferResponses = require("./swagger/schemas/member_transfer.responses");
const memberRoleSchemas = require("./swagger/schemas/member_role.schemas");
const memberRoleResponses = require("./swagger/schemas/member_role.responses");
const accountSchemas = require("./swagger/schemas/account.schemas");
const accountResponses = require("./swagger/schemas/account.responses");
const commonParameters = require("./swagger/parameters");
const commonResponses = require("./swagger/responses");

// Determine environment and base URLs
const isDev = process.env.NODE_ENV !== "production";
const DEV_PORT = process.env.DEV_APP_PORT || 3055;

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
      // Production server
      {
        url: "https://dtn-api.aiotlab.edu.vn/v1/api",
        description: "Production server",
      },
      // Development server
      {
        url: `http://localhost:${DEV_PORT}/v1/api`,
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
        // Member schemas
        ...memberSchemas,
        // Member Transfer schemas
        ...memberTransferSchemas,
        // Member Role schemas
        ...memberRoleSchemas,
        // Account schemas
        ...accountSchemas,
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
        // Member responses
        ...memberResponses,
        // Member Transfer responses
        ...memberTransferResponses,
        // Member Role responses
        ...memberRoleResponses,
        // Account responses
        ...accountResponses,
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
  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerOptions };
