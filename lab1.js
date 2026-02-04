const EventEmitter = require('events');

// Create an Event Emitter instance
class EventMaestro extends EventEmitter {
    constructor() {
        super();
        this.eventCounts = {};
    }

    // Track event count
    trackEvent(eventName) {
        this.eventCounts[eventName] = (this.eventCounts[eventName] || 0) + 1;
    }

    // Get event summary
    getEventSummary() {
        return this.eventCounts;
    }
}

// Initialize Event Maestro
const maestro = new EventMaestro();

// Event listeners
maestro.on('user-login', (username, timestamp) => {
    maestro.trackEvent('user-login');
    console.log(`✓ [LOGIN] User "${username}" logged in at ${timestamp}`);
});

maestro.on('user-logout', (username, timestamp) => {
    maestro.trackEvent('user-logout');
    console.log(`✗ [LOGOUT] User "${username}" logged out at ${timestamp}`);
});

maestro.on('user-purchase', (username, item, price) => {
    maestro.trackEvent('user-purchase');
    console.log(`💰 [PURCHASE] User "${username}" purchased "${item}" for $${price}`);
});

maestro.on('profile-update', (username, field, value) => {
    maestro.trackEvent('profile-update');
    console.log(`📝 [PROFILE UPDATE] User "${username}" updated ${field} to "${value}"`);
});

// Summary event listener
maestro.on('show-summary', () => {
    console.log('\n' + '='.repeat(50));
    console.log('📊 EVENT SUMMARY REPORT');
    console.log('='.repeat(50));
    
    const summary = maestro.getEventSummary();
    let totalEvents = 0;
    
    for (const [eventName, count] of Object.entries(summary)) {
        console.log(`${eventName.toUpperCase()}: ${count} time(s)`);
        totalEvents += count;
    }
    
    console.log('-'.repeat(50));
    console.log(`TOTAL EVENTS TRIGGERED: ${totalEvents}`);
    console.log('='.repeat(50) + '\n');
});

// Emit various events
console.log('🎭 Event Maestro: Starting Event Simulation...\n');

// User login events
maestro.emit('user-login', 'alice123', new Date().toLocaleTimeString());
maestro.emit('user-login', 'bob456', new Date().toLocaleTimeString());
maestro.emit('user-login', 'charlie789', new Date().toLocaleTimeString());

// User purchase events
maestro.emit('user-purchase', 'alice123', 'Wireless Headphones', 89.99);
maestro.emit('user-purchase', 'bob456', 'Gaming Mouse', 45.50);
maestro.emit('user-purchase', 'alice123', 'USB Cable', 12.99);
maestro.emit('user-purchase', 'charlie789', 'Laptop Stand', 35.00);

// Profile update events
maestro.emit('profile-update', 'bob456', 'email', 'bob.new@email.com');
maestro.emit('profile-update', 'alice123', 'phone', '+1-555-0123');
maestro.emit('profile-update', 'charlie789', 'address', '123 Main St');

// User logout events
maestro.emit('user-logout', 'bob456', new Date().toLocaleTimeString());
maestro.emit('user-logout', 'alice123', new Date().toLocaleTimeString());

// More interactions
maestro.emit('user-login', 'alice123', new Date().toLocaleTimeString());
maestro.emit('user-purchase', 'alice123', 'Keyboard', 120.00);
maestro.emit('profile-update', 'alice123', 'avatar', 'new_avatar.png');
maestro.emit('user-logout', 'alice123', new Date().toLocaleTimeString());

// Trigger summary event
maestro.emit('show-summary');
