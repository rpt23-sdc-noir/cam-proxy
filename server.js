require('newrelic');
const express = require('express');
const { truncate } = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const chalk = require('chalk');
const port = 8000;
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('client'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/songdata/', createProxyMiddleware({
  target: 'http://localhost:3005',
  changeOrigin: true
}));

// app.use('/relatedTracks/', createProxyMiddleware({
//   target: 'http://localhost:3001',
//   changeOrigin: true
// }));

// app.use('/artistBio/', createProxyMiddleware({
//   target: 'http://localhost:2000',
//   changeOrigin: true
// }));

// app.use('/comments/', createProxyMiddleware({
//   target: 'http://localhost:4000',
//   changeOrigin: true
// }));

// app.use('/hashtags/', createProxyMiddleware({
//   target: 'http://localhost:4001',
//   changeOrigin: true
// }));

// app.use('/users/', createProxyMiddleware({
//   target: 'http://localhost:4002',
//   changeOrigin: true
// }));

app.use('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(port, () => {
  console.log(chalk.blue(`Proxy server listening on http://localhost:${port}!`));
});