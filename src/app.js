require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

console.log("Process Environment:", process.env);

// init middleware
app.use(morgan("dev")); // hiên thị log request
// morgan("combined");
// morgan("common");
// morgan("short");
// morgan("tiny");

app.use(helmet()); // bảo mật ứng dụng bằng cách thiết lập các tiêu đề HTTP

app.use(compression()); // nén response để giảm băng thông

// init db
require("./dbs/init.mongodb");
const { checkOverLoad } = require("./helpers/check.mongodb.connect");
checkOverLoad();

// init routes
app.use("/", require("./routes"));

// hanlde errors

module.exports = app;
