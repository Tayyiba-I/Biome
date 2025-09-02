const ENDPOINTS = [
  {
    name: "Get Grid Views",
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
      gridId: "risk-audit-grid-CathPCI"
    }
  },
  {
    name: "Get Risk Audit Fields",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getRiskAuditFields($diseaseStateModuleId: Int!) {
        riskAuditFields(diseaseStateModuleId: $diseaseStateModuleId) {
          id
          name
          phi
          type
          visibility
          displayRank
          displayName
          description
          category
          __typename
        }
      }
    `,
    variables: {
      diseaseStateModuleId: 5
    }
  },
  {
    name: "Get Risk Audit Attributes",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getRiskAuditAttributes($diseaseStateModuleId: Int!, $careEntityId: String) {
        riskAuditAttributes(
          diseaseStateModuleId: $diseaseStateModuleId
          careEntityId: $careEntityId
        ) {
          biomeLatestRefreshDate
          maxStudyDate
          availableQuarters
          __typename
        }
      }
    `,
    variables: {
      diseaseStateModuleId: 5,
      careEntityId: "vrqL6wLdWnDfNM1du9VYNL"
    }
  },
  {
    name: "Get Risk Audits",
    type: "graphql",
    method: "POST",
    url: "https://bifrost.dev.biomedata.io/api/odin/graphql",
    query: `
      query getRiskAudits($diseaseStateModuleId: Int!, $careEntityId: String, $endDate: DateTime, $startDate: DateTime) {
        riskAudits(
          diseaseStateModuleId: $diseaseStateModuleId
          careEntityId: $careEntityId
          startDate: $startDate
          endDate: $endDate
        ) {
          biomeEncounterId
          auditId
          visitId
          hospital
          region
          encounterId
          mrn
          registryId
          procedure
          arrivalDate
          procedureDate
          dischargeDate
          dischargeYear
          dischargeQuarter
          surgicalYear
          surgicalQuarter
          diagnosisPOACodeList
          visitTiming
          riskValue
          riskReview
          reviewTriggerDescription
          keyField
          keyFieldValue
          volume
          biomeETLVersion
          physician
          mrnOriginal
          procedureGroup
          pciStatus
          pciIndication
          trails {
            id
            notes
            status
            version
            latestStudyOnRecord
            updateBy {
              fullName
              title
              firstName
              lastName
              __typename
            }
            updateAt
            __typename
          }
          auditFlagSource
          system
          biomeUpdateDt
          careEntityId
          tenantId
          careEntityName
          diseaseStateModuleId
          __typename
        }
      }
    `,
    variables: {
      diseaseStateModuleId: 5,
      careEntityId: "vrqL6wLdWnDfNM1du9VYNL",
      endDate: "2025-06-30T23:59:00.000Z",
      startDate: "2025-04-01T00:00:00.000Z"
    }
  }
];

export default ENDPOINTS;