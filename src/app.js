'use strict';

function requestHandler(request, response) {
  response.setHeader('Content-Type', 'application/json');

  if (request.method === 'GET' && request.url === '/health') {
    response.writeHead(200);
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200);
    response.end(JSON.stringify({
      message: 'Hello from Node.js, Jenkins, and Terraform!',
      environment: process.env.APP_ENV || 'development'
    }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ error: 'Not found' }));
}

module.exports = { requestHandler };
