"use strict";

// Cấu hình cho PostgreSQL

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    dialect: "postgres",
    host: process.env.DEV_PG_HOST || "localhost",
    port: process.env.DEV_PG_PORT || 5432,
    name: process.env.DEV_PG_NAME || "db_ecommerce_dev",
    username: process.env.DEV_PG_USER || "postgres",
    password: process.env.DEV_PG_PASS || "postgres",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000,
  },
  db: {
    dialect: "postgres",
    host: process.env.PROD_PG_HOST || "localhost",
    port: process.env.PROD_PG_PORT || 5432,
    name: process.env.PROD_PG_NAME || "db_ecommerce_prod",
    username: process.env.PROD_PG_USER || "postgres",
    password: process.env.PROD_PG_PASS || "postgres",
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
