                  // This file contains all the endpoints of provided apis
export default [

  {
    name: "Feasibility",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/feasibility",
    params: {}
  },
  {
    name: "Feasibility with Cohort ID",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/feasibility",
    params: {
      cohort_id: "168160625"
    }
  },
  {
    name: "Sutter Opp with Cohort",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter",
    params: {
      cohort: "168160625",
      sysonly: "1"
    }
  },
  {
    name: "Sutter Summary",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter",
    params: {
      summarycohortonly: "1",
      sysonly: "1"
    }
  },
  {
    name: "Sutter ICD Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/ICD",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "1999",
      cohorts: "987691249",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STROKE Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STROKE",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: "1",
      measures: "1991",
      cohorts: "474122600",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter CathPCI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CathPCI",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: "1",
      measures: "823",
      cohorts: "2131362447",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter Echocardiogram Data (Quarter)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/Echocardiogram",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "2626",
      cohorts: "2115969347",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter Echocardiogram Data (R4Q)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/Echocardiogram",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: "1",
      measures: "2569,2596,2570,2571,2607",
      cohorts: "2115969347",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter CB-EPDI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-EPDI",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "2787",
      cohorts: "4048465847",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter CB-CVImaging Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-CVImaging",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "3194",
      cohorts: "546983199",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter CB-AMI Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/CB-AMI",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "2856",
      cohorts: "803898163",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      measures: "1032",
      cohorts: "168160625",
      risk_adjusted: "0"
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
  },
  {
    name: "STS Data (OE Detail Page)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: "1",
      measures: "853,851,802,800,840,657,24,151,154,582,848,64,1573,886",
      cohorts: "2196338943",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Opp (OE Detail Page)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter/STS/1028",
    params: {
      include_subgroups: "1"
    }
  },
  {
    name: "Sutter STS Data by Cohort & Measure",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS/1028/2196338943",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Variation",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/variation/STS/1028/2196338943",
    params: {
      hospital: "Sutter",
      ati: "0",
      allhosps: "1",
      include_aggregate_entity: "0"
    }
  },
  {
    name: "Sutter STS Data Averages",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/averages/1028/2196338943",
    params: {
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Hospital Benchmarks",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/benchmarks/Hospital/Biome/STS/1028/2196338943",
    params: {
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS RU Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/RU/STS/1028/2196338943",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Composite Measures (R4Q)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: "2196338943",
      include_subentities: "0",
      granularity: "r4q",
      include_subgroups: "0",
      include_trend: "1"
    }
  },
  {
    name: "Sutter STS Composite Measures (Quarter)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: "2196338943",
      include_subentities: "0",
      granularity: "quarter",
      include_subgroups: "0",
      include_trend: "1"
    }
  },

  // PROCEDURE SELECTED ENDPOINTS
  {
    name: "Sutter STS Data (Procedure Selected)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/Sutter/STS/1028/168160625",
    params: {
      granularity: "quarter",
      include_aggregate_entity: "1",
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Variation (Procedure Selected)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/variation/STS/1028/168160625",
    params: {
      hospital: "Sutter",
      ati: "0",
      allhosps: "1",
      include_aggregate_entity: "0"
    }
  },
  {
    name: "Sutter STS Data Averages (Procedure Selected)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/averages/1028/168160625",
    params: {
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Hospital Benchmarks (Procedure Selected)",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/benchmarks/Hospital/Biome/STS/1028/168160625",
    params: {
      risk_adjusted: "0"
    }
  },
  {
    name: "Sutter STS Composite Measures (R4Q) - Procedure Selected",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/composite/measures",
    params: {
      entity_id: "Sutter",
      measure_id: "1028,15,85,108,294,302,414,915,1575",
      cohort: "168160625",
      include_subentities: "0",
      granularity: "r4q",
      include_subgroups: "0",
      include_trend: "1"
    }
  },
  {
    name: "PM Main Page Savings",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/savings",
    params: {
      initiative_id: "3093578854,4211370598,2728585952,3692355787,746254925,2469509194,715865938,421655505,3791463621,2959143125,3052734315,639088221,370550681,3328327262,2992775806,2721343191,878392783,3268046300,3365664911,2443089637,1999259876,382727549,2305315704,3801784512,306891561,1304460857,3075908547,2140073687,3729026163,3760544094,336374375,847169057,3863758031,1503930426,2851086269,1261319128,1172613168,487453319,1920414750,1866491684"
    }
  },
  {
    name: "PM Main Page CVHS Monitor Statuses",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/statuses",
    params: {
      entity_id: "CVHS",
      granularity: "quarter"
    }
  },
  {
    name: "PM Main Page CVHS STS Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/data/CVHS/STS",
    params: {
      granularity: "R4Q",
      include_aggregate_entity: "1",
      measures: "837,853,840,844,845,294,1038,1575,741,609,800,855,1573,1679,808",
      cohorts: "2196338943",
      risk_adjusted: "0"
    }
  },

  // PM DETAIL PAGE ENDPOINTS
  {
    name: "PM Detail Page Sutter Monitor Statuses",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/statuses",
    params: {
      entity_id: "Sutter",
      granularity: "quarter"
    }
  },
  {
    name: "PM Detail Page Sutter Savings",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/savings",
    params: {
      initiative_id: "3093578854,4211370598,2728585952,3692355787,746254925,2469509194,715865938,421655505,3791463621,2959143125,3052734315,639088221,370550681,3328327262,2992775806,2721343191,878392783,3268046300,3365664911,2443089637,1999259876,382727549,2305315704,3801784512,306891561,1304460857,3075908547,2140073687,3729026163,3760544094,336374375,847169057,3863758031,1503930426,2851086269,1261319128,1172613168,487453319,1920414750,1866491684"
    }
  },
  {
    name: "PM Detail Page Sutter STS Opp",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter/STS/122/168160625",
    params: {
      include_subgroups: "1"
    }
  },
  {
    name: "PM Detail Page Sutter Milestones",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/milestones",
    params: {
      initiative_id: "1920414750",
      entity_id: "Sutter",
      granularity: "quarter"
    }
  },
  {
    name: "PM Detail Page Sutter Monitor Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/data",
    params: {
      initiative_id: "1920414750",
      granularity: "quarter"
    }
  },
  {
    name: "PM Detail Page Sutter Monitor Impact",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/impact",
    params: {
      initiative_id: "1920414750"
    }
  },
];
