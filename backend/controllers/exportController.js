const Finding = require("../models/Finding");
const {Parser} = require("json2csv");

const exportCSV =
async (req, res) => {

  try {

    const findings =
      await Finding.find();

    const fields = [

      "databaseType",

      "tableName",

      "collectionName",

      "fieldPath",

      "piiType",

      "confidence",

      "reviewStatus",
    ];

    const parser =
      new Parser({
        fields,
      });

    const csv =
      parser.parse(findings);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "findings.csv"
    );

    return res.send(csv);

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {
  exportCSV,
};