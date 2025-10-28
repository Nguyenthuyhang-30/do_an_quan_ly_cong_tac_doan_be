const cohortSchemas = {
  // Cohort Schemas
  Cohort: {
    type: "object",
    required: ["code", "name", "start_year"],
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier for the cohort",
        example: 1,
        readOnly: true,
      },
      code: {
        type: "string",
        description: "Cohort code",
        example: "K20",
        minLength: 1,
        maxLength: 50,
      },
      name: {
        type: "string",
        description: "Name of the cohort",
        example: "Khóa 20",
        minLength: 1,
        maxLength: 255,
      },
      start_year: {
        type: "integer",
        description: "Start year of the cohort",
        example: 2026,
        minimum: 2020,
        maximum: 2050,
      },
      end_year: {
        type: "integer",
        description: "End year of the cohort",
        example: 2030,
        minimum: 2020,
        maximum: 2050,
        nullable: true,
      },
      created_at: {
        type: "string",
        format: "date-time",
        description: "Creation timestamp",
        example: "2024-01-01T00:00:00.000Z",
        readOnly: true,
      },
      created_by: {
        type: "integer",
        description: "User ID who created the record",
        example: 1,
        nullable: true,
      },
      modified_at: {
        type: "string",
        format: "date-time",
        description: "Last modification timestamp",
        example: "2024-01-01T00:00:00.000Z",
        readOnly: true,
      },
      modified_by: {
        type: "integer",
        description: "User ID who last modified the record",
        example: 1,
        nullable: true,
      },
    },
  },
  CohortCreate: {
    type: "object",
    required: ["code", "name", "start_year"],
    properties: {
      code: {
        type: "string",
        description: "Cohort code",
        example: "K20",
        minLength: 1,
        maxLength: 50,
      },
      name: {
        type: "string",
        description: "Name of the cohort",
        example: "Khóa 20",
        minLength: 1,
        maxLength: 255,
      },
      start_year: {
        type: "integer",
        description: "Start year of the cohort",
        example: 2026,
        minimum: 2020,
        maximum: 2050,
      },
      end_year: {
        type: "integer",
        description: "End year of the cohort",
        example: 2030,
        minimum: 2020,
        maximum: 2050,
        nullable: true,
      },
      created_by: {
        type: "integer",
        description: "User ID who created the record",
        example: 1,
      },
    },
  },
  CohortUpdate: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "Cohort code",
        example: "K20",
        minLength: 1,
        maxLength: 50,
      },
      name: {
        type: "string",
        description: "Name of the cohort",
        example: "Khóa 20",
        minLength: 1,
        maxLength: 255,
      },
      start_year: {
        type: "integer",
        description: "Start year of the cohort",
        example: 2024,
        minimum: 2020,
        maximum: 2050,
      },
      end_year: {
        type: "integer",
        description: "End year of the cohort",
        example: 2024,
        minimum: 2020,
        maximum: 2050,
        nullable: true,
      },
      modified_by: {
        type: "integer",
        description: "User ID who modified the record",
        example: 1,
      },
    },
  },
  CohortSelect: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier for the cohort",
        example: 1,
      },
      code: {
        type: "string",
        description: "Cohort code",
        example: "K20",
      },
      name: {
        type: "string",
        description: "Name of the cohort",
        example: "Khóa 20",
      },
    },
  },
};

module.exports = cohortSchemas;
