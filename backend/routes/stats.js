const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const StatsController = require("../controllers/statsController");

router.get(
  "/",
  protect,
  StatsController.stats
);

module.exports = router;