const ENDPOINTS = [
  {
    name: "SUBMISSIONS",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getSubmissions {
        submissions {
          id
          cadence
          submitNationalReport
          mrnCrosswalkRequired
          mrnHarvestRequired
          enabled
          aggregate
          parentId
          dataset {
            id
            name
            __typename
          }
          careEntity {
            id
            code
            aggregated
            __typename
          }
          __typename
        }
      }
    `,
    variables: {}
  },
  {
    name: "SUBMISSIONS DEADLINE",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getDeadlines {
        deadlines {
          id
          monthIncluded
          monthSubmissionDeadline
          quarterIncluded
          quarterSubmissionDeadline
          dataset {
            id
            name
            code
            __typename
          }
          __typename
        }
      }
    `,
    variables: {}
  },
  {
    name: "FILE TRACKER - Get Subsets",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getSubsets {
        subsets {
          id
          subsetName
          odinDatasetId
          registryName
          __typename
        }
      }
    `,
    variables: {}
  },
  {
    name: "FILE TRACKER - Get Datasets",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getDatasets {
        datasets {
          id
          name
          code
          description
          managingSociety
          isRegistry
          isAdmin
          isDropAndLoad
          isTenantLevel
          diseaseStateModules {
            id
            name
            code
            description
            __typename
          }
          deadlines {
            id
            quarterIncluded
            quarterSubmissionDeadline
            __typename
          }
          datasetVersions {
            id
            name
            versionNumber
            description
            startDate
            datasetId
            __typename
          }
          __typename
        }
      }
    `,
    variables: {}
  },
  // {
  //   name: "FILE TRACKER - Get Client Data Files",
  //   type: "graphql",
  //   method: "POST",
  //   url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
  //   query: `
  //     query getClientDataFiles($minDate: DateTime, $maxDate: DateTime, $filters: ClientDataFileFilters, $ids: [String!]) {
  //       clientDataFiles(
  //         minDate: $minDate
  //         maxDate: $maxDate
  //         filters: $filters
  //         ids: $ids
  //       ) {
  //         id
  //         ingestionFileId
  //         name
  //         parentId
  //         createdAt
  //         submittedAt
  //         blobUrl
  //         rootTriggerId
  //         ingestedAt
  //         ingestionState
  //         clientDataFileFamilyId
  //         submittedBy {
  //           id
  //           fullName
  //           tenantId
  //           __typename
  //         }
  //         jiraIssues {
  //           key
  //           __typename
  //         }
  //         trails {
  //           id
  //           state
  //           comment
  //           version
  //           clientDataFileId
  //           isLatest
  //           __typename
  //         }
  //         dataframes {
  //           maskedAt
  //           maskerState
  //           auditorId
  //           tenantId
  //           id
  //           name
  //           subsetId
  //           datasetId
  //           maskedDataFrameName
  //           location
  //           startDate
  //           endDate
  //           validation
  //           mclStatus
  //           availableToETL
  //           datasetInstances {
  //             id
  //             careEntityId
  //             datasetId
  //             month
  //             year
  //             isReady
  //             matches
  //             volume
  //             __typename
  //           }
  //           __typename
  //         }
  //         lifelineActionErrors {
  //           id
  //           type
  //           message
  //           dataframeId
  //           clientDataFileId
  //           rootTriggerId
  //           createdAt
  //           updatedAt
  //           __typename
  //         }
  //         __typename
  //       }
  //     }
  //   `,
  //   variables: {
  //     minDate: "2025-07-06T19:00:00.000Z",
  //     maxDate: "2025-07-14T18:59:00.000Z",
  //     filters: {}
  //   }
  // },
  {
    name: "FILE TRACKER - Get Client Data Files",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getClientDataFiles($minDate: DateTime, $maxDate: DateTime, $ids: [String!]) {
        tenantFiles(
          minDate: $minDate
          maxDate: $maxDate
          ids: $ids
        ) {
          id
          ingestionFileId
          name
          parentId
          createdAt
          submittedAt
          blobUrl
          rootTriggerId
          ingestedAt
          ingestionState
          clientDataFileFamilyId
          submittedBy {
            id
            fullName
            tenantId
            __typename
          }
          jiraIssues {
            key
            __typename
          }
          trails {
            id
            state
            comment
            version
            clientDataFileId
            isLatest
            __typename
          }
          dataframes {
            maskedAt
            maskerState
            auditorId
            tenantId
            id
            name
            subsetId
            datasetId
            maskedDataFrameName
            location
            startDate
            endDate
            validation
            mclStatus
            availableToETL
            datasetInstances {
              id
              careEntityId
              datasetId
              month
              year
              isReady
              matches
              volume
              __typename
            }
            __typename
          }
          lifelineActionErrors {
            id
            type
            message
            dataframeId
            clientDataFileId
            rootTriggerId
            createdAt
            updatedAt
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      minDate: "2025-07-06T19:00:00.000Z",
      maxDate: "2025-07-14T18:59:00.000Z"
    }
  },
  {
    name: "DATAFLOWS",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/coordinator/graphql",
    query: `
      query getDataflows($minDate: DateTime, $maxDate: DateTime, $dataflowRunIds: [String!]) {
        dataflows(minDate: $minDate, maxDate: $maxDate, dataflowRunIds: $dataflowRunIds) {
          id
          name
          dataFeedInputs
          readConnectors
          writeConnectors
          dataFeedOutputs
          version
          type
          dataflowRuns {
            id
            dataflowRunUUID
            endTime
            startTime
            status
            validation
            movedToProd
            requestId
            request {
              id
              status
              comment
              createdBy {
                id
                username
                __typename
              }
              __typename
            }
            outputs {
              id
              type
              componentId
              state
              __typename
            }
            auditourReports {
              id
              createdAt
              reportId
              name
              state
              __typename
            }
            datasetInstances {
              id
              year
              datasetId
              month
              careEntityId
              __typename
            }
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      minDate: "2025-07-06T19:00:00.000Z",
      maxDate: "2025-07-14T18:59:00.000Z"
    }
  },
  {
    name: "OE PIPELINE RUNS",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/coordinator/graphql",
    query: `
      query getOePipelineRuns($minDate: DateTime, $maxDate: DateTime, $ids: [String!]) {
        oePipelineRuns(minDate: $minDate, maxDate: $maxDate, ids: $ids) {
          id
          dataflowRunUUID
          startTime
          endTime
          status
          movedToProd
          movedToStaging
          validation
          etlRuns {
            id
            status
            endTime
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      minDate: "2025-07-06T19:00:00.000Z",
      maxDate: "2025-07-14T18:59:00.000Z"
    }
  },
  {
    name: "SUBMISSION STATUS - Get Grid Views",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getGridViews($gridId: String!) {
        getGridViews(gridId: $gridId) {
          id
          name
          filterModel
          columnModel
          externalFilters
          scope
          tenantId
          userId
          gridId
          moduleId
          careEntityId
          default
          updatedAt
          __typename
        }
      }
    `,
    variables: {
      gridId: "admin-submission-status"
    }
  },
  {
    name: "SUBMISSION STATUS",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/coordinator/graphql",
    query: `
      query submissionsStatus($minDate: DateTime!, $maxDate: DateTime!) {
        submissionStatuses(minDate: $minDate, maxDate: $maxDate) {
          id
          submission {
            id
            cadence
            careEntityId
            datasetId
            mrnCrosswalkRequired
            mrnHarvestRequired
            __typename
          }
          user {
            id
            fullName
            __typename
          }
          period
          deadline
          submittedAt
          reminderDate
          sendReminder
          reminderLogs {
            id
            date
            type
            __typename
          }
          matchRates
          coverage
          caseCount
          startDate
          endDate
          __typename
        }
      }
    `,
    variables: {
      minDate: "2023-12-04T19:00:00.000Z",
      maxDate: "2026-07-14T18:59:00.000Z"
    }
  },
  {
    name: "CLIENT DATA SNAPSHOT",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/coordinator/graphql",
    query: `
      query getClientDataSnapshots($quarter: String!) {
        clientDataSnapshots(quarter: $quarter) {
          id
          cadence
          submissionId
          careEntityId
          datasetId
          deadlineDate
          quarter
          month
          year
          quarterlyDeadline
          tenantId
          riskAuditsGenerated
          reminderLogs {
            id
            createdAt
            type
            __typename
          }
          datasetInstances {
            id
            volume
            matches
            month
            volume
            dataframes {
              id
              clientDataFile {
                id
                submittedAt
                ingestedAt
                __typename
              }
              __typename
            }
            dataflowRuns {
              id
              endTime
              movedToProd
              oePipelineRuns {
                id
                endTime
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
      quarter: "2025Q3"
    }
  },
  {
    name: "DATAFRAMES",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/coordinator/graphql",
    query: `
      query getDataframes($minDate: DateTime, $maxDate: DateTime, $filters: DataframeFilters) {
        dataframes(minDate: $minDate, maxDate: $maxDate, filters: $filters) {
          id
          name
          createdAt
          mclStatus
          maskerState
          validation
          tenantId
          availableToETL
          auditorId
          startDate
          endDate
          maskedDataFrameName
          datasetInstances {
            volume
            matches
            month
            year
            careEntityId
            careEntity {
              name
              __typename
            }
            datasetId
            dataset {
              name
              __typename
            }
            __typename
          }
          clientDataFileId
          clientDataFile {
            name
            submittedAt
            __typename
          }
          trails {
            id
            comment
            version
            dataframeId
            isLatest
            __typename
          }
          __typename
        }
      }
    `,
    variables: {
      minDate: "2025-07-06T19:00:00.000Z",
      maxDate: "2025-07-14T18:59:00.000Z",
      filters: {}
    }
  }
];

export default ENDPOINTS;