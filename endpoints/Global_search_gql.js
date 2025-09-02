const ENDPOINTS = [
  {
    name: "GLOBAL SEARCH",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query globalSearch($text: String!, $filter: SimilaritySearchFilter, $scope: SearchScope!, $applyGrouping: Boolean) {
        similaritySearch(
          text: $text
          filter: $filter
          scope: $scope
          applyGrouping: $applyGrouping
          mode: VECTOR
        ) {
          groups {
            values
            result {
              score
              document {
                objectId
                objectType
                relatedData
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      text: "icu",
      scope: "GLOBAL",
      applyGrouping: null,
      filter: {
        objectTypes: ["faqs", "videos", "documents", "measures", "fields", "files", "dashboards"]
      }
    }
  }
];

export default ENDPOINTS;