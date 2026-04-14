const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to Express Server!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/submit', (req, res) => {
  console.log('Received JSON payload:', req.body);
  res.json({
    message: 'Data received successfully',
    receivedData: req.body,
  });
});

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
  res.send('Cookie "username" has been set to "JohnDoe"');
});

app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Cookie value for username: ${username}`);
    return;
  }
  res.send('No "username" cookie found');
});

app.get('/validate-cookie', (req, res) => {
  if (req.cookies.username) {
    res.send('Cookie is valid: username exists');
    return;
  }
  res.status(400).send('Cookie is invalid: username does not exist');
});

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});
