// EventEmitter Demo using Node.js built-in 'events' module
const EventEmitter = require('events');

console.log('=== EventEmitter Demo ===\n');

// Create an instance of EventEmitter
const emitter = new EventEmitter();

console.log('Setting up event listeners...\n');

// Event 1: 'greet' event
emitter.on('greet', (name) => {
	console.log('Greeting Event Triggered!');
	console.log(`Message: Hello, ${name}! Welcome to Node.js Events.\n`);
});

// Event 2: 'userLogin' event
emitter.on('userLogin', (data) => {
	console.log('User Login Event Triggered!');
	console.log(`Username: ${data.username}`);
	console.log(`Timestamp: ${data.timestamp}\n`);
});

// Event 3: 'error' event (built-in)
emitter.on('error', (error) => {
	console.log('Error Event Triggered!');
	console.log(`Error message: ${error}\n`);
});

// Additional listener for 'userLogin' to show multiple listeners
emitter.on('userLogin', (data) => {
	console.log('Logging user activity...');
	console.log(`Activity logged for: ${data.username}\n`);
});

console.log('Emitting events...\n');
console.log('-------------------------------------');

// Emit Event 1: 'greet'
console.log('Emitting: greet event');
emitter.emit('greet', 'Alice');

// Emit Event 2: 'userLogin'
console.log('Emitting: userLogin event');
emitter.emit('userLogin', {
	username: 'john_doe',
	timestamp: new Date().toISOString(),
});

// Emit another 'greet' event
console.log('Emitting: greet event again');
emitter.emit('greet', 'Bob');

console.log('-------------------------------------');
console.log(
	`\nTotal listeners registered: ${emitter.listenerCount('greet')} for greet, ${emitter.listenerCount('userLogin')} for userLogin`
);
console.log('\n=== EventEmitter Demo Complete ===');