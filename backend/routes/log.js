const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const LogController = require("../controllers/logController");

router.get(
  "/:id",
  protect,
  LogController.logs
);

module.exports = router;