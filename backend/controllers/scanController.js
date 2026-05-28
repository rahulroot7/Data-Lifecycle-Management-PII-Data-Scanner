const DataSource = require("../models/DataSource");
const ScanRun = require("../models/ScanRun");
const { scanPostgres } = require("../services/postgresScanner");
const {scanMongo} = require("../services/mongoScanner");

const run = async (
  req,
  res
) => {

  let scanRun = null;

  try {

    const source =
      await DataSource.findById(
        req.params.id
      );
console.log("SOURCE:", source);
    if (!source) {

      return res.status(404).json({
        message:
          "Datasource not found",
      });
    }

    // CREATE SCAN RUN
    scanRun =
      await ScanRun.create({

        sourceId:
          source._id,

        status:
          "RUNNING",

        logs: [
          "Scan started",
        ],
      });

    // POSTGRES
    if (
      source.type ===
      "POSTGRES"
    ) {

      await scanPostgres(
        source,
        scanRun
      );
    }

    // MONGODB
    if (
      source.type ===
      "MONGODB"
    ) {

      await scanMongo(
        source,
        scanRun
      );
    }

    // COMPLETE
    scanRun.status =
      "COMPLETED";

    scanRun.completedAt =
      new Date();

    scanRun.logs.push(
      "Scan completed"
    );

    await scanRun.save();

    return res.status(200).json({

      success: true,

      message:
        "Scan completed",

      scanRun,
    });

  } catch (error) {

    if (scanRun) {

      scanRun.status =
        "FAILED";

      scanRun.errorMessage =
        error.message;

      scanRun.logs.push(
        error.message
      );

      await scanRun.save();
    }

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {run};