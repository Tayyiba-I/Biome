import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  // Define performance goals as thresholds
  thresholds: {
    // 99% of requests must have a duration under 300ms
    'http_req_duration': ['p(99)<300'], 
    // The rate of failed request   
    'http_req_failed': ['rate<0.01'], 
  },
  vus: 10,
  duration: '30s',
};

export default function () {
  let res = http.get('https://bifrost.dev.biomedata.io/api/caerus/opp/feasibility');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}