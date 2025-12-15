require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const app = express();

const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./configs/swagger.config");

const PORT = process.env.DEV_APP_PORT || 3055;

// init middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3052",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://dtn.aiotlab.edu.vn",
        "https://admin.dtn.aiotlab.edu.vn",
        "https://dtn-api.aiotlab.edu.vn",
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Tạm thời cho phép tất cả để test Swagger
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(morgan("dev")); // hiên thị log request
// morgan("combined");
// morgan("common");
// morgan("short");
// morgan("tiny");

app.use(
  helmet({
    contentSecurityPolicy: false, // Tắt CSP cho Swagger UI
    crossOriginEmbedderPolicy: false,
  })
); // bảo mật ứng dụng bằng cách thiết lập các tiêu đề HTTP

app.use(compression()); // nén response để giảm băng thông

// parse JSON body
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Serve uploaded files (static files)
// Files sẽ được truy cập qua: http://localhost:3055/uploads/folder/filename.ext
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// init db
// require("./dbs/init.mongodb");
// const { checkOverLoad } = require("./helpers/check.mongodb.connect");
// checkOverLoad();

require("./dbs/init.postgre");
const { checkOverLoad } = require("./helpers/check.postgre.connect");
checkOverLoad();

app.use("/api-docs", (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, max-age=0"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Swagger setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  })
);

// init routes
app.use("/", require("./routes"));

// hanlde errors

module.exports = app;
