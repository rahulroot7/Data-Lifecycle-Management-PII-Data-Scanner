const DataSource = require("../models/DataSource");
const Finding = require("../models/Finding");
const ScanRun = require("../models/ScanRun");

const summary = async (
  req,
  res
) => {

  try {

    const totalSources =
      await DataSource.countDocuments();

    const totalFindings =
      await Finding.countDocuments();

    const confirmed =
      await Finding.countDocuments({

        reviewStatus:
          "CONFIRMED",
      });

    const pending =
      await Finding.countDocuments({

        reviewStatus:
          "PENDING",
      });

    const scans =
      await ScanRun.countDocuments();

    return res.status(200).json({

      success: true,

      summary: {

        totalSources,

        totalFindings,

        confirmed,

        pending,

        scans,
      },
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
  summary,
};