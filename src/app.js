require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./configs/swagger.config");

const PORT = process.env.DEV_APP_PORT || 3055;

// init middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3052",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "https://dtn.aiotlab.edu.vn",
      "https://admin.dtn.aiotlab.edu.vn",
      "https://dtn-api.aiotlab.edu.vn",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require("./dbs/init.postgre");
const { checkOverLoad } = require("./helpers/check.postgre.connect");
checkOverLoad();

//  Middleware để disable cache cho Swagger UI
app.use("/api-docs", (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Swagger setup với custom options
const swaggerOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    // Force no cache
    tryItOutEnabled: true,
  },
  customCss: `
    .swagger-ui .topbar { display: none }
  `,
  customSiteTitle: "YouthBranch API Documentation",
  customfavIcon: "/favicon.ico",
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

// init routes
app.use("/", require("./routes"));

// hanlde errors

module.exports = app;
