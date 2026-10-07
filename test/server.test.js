'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { requestHandler } = require('../src/app');

function makeRequest(method, url) {
  const result = { headers: {} };
  const response = {
    setHeader(name, value) {
      result.headers[name] = value;
    },
    writeHead(statusCode) {
      result.statusCode = statusCode;
    },
    end(body) {
      result.body = JSON.parse(body);
    }
  };

  requestHandler({ method, url }, response);
  return result;
}

test('GET / returns the welcome response', () => {
  const response = makeRequest('GET', '/');
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.message, 'Hello from Node.js, Jenkins, and Terraform!');
});

test('GET /health reports a healthy service', () => {
  const response = makeRequest('GET', '/health');
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});

test('unknown routes return 404', () => {
  const response = makeRequest('GET', '/missing');
  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.body, { error: 'Not found' });
});
