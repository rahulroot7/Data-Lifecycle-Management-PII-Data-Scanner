import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import utility
from "../../services/utility";

// RUN SCAN
export const runScan =
createAsyncThunk(

  "scan/run",

  async (
    datasourceId,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.post(

          `scan/run/${datasourceId}`
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response.data
      );
    }
  }
);