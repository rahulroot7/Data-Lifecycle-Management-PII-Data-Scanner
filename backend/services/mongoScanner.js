const { MongoClient } =
require("mongodb");

const Finding =
require("../models/Finding");

const {
  detectPII,
} = require("./piiDetector");

const {
  maskValue,
} = require("./maskData");

const flattenObject = (
  obj,
  prefix = ""
) => {

  let result = {};

  for (const key in obj) {

    const value =
      obj[key];

    const newKey =
      prefix
        ? `${prefix}.${key}`
        : key;

    if (

      typeof value ===
      "object"

      &&

      value !== null

      &&

      !Array.isArray(value)
    ) {

      Object.assign(

        result,

        flattenObject(
          value,
          newKey
        )
      );

    } else {

      result[newKey] =
        value;
    }
  }

  return result;
};

const scanMongo =
async (
  source,
  scanRun
) => {

  const client =
    new MongoClient(
      source.mongoUri
    );

  try {

    await client.connect();

    console.log(
      "Mongo Connected"
    );

    const db =
      client.db();

    const collections =
      await db
        .listCollections()
        .toArray();

    console.log(
      "Collections:",
      collections
    );

    // LOOP COLLECTIONS
    for (
      const collection
      of collections
    ) {

      console.log(
        "Scanning Collection:",
        collection.name
      );

      scanRun.logs.push(
        `Scanning ${collection.name}`
      );

      await scanRun.save();

      // GET DOCUMENTS
      const docs =
        await db
          .collection(
            collection.name
          )
          .find({})
          .limit(10)
          .toArray();

      // LOOP DOCS
      for (
        const doc
        of docs
      ) {

        const flatDoc =
          flattenObject(doc);

        // LOOP FIELDS
        for (
          const field
          in flatDoc
        ) {

          const value =
            flatDoc[field];

          // SKIP EMPTY
          if (

            value === null ||

            value === undefined ||

            value === ""
          ) {

            continue;
          }

          // DETECT PII
          const pii =
            detectPII(
              field,
              value
            );

          // SKIP
          if (!pii) {
            continue;
          }

          console.log({
            field,
            value,
            pii,
          });

          // DUPLICATE CHECK
          const exists =
            await Finding.findOne({

              sourceId:
                source._id,

              collectionName:
                collection.name,

              fieldPath:
                field,

              piiType:
                pii.type,
            });

          if (exists) {
            continue;
          }

          // CREATE FINDING
          await Finding.create({

            sourceId:
              source._id,

            scanRunId:
              scanRun._id,

            databaseType:
              "MONGODB",

            collectionName:
              collection.name,

            fieldPath:
              field,

            piiType:
              pii.type,

            confidence:
              pii.confidence,

            sampleValue:
              maskValue(value),

            detectionReason:
              pii.reason,
          });

          console.log(
            "Finding Created"
          );

          scanRun.totalFindings += 1;

          await scanRun.save();
        }
      }
    }

    scanRun.status =
      "COMPLETED";

    scanRun.completedAt =
      new Date();

    scanRun.logs.push(
      "Scan completed"
    );

    await scanRun.save();

    await client.close();

  } catch (error) {

    console.log(error);

    scanRun.status =
      "FAILED";

    scanRun.logs.push(
      error.message
    );

    await scanRun.save();

    throw error;
  }
};

module.exports = {
  scanMongo,
};