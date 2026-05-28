const { Client } = require("pg");
const { MongoClient } = require("mongodb");
const DataSource = require("../models/DataSource");
const {logActivity} = require("../utils/activityLogger");

// CREATE DATASOURCE
const create = async (req, res) => {
  try {

    const payload = {
      ...req.body,
    };

    // ENCRYPT POSTGRES PASSWORD
  payload.password = payload.password;

    if (
        payload.mongoUri
      ) {

        payload.mongoUri =
          payload.mongoUri;
      }

    // CREATE SOURCE
    const source =
      await DataSource.create(
        payload
      );
      await logActivity(

      req.user._id,

      "CREATE",

      "DATASOURCE",

      `Datasource ${source.name} created`
    );
    return res.status(201).json({

      success: true,

      message:
        "Datasource created successfully",

      source,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// LIST DATASOURCES
const list = async (
  req,
  res
) => {

  try {

    const sources =
      await DataSource.find()
      .sort({
        createdAt: -1,
      });

    // HIDE SENSITIVE DATA
    const safeSources =
      sources.map((item) => {

        return {

          _id: item._id,

          name: item.name,

          type: item.type,

          host: item.host,

          port: item.port,

          database:
            item.database,

          username:
            item.username,

          status:
            item.status,

          createdAt:
            item.createdAt,
        };
      });

    return res.status(200).json({

      success: true,

      sources:
        safeSources,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// TEST CONNECTION
const testConnection = async (req, res) => {
  try {

    // POSTGRES
    console.log(req.body.type)
    if (
      req.body.type === "POSTGRES"
    ) {

      const client =
        new Client({

          host:
            req.body.host,

          port:
            req.body.port,

          database:
            req.body.database,

          user:
            req.body.username,

          password:
            req.body.password,
        });

      await client.connect();

      await client.end();
    }

    // MONGODB
    if (
      req.body.type ===
      "MONGODB"
    ) {

      const client =
        new MongoClient(
          req.body.mongoUri
        );

      await client.connect();

      await client.close();
    }

    return res.status(200).json({

      success: true,

      message:
        "Connection successful",
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        error.message,
    });
  }
};

// DELETE DATASOURCE
const remove = async (req, res) => {
  try {

    const source =
      await DataSource.findById(
        req.params.id
      );

    if (!source) {

      return res.status(404).json({

        success: false,

        message:
          "Datasource not found",
      });
    }

    await source.deleteOne();
    source.isDeleted = true;

    await source.save();
    return res.status(200).json({

      success: true,

      message:
        "Datasource deleted successfully",
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
  create,
  list,
  testConnection,
  remove,
};