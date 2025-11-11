"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./access"));

router.use("/v1/api", require("./cohort"));

router.use("/v1/api", require("./youth_union_branch"));

router.use("/v1/api", require("./activity"));

module.exports = router;
