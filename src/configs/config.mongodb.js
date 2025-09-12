"use strict";

// lv0

// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "ecommerce",
//   },
// };

// lv1

// Cấu hình cho MongoDB

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    host: process.env.DEV_MONGO_HOST || "localhost",
    port: process.env.DEV_MONGO_PORT || 27017,
    name: process.env.DEV_MONGO_NAME || "db_ecommerce_dev",
    username: process.env.DEV_MONGO_USER || "",
    password: process.env.DEV_MONGO_PASS || "",
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000,
  },
  db: {
    host: process.env.PROD_MONGO_HOST || "localhost",
    port: process.env.PROD_MONGO_PORT || 27017,
    name: process.env.PROD_MONGO_NAME || "db_ecommerce_prod",
    username: process.env.PROD_MONGO_USER || "",
    password: process.env.PROD_MONGO_PASS || "",
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
