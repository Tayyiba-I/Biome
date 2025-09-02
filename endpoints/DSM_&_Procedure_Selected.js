const ENDPOINTS = [
  {
    name: "Feasibility with Specific Cohort",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/feasibility",
    params: {
      cohort_id: 168160625
    }
  },
  {
    name: "Sutter Summary Cohort Only",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter",
    params: {
      summarycohortonly: 1,
      sysonly: 1
    }
  },
  {
    name: "Sutter Monitor Statuses",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/statuses",
    params: {
      entity_id: "Sutter",
      granularity: "quarter"
    }
  }
  
];

export default ENDPOINTS;
