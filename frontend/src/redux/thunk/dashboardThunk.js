import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import utility from "../../services/utility";

// DASHBOARD STATS
export const getDashboardStats =
createAsyncThunk(

  "dashboard/stats",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const findings =
        await utility.get(
          "finding/list"
        );

      const datasources =
        await utility.get(
          "datasource/list"
        );

      return {

        findings:
          findings.data.findings,

        datasources:
          datasources.data.sources,
      };

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response?.data
      );
    }
  }
);

// DASHBOARD SUMMARY
export const getDashboardSummary =
createAsyncThunk(

  "dashboard/summary",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.get(
          "dashboard/summary"
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response?.data
      );
    }
  }
);