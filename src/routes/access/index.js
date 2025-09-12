"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

// signup route

router.post("/ecommerce/signup", accessController.signUp);

// router.post("/ecommerce/signup", (req, res, next) => {
//   const { name, email, password } = req.body;

//   return res.status(201).json({
//     message: "User signed up successfully",
//     user: {
//       name,
//       email,
//     },
//   });
// });

module.exports = router;
