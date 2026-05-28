import { createSlice } from "@reduxjs/toolkit";
import {

  loginAdmin,

  registerAdmin,

  logoutAdmin,

} from "../../thunk/authThunk";

const authSlice =
createSlice({

  name: "auth",

  initialState: {

    user: null,

    isLoading: false,

    isError: false,

    success: false,

    message: "",
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        // LOGIN
        .addCase(

          loginAdmin.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          loginAdmin.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.success =
              true;

            state.user =
              action.payload.user;
          }
        )

        .addCase(

          loginAdmin.rejected,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.isError =
              true;

            state.message =
              action.payload.message;
          }
        )

        // REGISTER
        .addCase(

          registerAdmin.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          registerAdmin.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.success =
              true;
          }
        )

        .addCase(

          registerAdmin.rejected,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.isError =
              true;

            state.message =
              action.payload.message;
          }
        )

        // LOGOUT
        .addCase(

          logoutAdmin.fulfilled,

          (state) => {

            state.user =
              null;
          }
        );
    },
});

export default
authSlice.reducer;