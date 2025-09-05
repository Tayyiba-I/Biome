
import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { check } from 'k6';
import ENDPOINTS from './endpoints/Echo_gql.js';

//  It is a comprehensive performance test designed for both GraphQL and REST APIs.
//  It dynamically tests endpoints defined in an external file, performing detailed checks and validating GraphQL responses as they always show status 200,
//  then provides a performance summary in the console and exports a detailed report to a CSV file.


const AUTH_TOKEN = `Bearer ${__ENV.AUTH_TOKEN}`;
if (AUTH_TOKEN === 'Bearer undefined') {
  throw new Error('Authentication token is not set. Please provide it as an environment variable using "k6 run -e AUTH_TOKEN=your-token-here script.js"');
}


function sanitizeMetricName(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, '_');
} 


const endpointResponseTrends = {};
const endpointStatusTrends = {};
ENDPOINTS.forEach(ep => {
  const sanitizedName = sanitizeMetricName(ep.name);
  endpointResponseTrends[`${sanitizedName}_Duration`] = new Trend(`${sanitizedName}_Duration`);
  endpointStatusTrends[`${sanitizedName}_Status`] = new Trend(`${sanitizedName}_Status`);
});

function formatDuration(ms) {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)} s`;
  } else {
    return `${ms.toFixed(0)} ms`;
  }
}

function buildUrlWithParams(url, params) {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  const queryString = Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return queryString ? `${url}?${queryString}` : url;
}

export default function () {
  const commonHeaders = {
    Authorization: AUTH_TOKEN,
    Accept: "application/json"
  };

  ENDPOINTS.forEach(ep => {
    let res;
    let requestOptions = {
      headers: { ...commonHeaders, ...ep.headers },
    };

    switch (ep.type) {
      case "graphql":
        requestOptions.headers['Content-Type'] = 'application/json';
        const graphqlBody = JSON.stringify({
          query: ep.query,
          variables: ep.variables || {},
          operationName: ep.operationName || null
        });
        res = http.post(ep.url, graphqlBody, requestOptions);
        break;

      case "rest-api":
      default:
        if (ep.method === "POST") {
          const requestBody = JSON.stringify(ep.body);
          requestOptions.headers['Content-Type'] = 'application/json';
          res = http.post(ep.url, requestBody, requestOptions);
        } else {
          const urlWithParams = buildUrlWithParams(ep.url, ep.params);
          res = http.get(urlWithParams, requestOptions);
        }
        break;
    }
    
  
    if (res && res.status !== 0) {
      console.log(`Status: ${res.status}, Duration: ${res.timings.duration}ms for ${ep.name} (${ep.method || 'GET'})`);
      const sanitizedName = sanitizeMetricName(ep.name);
      endpointResponseTrends[`${sanitizedName}_Duration`].add(res.timings.duration);
      endpointStatusTrends[`${sanitizedName}_Status`].add(res.status);
    }

  
    check(res, {
      [`${ep.name} status is 200`]: (r) => r.status === 200,
    });

  
    if (ep.type === "graphql") {
      check(res, {
        [`${ep.name} has no GraphQL errors`]: (r) => {
          try {
            const body = JSON.parse(r.body);
            return !body.errors;
          } catch (e) {
            return false;
          }
        },
        [`${ep.name} has valid data`]: (r) => {
          try {
            const body = JSON.parse(r.body);
            return body.data !== null && body.data !== undefined;
          } catch (e) {
            return false;
          }
        }
      });

  
      try {
        const json = res.json();
        if (json.errors) {
          console.error(` GraphQL errors for ${ep.name}:`, JSON.stringify(json, null, 2));
        } else {
          console.log(`✅ ${ep.name} GraphQL query succeeded`);
        }
      } catch (e) {
        console.error(` Failed to parse GraphQL response for ${ep.name}`);
      }
    }
  });

  sleep(0.5);
}


export function handleSummary(data) {
  let consoleSummary = "--- API Performance Summary ---\n\n";
  
  let worstEndpoint = { name: '', avg: 0, url: '' };
  const endpointData = [];

  ENDPOINTS.forEach(ep => {
    const sanitizedName = sanitizeMetricName(ep.name);
    const durationMetricKey = `${sanitizedName}_Duration`;
    const statusMetricKey = `${sanitizedName}_Status`;
    
    const durationMetric = data.metrics[durationMetricKey];
    const statusMetric = data.metrics[statusMetricKey];

    if (!durationMetric) {
      endpointData.push({
        name: ep.name,
        type: ep.type,
        method: ep.method,
        url: ep.url,
        query: 'N/A (no data)',
        variables: 'N/A (no data)',
        min: 'ERROR',
        max: 'ERROR',
        avg: 'ERROR',
        status: 'ERROR',
        samples: 'ERROR',
        exceeds1s: 'ERROR',
        isWorstCase: false
      });
      return;
    }

    const avgTime = durationMetric.values.avg;
    const minTime = durationMetric.values.min;
    const maxTime = durationMetric.values.max;
    const exceeds1s = avgTime > 1000 ? 'Yes' : 'No';
    const avgStatus = statusMetric ? statusMetric.values.avg : 'N/A';

    if (avgTime > worstEndpoint.avg) {
      worstEndpoint.avg = avgTime;
      worstEndpoint.name = ep.name;
      worstEndpoint.url = ep.url;
    }
    
    let query = 'N/A';
    let variables = 'N/A';

    if (ep.type === 'graphql-query' && ep.request) {
      query = ep.request.query;
      variables = JSON.stringify(ep.request.variables || {});
    } else if (ep.method === 'POST' && ep.body) {
      query = JSON.stringify(ep.body);
    } else if (ep.method === 'GET' && ep.params) {
      query = JSON.stringify(ep.params);
    }
    
    const sanitizedQuery = query.replace(/[\r\n]+/g, ' ').replace(/"/g, "'");
    const sanitizedVariables = variables.replace(/[\r\n]+/g, ' ').replace(/"/g, "'");

    endpointData.push({
      name: ep.name,
      type: ep.type,
      method: ep.method,
      url: ep.url,
      min: formatDuration(minTime),
      max: formatDuration(maxTime),
      avg: formatDuration(avgTime),
      status: avgStatus ? avgStatus.toFixed(0) : 'N/A',
      samples: data.metrics.iterations.values.count,
      exceeds1s: exceeds1s,
      query: sanitizedQuery,      
      variables: sanitizedVariables,
      isWorstCase: false
    });
  });

  let csvContent = "Endpoint Name,Type,Method,URL,Query,Variables,Min Time (ms),Max Time (ms),Average Time (ms),API Status (Avg),Samples,Exceeds 1s Average,Exceeding 1s Endpoint URL,Worst Case\n";
  const slowEndpoints = [];

  endpointData.forEach(ep => {
    const isWorstCase = ep.name === worstEndpoint.name;
    
    consoleSummary += `
Endpoint: ${ep.name}
  - Type          : ${ep.type || 'N/A'}
  - Method        : ${ep.method || 'N/A'}
  - Min Time      : ${ep.min}
  - Max Time      : ${ep.max}
  - Average Time  : ${ep.avg}
  - Average Status: ${ep.status}
  - Samples       : ${ep.samples}
`;

    if (ep.exceeds1s === 'Yes') {
      slowEndpoints.push({ name: ep.name, url: ep.url, avg: ep.avg });
    }

    csvContent += `"${ep.name}","${ep.type || 'N/A'}","${ep.method || 'N/A'}","${ep.url || 'N/A'}","${ep.query}","${ep.variables}","${ep.min}","${ep.max}","${ep.avg}","${ep.status}",${ep.samples},${ep.exceeds1s},"${ep.exceeds1s === 'Yes' ? ep.url : ''}",${isWorstCase ? `"${worstEndpoint.url}"` : '""'}\n`;
  });

  consoleSummary += "\n--- Endpoints Exceeding 1 Second Average Response Time ---\n";
  if (slowEndpoints.length > 0) {
    slowEndpoints.forEach(ep => {
      consoleSummary += `  - ${ep.name} (URL: ${ep.url}): ${ep.avg}\n`;
    });
  } else {
    consoleSummary += "  None of the tested endpoints exceeded 1 second average response time.\n";
  }
  consoleSummary += "---------------------------------------------------------\n";

  if (worstEndpoint.name) {
    consoleSummary += `
*** ABSOLUTE WORST CASE: ***
The endpoint with the highest average response time is:
  - Endpoint: ${worstEndpoint.name}
  - Average Time: ${formatDuration(worstEndpoint.avg)}
---------------------------------------------------------\n`;
  }

  return {
    stdout: consoleSummary,
    'performance_summary_gql.csv': csvContent,
  };
}
