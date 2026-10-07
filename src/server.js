'use strict';

const http = require('node:http');
const { requestHandler } = require('./app');

const port = Number(process.env.PORT || 3000);
const server = http.createServer(requestHandler);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
