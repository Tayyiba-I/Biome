
const ENDPOINTS = [
  {
    name: "getSrog (HOMEPAGE)",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getSrog($careEntityCode: String!, $dsmCode: String) {
        srog(
          careEntityCode: $careEntityCode
          dsmCode: $dsmCode
        ) {
          Strength {
            measureId
            name
            hospital
            registry
            cohortId
            srogStrength
            trendToUse
            atBestPerformance
            numerator
            numeratorIfBest
            averageROI
            bestROI
            srogBucket
            systemSortOrder
            childEntitiesCount
            dimType
            __typename
          }
          Regression {
            measureId
            name
            hospital
            registry
            cohortId
            srogStrength
            trendToUse
            atBestPerformance
            numerator
            numeratorIfBest
            averageROI
            bestROI
            srogBucket
            rareEvent
            systemSortOrder
            childEntitiesCount
            dimType
            __typename
          }
          Opportunity {
            measureId
            name
            hospital
            registry
            cohortId
            srogStrength
            trendToUse
            atBestPerformance
            numerator
            numeratorIfBest
            averageROI
            bestROI
            srogBucket
            rareEvent
            systemSortOrder
            childEntitiesCount
            dimType
            __typename
          }
          Gain {
            measureId
            name
            hospital
            registry
            cohortId
            srogStrength
            trendToUse
            atBestPerformance
            numerator
            numeratorIfBest
            averageROI
            bestROI
            srogBucket
            rareEvent
            systemSortOrder
            childEntitiesCount
            dimType
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      careEntityCode: "Sutter",
      dsmCode: "STS"
    }
  }
];

export default ENDPOINTS;