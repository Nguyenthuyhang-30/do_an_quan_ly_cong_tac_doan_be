const db = require("../models/postgreSQL");
const Cohort = db.Cohort;

// Lấy danh sách cohort
const getAllCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.findAll();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
