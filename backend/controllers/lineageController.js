const Finding =
require("../models/Finding");

const map = async (
  req,
  res
) => {

  try {

    const findings =
      await Finding.find()
      .populate("sourceId");

    const lineage =
      findings.map((item) => {

        return {

          source:
            item.sourceId?.name,

          databaseType:
            item.databaseType,

          table:
            item.tableName,

          collection:
            item.collectionName,

          piiType:
            item.piiType,

          confidence:
            item.confidence,
        };
      });

    return res.status(200).json({

      success: true,

      lineage,
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
  map,
};