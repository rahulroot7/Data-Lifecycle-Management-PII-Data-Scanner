import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import utility
from "../../services/utility";

// GET FINDINGS
export const getFindings =
createAsyncThunk(

  "finding/list",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.get(
          "finding/list"
        );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response.data
      );
    }
  }
);