import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  getHealthStatus,
} from "../../thunk/healthThunk";

const healthSlice =
createSlice({

  name: "health",

  initialState: {

    server: "DOWN",

    isLoading: false,
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        .addCase(

          getHealthStatus.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          getHealthStatus.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.server =
              "UP";
          }
        )

        .addCase(

          getHealthStatus.rejected,

          (state) => {

            state.isLoading =
              false;

            state.server =
              "DOWN";
          }
        );
    },
});

export default
healthSlice.reducer;