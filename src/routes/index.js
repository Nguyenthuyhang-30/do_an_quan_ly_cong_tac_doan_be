"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api", require("./access"));

router.use("/v1/api", require("./cohort"));

router.use("/v1/api", require("./youth_union_branch"));

router.use("/v1/api", require("./activity"));

router.use("/v1/api", require("./youth_union_member"));

router.use("/v1/api", require("./member_transfer"));

router.use("/v1/api", require("./member_role"));

router.use("/v1/api", require("./account"));

module.exports = router;
