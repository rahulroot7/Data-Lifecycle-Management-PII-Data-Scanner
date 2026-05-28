const { Client } =
require("pg");

const Finding =
require("../models/Finding");

const {
  detectPII,
} = require("./piiDetector");

const {
  maskValue,
} = require("./maskData");

const scanPostgres =
async (
  source,
  scanRun
) => {

  let client;

  try {

    // CONNECT DATABASE
    client =
      new Client({

        host:
          source.host,

        port:
          Number(
            source.port
          ),

        database:
          source.database,

        user:
          source.username,

        password:
          source.password,
      });

    await client.connect();

    console.log(
      "Postgres Connected"
    );
    await client.query(`
      SET search_path TO public
    `);
    const ipCheck =
  await client.query(`

    SELECT
      inet_server_addr(),
      inet_server_port()
  `);

  console.log(
    "SERVER:",
    ipCheck.rows
  );
    // DEBUG INFO
    const dbInfo =
      await client.query(`

        SELECT
          current_database(),
          version()
      `);

    console.log(
      "DB INFO:",
      dbInfo.rows
    );

    // GET ONLY PUBLIC TABLES
    const tables =
      await client.query(`

        SELECT
          tablename AS table_name

        FROM
          pg_catalog.pg_tables

        WHERE
          schemaname = 'public'
      `);

    console.log(
      "PUBLIC TABLES:",
      tables.rows
    );

    // NO TABLES
    if (
      tables.rows.length === 0
    ) {

      scanRun.logs.push(
        "No tables found"
      );

      scanRun.status =
        "COMPLETED";

      await scanRun.save();

      return;
    }

    // LOOP TABLES
    for (
      const table
      of tables.rows
    ) {

      const tableName =
        table.table_name;

      console.log(
        "Scanning Table:",
        tableName
      );

      // SOCKET EVENT
      if (global.io) {

        global.io.emit(
          "scan-progress",
          {
            message:
              `Scanning ${tableName}`,
          }
        );
      }

      // LOGS
      scanRun.logs.push(
        `Scanning ${tableName}`
      );

      await scanRun.save();

      // GET COLUMNS
      const columns =
        await client.query(`

          SELECT
            column_name

          FROM
            information_schema.columns

          WHERE
            table_name = $1
        `,
        [tableName]);

      // SAMPLE ROWS
      const sampleRows =
        await client.query(`

          SELECT *
          FROM "${tableName}"
          LIMIT 10
        `);

      // LOOP ROWS
      for (
        const row
        of sampleRows.rows
      ) {

        // LOOP COLUMNS
        for (
          const column
          of columns.rows
        ) {

          const field =
            column.column_name;

          const value =
            row[field];

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

          // SKIP IF NO PII
          if (!pii) {
            continue;
          }

          console.log({
            field,
            value,
            pii,
          });

          // CHECK DUPLICATE
          const exists =
            await Finding.findOne({

              sourceId:
                source._id,

              tableName:
                tableName,

              columnName:
                field,

              piiType:
                pii.type,
            });

          // SKIP DUPLICATE
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
              "POSTGRES",

            schemaName:
              "public",

            tableName:
              tableName,

            columnName:
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

          // INCREMENT TOTAL
          scanRun.totalFindings += 1;

          await scanRun.save();
        }
      }
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

    await client.end();

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
  scanPostgres,
};