import http from 'k6/http';
import { check } from 'k6';

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