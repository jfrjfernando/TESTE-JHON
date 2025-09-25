#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Yu-Gi-Oh! Fusion Simulator running at http://localhost:${port}`);
  console.log('You can now use this app offline!');
  console.log('To stop the server, press Ctrl+C');
});