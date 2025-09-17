/**
 * @swagger
 * tags:
 *   name: Cohorts
 *   description: Cohort management API
 *
 * /cohort/get-all:
 *   get:
 *     summary: Lấy tất cả cohort
 *     description: Retrieve all cohorts without pagination
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: Successfully retrieved all cohorts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortArrayResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /cohort/get-list:
 *   get:
 *     summary: Lấy danh sách cohort có phân trang
 *     description: Retrieve cohorts with pagination and search functionality
 *     tags: [Cohorts]
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Successfully retrieved cohort list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortListResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /cohort/get-select:
 *   get:
 *     summary: Lấy danh sách cohort cho dropdown/select
 *     description: Retrieve simplified cohort data for dropdown/select components
 *     tags: [Cohorts]
 *     responses:
 *       200:
 *         description: Successfully retrieved cohort select options
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortSelectResponse'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /cohort/{id}:
 *   get:
 *     summary: Lấy cohort theo ID
 *     description: Retrieve a specific cohort by its ID
 *     tags: [Cohorts]
 *     parameters:
 *       - $ref: '#/components/parameters/CohortId'
 *     responses:
 *       200:
 *         description: Successfully retrieved cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Cập nhật cohort theo ID
 *     description: Update an existing cohort by its ID
 *     tags: [Cohorts]
 *     parameters:
 *       - $ref: '#/components/parameters/CohortId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CohortUpdate'
 *           examples:
 *             updateCohort:
 *               summary: Example cohort update
 *               value:
 *                 code: "WEB-2024-02"
 *                 name: "Advanced Web Development Bootcamp 2024"
 *                 start_year: 2024
 *                 end_year: 2024
 *                 modified_by: 1
 *     responses:
 *       200:
 *         description: Successfully updated cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa cohort theo ID
 *     description: Delete a specific cohort by its ID
 *     tags: [Cohorts]
 *     parameters:
 *       - $ref: '#/components/parameters/CohortId'
 *     responses:
 *       200:
 *         description: Successfully deleted cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 * /cohort:
 *   post:
 *     summary: Tạo cohort mới
 *     description: Create a new cohort
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CohortCreate'
 *           examples:
 *             createCohort:
 *               summary: Example cohort creation
 *               value:
 *                 code: "WEB-2024-01"
 *                 name: "Web Development Bootcamp 2024"
 *                 start_year: 2024
 *                 end_year: 2024
 *                 created_by: 1
 *     responses:
 *       201:
 *         description: Successfully created cohort
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Xóa nhiều cohort
 *     description: Delete multiple cohorts by their IDs
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteManyRequest'
 *           examples:
 *             deleteMany:
 *               summary: Example delete multiple cohorts
 *               value:
 *                 ids: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Successfully deleted cohorts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */

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
