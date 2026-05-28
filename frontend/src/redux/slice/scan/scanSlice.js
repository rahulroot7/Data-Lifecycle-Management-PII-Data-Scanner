import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  runScan,
} from "../../thunk/scanThunk";

const scanSlice =
createSlice({

  name: "scan",

  initialState: {

    scanData: null,

    isLoading: false,

    loadingId: null,

    isError: false,

    message: "",
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        // PENDING
        .addCase(

          runScan.pending,

          (
            state,
            action
          ) => {

            state.isLoading =
              true;

            state.loadingId =
              action.meta.arg;
          }
        )

        // SUCCESS
        .addCase(

          runScan.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.loadingId =
              null;

            state.scanData =
              action.payload;
          }
        )

        // ERROR
        .addCase(

          runScan.rejected,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.loadingId =
              null;

            state.isError =
              true;

            state.message =
              action.payload?.message;
          }
        );
    },
});

export default
scanSlice.reducer;