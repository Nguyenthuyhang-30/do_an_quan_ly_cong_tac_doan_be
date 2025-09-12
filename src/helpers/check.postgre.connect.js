"use strict";

const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// Truyền đối tượng sequelize để lấy thông tin pool
const countConnect = (sequelize) => {
  if (
    !sequelize ||
    !sequelize.connectionManager ||
    !sequelize.connectionManager.pool
  ) {
    console.log("Sequelize instance is not available for connection count.");
    return 0;
  }
  const used = sequelize.connectionManager.pool.size;
  console.log(`Number of active PostgreSQL connections: ${used}`);
  return used;
};

const checkOverLoad = (sequelize) => {
  setInterval(() => {
    if (
      !sequelize ||
      !sequelize.connectionManager ||
      !sequelize.connectionManager.pool
    ) {
      console.log("Sequelize instance is not available for overload check.");
      return;
    }
    const used = sequelize.connectionManager.pool.size;
    const numCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCore * 5;

    console.log(`Active PostgreSQL Connections: ${used}`);
    console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

    if (used > maxConnections) {
      console.log(
        `Overloaded: ${used} connections, max allowed: ${maxConnections}`
      );
      // Notify.send(....)
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverLoad,
};
