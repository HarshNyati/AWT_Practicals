// URL parsing using Node.js built-in 'url' module
const url = require('url');

console.log('=== URL Parsing Demo ===\n');

// Sample URL to parse
const sampleUrl = 'https://www.example.com:8080/path/to/page?name=John&age=30#section1';

console.log(`Sample URL: ${sampleUrl}\n`);

// Parse the URL
const parsedUrl = url.parse(sampleUrl, true);

console.log('URL Components:');
console.log('─────────────────────────────────────');
console.log(`Protocol:      ${parsedUrl.protocol}`);
console.log(`Host:          ${parsedUrl.host}`);
console.log(`Hostname:      ${parsedUrl.hostname}`);
console.log(`Port:          ${parsedUrl.port}`);
console.log(`Pathname:      ${parsedUrl.pathname}`);
console.log(`Search:        ${parsedUrl.search}`);
console.log(`Hash:          ${parsedUrl.hash}`);
console.log('─────────────────────────────────────\n');

console.log('Query Parameters:');
console.log('─────────────────────────────────────');
const query = parsedUrl.query;
for (const [key, value] of Object.entries(query)) {
  console.log(`  ${key}: ${value}`);
}
console.log('─────────────────────────────────────\n');

// Using URL constructor (modern approach)
console.log('Using URL Constructor (Modern Approach):');
const urlObj = new URL(sampleUrl);
console.log(`Origin:        ${urlObj.origin}`);
console.log(`Href:          ${urlObj.href}`);
console.log(`SearchParams:  ${urlObj.searchParams}`);

console.log('\n=== URL Parsing Demo Complete ===');
