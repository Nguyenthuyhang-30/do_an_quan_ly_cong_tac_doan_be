const youthUnionBranchSchemas = {
  YouthUnionBranch: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier for the youth union branch",
        example: 1,
        readOnly: true,
      },
      cohort_id: {
        type: "integer",
        description: "ID of the cohort the branch belongs to",
        example: 1,
        nullable: true,
      },
      code: {
        type: "string",
        description: "Branch code",
        example: "B001",
        minLength: 1,
        maxLength: 100,
        nullable: true,
      },
      name: {
        type: "string",
        description: "Name of the branch",
        example: "Chi đoàn 1",
        minLength: 1,
        maxLength: 100,
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
  YouthUnionBranchCreate: {
    type: "object",
    properties: {
      cohort_id: {
        type: "integer",
        description: "ID of the cohort the branch belongs to",
        example: 1,
      },
      code: {
        type: "string",
        description: "Branch code",
        example: "B001",
        minLength: 1,
        maxLength: 100,
      },
      name: {
        type: "string",
        description: "Name of the branch",
        example: "Chi đoàn 1",
        minLength: 1,
        maxLength: 100,
      },
      created_by: {
        type: "integer",
        description: "User ID who created the record",
        example: 1,
      },
    },
  },
  YouthUnionBranchUpdate: {
    type: "object",
    properties: {
      cohort_id: {
        type: "integer",
        description: "ID of the cohort the branch belongs to",
        example: 1,
        nullable: true,
      },
      code: {
        type: "string",
        description: "Branch code",
        example: "B001",
        minLength: 1,
        maxLength: 100,
        nullable: true,
      },
      name: {
        type: "string",
        description: "Name of the branch",
        example: "Chi đoàn 1",
        minLength: 1,
        maxLength: 100,
        nullable: true,
      },
      modified_by: {
        type: "integer",
        description: "User ID who modified the record",
        example: 1,
      },
    },
  },
  YouthUnionBranchSelect: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "Unique identifier for the branch",
        example: 1,
      },
      code: {
        type: "string",
        description: "Branch code",
        example: "B001",
      },
      name: {
        type: "string",
        description: "Name of the branch",
        example: "Chi đoàn 1",
      },
    },
  },
};

module.exports = youthUnionBranchSchemas;
