//-------------------- rest Api's Timing report with HTML Report



import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { check } from 'k6';
import ENDPOINTS from './Endpoints.js';


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
      case "graphql-query":
        requestOptions.headers['Content-Type'] = 'application/json';
        const graphqlBody = JSON.stringify({
          query: ep.request.query,
          variables: ep.request.variables || {},
          operationName: ep.request.operationName || null
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
    const avgStatus = statusMetric ? statusMetric.values.avg : 'N/A'; // Get average status

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


  // --- Generate HTML Report ---
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>k6 API Performance Report</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-100 text-gray-800">
    <div class="container mx-auto p-4 md:p-8">
        <h1 class="text-3xl font-bold text-center text-indigo-700 mb-6">k6 API Performance Report</h1>

        <!-- Overall Summary -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="font-medium">Total Iterations:</p>
                    <p class="text-xl font-bold">${data.metrics.iterations.values.count}</p>
                </div>
                <div>
                    <p class="font-medium">Total Requests:</p>
                    <p class="text-xl font-bold">${data.metrics.http_reqs.values.count}</p>
                </div>
            </div>
            ${worstEndpoint.name ? `
            <div class="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-inner">
                <p class="font-bold text-lg">Worst Performing Endpoint:</p>
                <p class="text-sm">Endpoint: <span class="font-semibold">${worstEndpoint.name}</span></p>
                <p class="text-sm">URL: <span class="font-semibold">${worstEndpoint.url}</span></p>
                <p class="text-sm">Average Time: <span class="font-semibold">${formatDuration(worstEndpoint.avg)}</span></p>
            </div>` : ''}
        </div>

        <!-- Endpoints Exceeding 1s -->
        ${slowEndpoints.length > 0 ? `
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-semibold text-orange-600 mb-4">Endpoints Exceeding 1s Average Response Time</h2>
            <ul class="list-disc pl-5 space-y-2 text-orange-700 font-medium">
                ${slowEndpoints.map(ep => `<li>${ep.name} (URL: ${ep.url}): ${ep.avg}</li>`).join('')}
            </ul>
        </div>` : ''}

        <!-- Detailed Endpoint Table -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 class="text-2xl font-semibold text-indigo-600 p-6">Detailed Endpoint Metrics</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-3 text-left">Endpoint Name</th>
                            <th class="p-3 text-left">Method</th>
                            <th class="p-3 text-left">Avg Time</th>
                            <th class="p-3 text-left">Min Time</th>
                            <th class="p-3 text-left">Max Time</th>
                            <th class="p-3 text-left">Avg Status</th>
                            <th class="p-3 text-left">Samples</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${endpointData.map(ep => {
                            const rowClass = ep.name === worstEndpoint.name ? 'bg-red-50 hover:bg-red-100 font-semibold' : 'hover:bg-gray-50';
                            return `
                                <tr class="${rowClass} border-t border-gray-200">
                                    <td class="p-3">${ep.name}</td>
                                    <td class="p-3">${ep.method || 'N/A'}</td>
                                    <td class="p-3">${ep.avg}</td>
                                    <td class="p-3">${ep.min}</td>
                                    <td class="p-3">${ep.max}</td>
                                    <td class="p-3">${ep.status}</td>
                                    <td class="p-3">${ep.samples}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
  `;


  return {
    stdout: consoleSummary,
    'performance_summary(1).csv': csvContent,
    'results.json': JSON.stringify(data),
    'performance_report.html': htmlContent, // New HTML report file
  };
}
