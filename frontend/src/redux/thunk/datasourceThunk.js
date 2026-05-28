import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import utility
from "../../services/utility";

// CREATE DATASOURCE
export const createDatasource =
createAsyncThunk(

  "datasource/create",

  async (
    payload,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.post(

          "datasource/create",

          payload
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response.data
      );
    }
  }
);

// GET DATASOURCES
export const getDatasources =
createAsyncThunk(

  "datasource/list",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.get(
          "datasource/list"
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response.data
      );
    }
  }
);