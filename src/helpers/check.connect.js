"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// Count the number of active connections
const countConnect = () => {
  const numberOfConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numberOfConnections}`);
};

// Check overloaded connections
const checkOverLoad = () => {
  setInterval(() => {
    const numberOfConnections = mongoose.connections.length;
    const numCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Example: Maximum number of connections based on CPU cores (5)
    const maxConnections = numCore * 5;

    console.log(`Activte Connections: ${numberOfConnections}`);
    console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numberOfConnections > maxConnections) {
      console.log(
        `Overloaded: ${numberOfConnections} connections, max allowed: ${maxConnections}`
      );
      // Notify.send(....)
    }
  }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverLoad,
};
