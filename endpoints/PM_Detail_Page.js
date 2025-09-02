const ENDPOINTS = [
  {
    name: "PM DETAIL PAGE - Monitor Statuses",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/statuses",
    params: {
      entity_id: "Sutter",
      granularity: "quarter"
    }
  },
  {
    name: "PM DETAIL PAGE - Savings",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/savings",
    params: {
      initiative_id: "3093578854,4211370598,2728585952,3692355787,746254925,2469509194,715865938,421655505,3791463621,2959143125,3052734315,639088221,370550681,3328327262,2992775806,2721343191,878392783,3268046300,3365664911,2443089637,1999259876,382727549,2305315704,3801784512,306891561,1304460857,3075908547,2140073687,3729026163,3760544094,336374375,847169057,3863758031,1503930426,2851086269,1261319128,1172613168,487453319,1920414750,1866491684"
    }
  },
  {
    name: "PM DETAIL PAGE - Opportunity Subgroups",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/opp/Sutter/STS/122/168160625",
    params: {
      include_subgroups: 1
    }
  },
  {
    name: "PM DETAIL PAGE - Milestones",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/milestones",
    params: {
      initiative_id: 1920414750,
      entity_id: "Sutter",
      granularity: "quarter"
    }
  },
  {
    name: "PM DETAIL PAGE - Data",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/data",
    params: {
      initiative_id: 1920414750,
      granularity: "quarter"
    }
  },
  {
    name: "PM DETAIL PAGE - Impact",
    type: "rest-api",
    method: "GET",
    url: "https://bifrost.dev.biomedata.io/api/caerus/monitor/impact",
    params: {
      initiative_id: 1920414750
    }
  }
];

export default ENDPOINTS;