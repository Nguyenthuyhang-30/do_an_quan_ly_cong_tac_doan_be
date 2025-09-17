require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./configs/swagger.config");

const PORT = process.env.DEV_APP_PORT || 3055;

// console.log("Process Environment:", process.env);

// init middleware
app.use(morgan("dev")); // hiên thị log request
// morgan("combined");
// morgan("common");
// morgan("short");
// morgan("tiny");

app.use(helmet()); // bảo mật ứng dụng bằng cách thiết lập các tiêu đề HTTP

app.use(compression()); // nén response để giảm băng thông

// parse JSON body
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// init db
// require("./dbs/init.mongodb");
// const { checkOverLoad } = require("./helpers/check.mongodb.connect");
// checkOverLoad();

require("./dbs/init.postgre");
const { checkOverLoad } = require("./helpers/check.postgre.connect");
checkOverLoad();

// init routes
app.use("/", require("./routes"));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// hanlde errors

module.exports = app;
