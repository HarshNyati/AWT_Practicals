// Basic HTTP Server using Node.js built-in 'http' module
const http = require('http');

console.log('Creating HTTP Server...');

// Create a server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Set response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send response
  res.end('Hello from Node.js HTTP Server!');
});

// Listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✓ HTTP Server is running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server\n');
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
