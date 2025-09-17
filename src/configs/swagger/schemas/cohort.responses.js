const cohortResponses = {
  CohortResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            $ref: "#/components/schemas/Cohort",
          },
        },
      },
    ],
  },
  CohortListResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              cohorts: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Cohort",
                },
              },
              pagination: {
                $ref: "#/components/schemas/PaginationInfo",
              },
            },
          },
        },
      },
    ],
  },
  CohortArrayResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Cohort",
            },
          },
        },
      },
    ],
  },
  CohortSelectResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CohortSelect",
            },
          },
        },
      },
    ],
  },
};

module.exports = cohortResponses;
