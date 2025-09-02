const ENDPOINTS = [
  {
    name: "Feasibility",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/feasibility"
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
    name: "Sutter ICD Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/ICD",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 1999,
      cohorts: 987691249,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter STROKE Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STROKE",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: 1,
      measures: 1991,
      cohorts: 474122600,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter CathPCI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CathPCI",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: 1,
      measures: 823,
      cohorts: 2131362447,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter Echocardiogram (Quarter)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/Echocardiogram",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 2626,
      cohorts: 2115969347,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter Echocardiogram (R4Q, multiple measures)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/Echocardiogram",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: 1,
      measures: "2569,2596,2570,2571,2607",
      cohorts: 2115969347,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter CB-EPDI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-EPDI",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 2787,
      cohorts: 4048465847,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter CB-CVImaging Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-CVImaging",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 3194,
      cohorts: 546983199,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter CB-AMI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-AMI",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 2856,
      cohorts: 803898163,
      risk_adjusted: 0
    }
  },
  {
    name: "Sutter STS Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      measures: 1032,
      cohorts: 168160625,
      risk_adjusted: 0
    }
  }
];

export default ENDPOINTS;
