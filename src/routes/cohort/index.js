"use strict";

const express = require("express");
const cohortController = require("../../controllers/cohort.controller");
const router = express.Router();

// GET routes
router.get("/cohort/get-all", cohortController.getAllCohorts);
router.get("/cohort/get-list", cohortController.getListCohorts);
router.get("/cohort/get-select", cohortController.getSelectCohorts);
router.get("/cohort/:id", cohortController.getCohortById);

// POST routes
router.post("/cohort", cohortController.createCohort);

// PUT routes
router.put("/cohort/:id", cohortController.updateCohort);

// DELETE routes
router.delete("/cohort/:id", cohortController.deleteCohort);
router.delete("/cohort", cohortController.deleteManyCohorts);

module.exports = router;
