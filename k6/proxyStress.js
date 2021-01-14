import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '120s', target: 3500 }
  ],
  startVUs: 2000
};

export default function () {
  let max = 10000000;
  let min = 9000000;
  let randomId = Math.random() * (max - min) + min;
  let res = http.get(`http://localhost:8000/${randomId}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
};

/*
-1 rps for 10 seconds
-ramp from 1 to 10 for 15 seconds
-stay at 10 for 60 seconds
-ramp from 10 to 100 for 30 seconds
-stay at 100 for 60 seconds
-ramp from 100 to 550 for 45 seconds
-stay at 550 for 60 seconds
-ramp from 550 to 1000 for 60 seconds
-stay at 1000 for 120 seconds
*/