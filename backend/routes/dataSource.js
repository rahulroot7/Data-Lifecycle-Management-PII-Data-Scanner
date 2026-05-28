const express = require("express");
const router = express.Router();
const {protect,} = require("../middleware/authMiddleware");

const DataSourceController = require("../controllers/dataSourceController");

router.post("/create", protect, DataSourceController.create);
router.get("/list",protect, DataSourceController.list);
router.post("/test", protect, DataSourceController.testConnection);
router.delete("/:id", protect, DataSourceController.remove);

module.exports = router;