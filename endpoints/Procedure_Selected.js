const ENDPOINTS = [
  {
    name: "PROCEDURE SELECTED - Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS/1028/168160625",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      risk_adjusted: 0,
      ati: 0,
      allhosp: 1
    }
  },
  {
    name: "PROCEDURE SELECTED - Variation",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/variation/STS/1028/168160625",
    params: {
      hospital: "Sutter",
      ati: 0,
      allhosps: 1,
      include_aggregate_entity: 0
    }
  },
  {
    name: "PROCEDURE SELECTED - Averages",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/averages/1028/168160625",
    params: {
      risk_adjusted: 0
    }
  },
  {
    name: "PROCEDURE SELECTED - Benchmarks",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/benchmarks/Hospital/Biome/STS/1028/168160625",
    params: {
      risk_adjusted: 0
    }
  },
  {
    name: "PROCEDURE SELECTED - Composite Measures R4Q",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: 168160625,
      include_subentities: 0,
      granularity: "r4q",
      include_subgroups: 0,
      include_trend: 1
    }
  }
];

export default ENDPOINTS;