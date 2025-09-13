"use strict";

const mongoose = require("mongoose");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");

const connectString =
  process.env.MONGODB_URI || `mongodb://${host}:${port}/${name}`;

const { countConnect } = require("../helpers/check.mongodb.connect");

class Database {
  constructor() {
    this.connect();
  }

  // connect to MongoDB
  connect(type = "mongodb") {
    mongoose
      .connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 50, // Set max pool size to 50 connections
      })
      .then((_) => {
        console.log(`Connected to ${name} MongoDB`, countConnect());
      })
      .catch((err) =>
        console.error(`Could not connect to ${type} MongoDB`, err)
      );

    // dev
    if (process.env.NODE_ENV === "development" || 1 === 1) {
      mongoose.set("debug", true); // Enable debug mode for Mongoose
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;
