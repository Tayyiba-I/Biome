const ENDPOINTS = [
  {
    name: "OE DETAIL PAGE - R4Q Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: 1,
      measures: "853,851,802,800,840,657,24,151,154,582,848,64,1573,886",
      cohorts: "2196338943",
      risk_adjusted: 0
    }
  },
  {
    name: "OE DETAIL PAGE - Opportunity Subgroups",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter/STS/1028",
    params: {
      include_subgroups: 1
    }
  },
  {
    name: "OE DETAIL PAGE - Specific Data Point",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS/1028/2196338943",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      risk_adjusted: 0,
      ati: 0,
      allhosp: 1
    }
  },
  {
    name: "OE DETAIL PAGE - Variation",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/variation/STS/1028/2196338943",
    params: {
      hospital: "Sutter",
      ati: 0,
      allhosps: 1,
      include_aggregate_entity: 0
    }
  },
  {
    name: "OE DETAIL PAGE - Averages",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/averages/1028/2196338943",
    params: {
      risk_adjusted: 0
    }
  },
  {
    name: "OE DETAIL PAGE - Benchmarks",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/benchmarks/Hospital/Biome/STS/1028/2196338943",
    params: {
      risk_adjusted: 0
    }
  },
  {
    name: "OE DETAIL PAGE - RU",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/RU/STS/1028/2196338943",
    params: {
      granularity: "quarter",
      include_aggregate_entity: 1,
      risk_adjusted: 0
    }
  },
  {
    name: "OE DETAIL PAGE - Composite Measures R4Q",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: 2196338943,
      include_subentities: 0,
      granularity: "r4q",
      include_subgroups: 0,
      include_trend: 1
    }
  },
  {
    name: "OE DETAIL PAGE - Composite Measures Quarter",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: 2196338943,
      include_subentities: 0,
      granularity: "quarter",
      include_subgroups: 0,
      include_trend: 1
    }
  },
  {
    name: "OE DETAIL PAGE - Benchmarks",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/benchmarks/Hospital/Biome",
  }
];

export default ENDPOINTS;