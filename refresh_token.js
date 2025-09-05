//-------------------------------Token Management-----------------------------------------------



import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { check } from 'k6';
import ENDPOINTS from './Endpoints.js';


//This K6 script is a comprehensive load test that introduces advanced token management to simulate real-world user behavior. 
// It uses the setup function to obtain an initial authentication token and a custom function to automatically refresh it
//  as virtual users run the test, ensuring all requests are properly authenticated.
//  The script dynamically tests a list of authenticated REST and GraphQL endpoints under a gradually increasing load and
//  generates a detailed performance report; however, 
// due to a lack of valid login credentials, we were not able to fully execute the test and verify its results.

let currentAuthToken = '';
let tokenExpirationTime = 0;


export const options = {
    
    scenarios: {
        ramping_test: {
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
                
                { duration: '1m', target: 50 },
                
                { duration: '1m', target: 50 },
            ],
            gracefulRampDown: '30s',
        },
    },
};


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

\
function getNewToken() {
    console.log('Fetching a new token...');
    // Find the login endpoint in the list
    const loginEndpoint = ENDPOINTS.find(ep => ep.name === "Login Endpoint");

    if (!loginEndpoint) {
        throw new Error("Login Endpoint not found in the ENDPOINTS configuration.");
    }

    const res = http.post(loginEndpoint.url, JSON.stringify(loginEndpoint.body), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    // Check for a successful login response
    check(res, {
        'Login successful (status 200)': (r) => r.status === 200,
    });

    if (res.status === 200 && res.json() && res.json().access_token) {
        const token = res.json().access_token;
        // Assume the token is valid for 1 hour (3600 seconds) for this example.
        // You should get the actual expiration time from the API response if available.
        const expiresIn = res.json().expires_in || 3600;
        const expirationTime = Date.now() + (expiresIn * 1000);
        console.log(`Successfully fetched new token. Expires in ${expiresIn} seconds.`);
        return { token, expirationTime };
    } else {
        console.error(`Login failed with status ${res.status}: ${res.body}`);
        return { token: '', expirationTime: 0 };
    }
}

/**
 * The 'setup' function runs once at the beginning of the test.
 * We'll use it to get the initial authentication token.
 */
export function setup() {
    const { token, expirationTime } = getNewToken();
    return { initialToken: token, expirationTime };
}

/**
 * The 'default' function is the main entry point for the VUs.
 * It takes the data returned from the 'setup' function.
 */
export default function (data) {
    // Check if the current token is expired or not yet set
    if (!currentAuthToken || Date.now() > tokenExpirationTime) {
        console.log('Token is expired or not set. Getting a new token...');
        const { token, expirationTime } = getNewToken();
        if (token) {
            currentAuthToken = `Bearer ${token}`;
            tokenExpirationTime = expirationTime;
            console.log('Token successfully refreshed.');
        } else {
            console.error('Failed to get a new token. Aborting test for this VU.');
            return; // Abort this VU if token refresh fails
        }
    }

    const commonHeaders = {
        Authorization: currentAuthToken,
        Accept: "application/json"
    };

    // Filter out the 'Login Endpoint' as we handle it separately
    const endpointsToTest = ENDPOINTS.filter(ep => ep.name !== "Login Endpoint");

    endpointsToTest.forEach(ep => {
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
            \
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

    
    const endpointsForSummary = ENDPOINTS.filter(ep => ep.name !== "Login Endpoint");

    endpointsForSummary.forEach(ep => {
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
    - Type            : ${ep.type || 'N/A'}
    - Method          : ${ep.method || 'N/A'}
    - Min Time        : ${ep.min}
    - Max Time        : ${ep.max}
    - Average Time    : ${ep.avg}
    - Average Status  : ${ep.status}
    - Samples         : ${ep.samples}
`;

        if (ep.exceeds1s === 'Yes') {
            slowEndpoints.push({ name: ep.name, url: ep.url, avg: ep.avg });
        }

        csvContent += `"${ep.name}","${ep.type || 'N/A'}","${ep.method || 'N/A'}","${ep.url || 'N/A'}","${ep.query}","${ep.variables}","${ep.min}","${ep.max}","${ep.avg}","${ep.status}",${ep.samples},${ep.exceeds1s},"${ep.exceeds1s === 'Yes' ? ep.url : ''}",${isWorstCase ? `"${worstEndpoint.url}"` : '""'}\n`;
    });

    consoleSummary += "\n--- Endpoints Exceeding 1 Second Average Response Time ---\n";
    if (slowEndpoints.length > 0) {
        slowEndpoints.forEach(ep => {
            consoleSummary += `    - ${ep.name} (URL: ${ep.url}): ${ep.avg}\n`;
        });
    } else {
        consoleSummary += "    None of the tested endpoints exceeded 1 second average response time.\n";
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
        'performance_summary.csv': csvContent,
    };
}
  