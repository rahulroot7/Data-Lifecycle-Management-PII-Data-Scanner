import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import utility
from "../../services/utility";

// HEALTH CHECK
export const getHealthStatus =
createAsyncThunk(

  "health/status",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.get(
          "health"
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response?.data
      );
    }
  }
);