const mongoose = require("mongoose");

const findingSchema =
new mongoose.Schema({

  sourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DataSource",
  },
  scanRunId: {
    type:
      mongoose.Schema.Types.ObjectId,

    ref: "ScanRun",
  },

  databaseType: String,

  schemaName: String,

  tableName: String,

  columnName: String,

  collectionName: String,

  fieldPath: String,

  piiType: String,

  confidence: Number,

  sampleValue: String,

  detectionReason: String,

  reviewStatus: {
    type: String,

    enum: [
      "PENDING",
      "CONFIRMED",
      "REJECTED",
    ],

    default: "PENDING",
  },

  reviewNote: String,

  }, 
  {
    timestamps: true,
  });

  findingSchema.index({
    sourceId: 1,
  });

  findingSchema.index({
    piiType: 1,
  });

  findingSchema.index({
    reviewStatus: 1,
  });
module.exports = mongoose.model(
  "Finding",
  findingSchema
);