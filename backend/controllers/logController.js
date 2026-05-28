const ScanRun = require("../models/ScanRun");

const logs = async (
  req,
  res
) => {

  try {

    const scan =
      await ScanRun.findById(
        req.params.id
      );

    if (!scan) {

      return res.status(404).json({

        success: false,

        message:
          "Scan not found",
      });
    }

    return res.status(200).json({

      success: true,

      logs:
        scan.logs,
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
  logs,
};