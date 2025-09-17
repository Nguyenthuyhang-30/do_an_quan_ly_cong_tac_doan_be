const commonParameters = {
  // ID Parameters
  CohortId: {
    name: "id",
    in: "path",
    required: true,
    description: "Cohort ID",
    schema: {
      type: "integer",
      example: 1,
      minimum: 1,
    },
  },

  // Pagination Parameters
  PageParam: {
    name: "page",
    in: "query",
    description: "Page number for pagination",
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
      example: 1,
    },
  },
  LimitParam: {
    name: "limit",
    in: "query",
    description: "Number of items per page",
    schema: {
      type: "integer",
      minimum: 1,
      maximum: 100,
      default: 10,
      example: 10,
    },
  },
  SearchParam: {
    name: "search",
    in: "query",
    description: "Search term for filtering records",
    schema: {
      type: "string",
      example: "web development",
    },
  },
};

module.exports = commonParameters;
