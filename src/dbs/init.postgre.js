"use strict";

const { Sequelize } = require("sequelize");
const {
  db: { host, name, port, username, password, dialect },
} = require("../configs/config.postgre");

const connectString =
  process.env.POSTGRES_URI ||
  `${dialect}://${username}:${password}@${host}:${port}/${name}`;

const { countConnect } = require("../helpers/check.mongodb.connect");

class Database {
  constructor() {
    this.connect();
  }

  // connect to PostgreSQL
  connect(type = "postgresql") {
    this.sequelize = new Sequelize(connectString, {
      logging:
        process.env.NODE_ENV === "development" || 1 === 1 ? console.log : false,
      pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    this.sequelize
      .authenticate()
      .then(() => {
        console.log(`Connected to ${name} PostgreSQL`, countConnect());
      })
      .catch((err) =>
        console.error(`Could not connect to ${type} PostgreSQL`, err)
      );
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instancePostgreSQL = Database.getInstance();

module.exports = instancePostgreSQL;
