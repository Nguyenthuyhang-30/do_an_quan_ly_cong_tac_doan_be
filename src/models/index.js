const { Sequelize } = require("sequelize");
const {
  db: { host, name, port, username, password, dialect },
} = require("../configs/config.postgre");

const sequelize = new Sequelize(name, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Định nghĩa model Cohort
db.Cohort = require("./cohort.model")(sequelize, Sequelize);

module.exports = db;
