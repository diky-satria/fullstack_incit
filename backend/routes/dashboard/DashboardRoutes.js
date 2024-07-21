const {
  dashboard,
} = require("../../controllers/dashboard/DashboardController.js");
const VerifyUser = require("../../middleware/VerifyUser");
let router = require("express").Router();

router.get(`/api/dashboard`, VerifyUser, dashboard);

module.exports = router;
