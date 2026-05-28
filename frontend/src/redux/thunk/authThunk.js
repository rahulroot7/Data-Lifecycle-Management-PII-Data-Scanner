import { createAsyncThunk } from "@reduxjs/toolkit";
import utility from "../../services/utility";

// LOGIN
export const loginAdmin =
createAsyncThunk(

  "admin/login",

  async (
    credentials,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.post(

          "auth/login",

          credentials
        );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response.data
      );
    }
  }
);

// REGISTER
export const registerAdmin =
createAsyncThunk(

  "admin/register",

  async (
    payload,
    thunkAPI
  ) => {

    try {

      const response =
        await utility.post(

          "auth/register",

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

// LOGOUT
export const logoutAdmin =
createAsyncThunk(

  "admin/logout",

  async () => {

    localStorage.removeItem(
      "token"
    );

    return true;
  }
);