const http = require('http');

// Test user ID (replace with an actual ID if you know one)
const testUserId = '123456789012345678901234'; // Typical MongoDB ObjectId length

const options = {
  hostname: 'localhost',
  port: 5000,
  path: `/user/getbyid/${testUserId}`,
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
