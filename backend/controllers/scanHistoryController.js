const ScanRun = require("../models/ScanRun");

const history = async (req, res) => {
  try {

    const scans =
      await ScanRun.find()
      .populate("sourceId")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({

      success: true,

      scans,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {
  history,
};