const youthUnionBranchResponses = {
  YouthUnionBranchResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            $ref: "#/components/schemas/YouthUnionBranch",
          },
        },
      },
    ],
  },
  YouthUnionBranchListResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              youthUnionBranches: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/YouthUnionBranch",
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
  YouthUnionBranchArrayResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/YouthUnionBranch",
            },
          },
        },
      },
    ],
  },
  YouthUnionBranchSelectResponse: {
    allOf: [
      { $ref: "#/components/schemas/ApiResponse" },
      {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/YouthUnionBranchSelect",
            },
          },
        },
      },
    ],
  },
};

module.exports = youthUnionBranchResponses;
