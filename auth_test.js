import http from 'k6/http';
import { check } from 'k6';
//This K6 script is a basic performance test that sends a GET request to a users endpoint. It was created for understanding purpose of  Handling Authentication (Bearer tokens & API keys.)
// It uses environment variables, which can be loaded from a .env file, for authentication and API URL configuration. 
// The script verifies that the endpoint responds with a 200 OK status and a non-empty list of users.
const API_BASE_URL = __ENV.API_BASE_URL;
const BEARER_TOKEN = __ENV.BEARER_TOKEN;

export default function () {
  const params = {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(`${API_BASE_URL}/users`, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'contains users': (r) => r.json().length > 0,
  });
}