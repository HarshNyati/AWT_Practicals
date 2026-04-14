// File System operations using Node.js 'fs' module
const fs = require('fs');
const path = require('path');

console.log('=== File System Operations Demo ===\n');

// Define file path
const filePath = path.join(__dirname, 'sample.txt');
const fileContent = 'This is a sample file created by Node.js!\nIt demonstrates file write, read, and delete operations.';

console.log(`1. Creating file: ${filePath}`);
// Create and write to file
fs.writeFileSync(filePath, fileContent);
console.log('✓ File created and content written successfully!\n');

console.log('2. Reading file content:');
// Read file synchronously
const readContent = fs.readFileSync(filePath, 'utf8');
console.log('File content:');
console.log(readContent);
console.log('✓ File read successfully!\n');

console.log('3. Getting file statistics:');
// Get file info
const stats = fs.statSync(filePath);
console.log(`File size: ${stats.size} bytes`);
console.log(`Created: ${stats.birthtime}`);
console.log('✓ File stats retrieved!\n');

console.log('4. Deleting file:');
// Delete file
fs.unlinkSync(filePath);
console.log(`✓ File deleted: ${filePath}\n`);

console.log('=== File System Demo Complete ===');
