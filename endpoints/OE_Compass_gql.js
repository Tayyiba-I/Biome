// const ENDPOINTS = [
//   {
//     name: "getSrog (OE)",
//     type: "graphql",
//     method: "POST",
//     url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
//     query: `
//       query getSrog($scope: SrogScope!, $careEntityCode: String!, $dsmCode: String, $cohortId: Float) {
//         srog(
//           scope: $scope
//           careEntityCode: $careEntityCode
//           dsmCode: $dsmCode
//           cohortId: $cohortId
//         ) {
//           Strength {
//             measureId
//             name
//             hospital
//             registry
//             cohortId
//             srogStrength
//             trendToUse
//             atBestPerformance
//             numerator
//             numeratorIfBest
//             averageROI
//             bestROI
//             srogBucket
//             systemSortOrder
//             childEntitiesCount
//             dimType
//             __typename
//           }
//           Regression {
//             measureId
//             name
//             hospital
//             registry
//             cohortId
//             srogStrength
//             trendToUse
//             atBestPerformance
//             numerator
//             numeratorIfBest
//             averageROI
//             bestROI
//             srogBucket
//             rareEvent
//             systemSortOrder
//             childEntitiesCount
//             dimType
//             __typename
//           }
//           Opportunity {
//             measureId
//             name
//             hospital
//             registry
//             cohortId
//             srogStrength
//             trendToUse
//             atBestPerformance
//             numerator
//             numeratorIfBest
//             averageROI
//             bestROI
//             srogBucket
//             rareEvent
//             systemSortOrder
//             childEntitiesCount
//             dimType
//             __typename
//           }
//           Gain {
//             measureId
//             name
//             hospital
//             registry
//             cohortId
//             srogStrength
//             trendToUse
//             atBestPerformance
//             numerator
//             numeratorIfBest
//             averageROI
//             bestROI
//             srogBucket
//             rareEvent
//             systemSortOrder
//             childEntitiesCount
//             dimType
//             __typename
//           }
//           __typename
//         }
//       }
//     `,
//     variables: {
//       scope: "OE",
//       careEntityCode: "Sutter"
//     }
//   }
// ];

// export default ENDPOINTS;

const ENDPOINTS = [
  {
    name: "getSrog (OE)",
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
      dsmCode: "OE",
      careEntityCode: "Sutter"
    }
  }
];

export default ENDPOINTS;