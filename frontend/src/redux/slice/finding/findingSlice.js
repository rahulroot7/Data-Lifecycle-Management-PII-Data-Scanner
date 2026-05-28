import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  getFindings,
} from "../../thunk/findingThunk";

const findingSlice =
createSlice({

  name:
    "finding",

  initialState: {

    findings: [],

    isLoading: false,

    isError: false,
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        .addCase(

          getFindings.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          getFindings.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.findings =
              action.payload.findings;
          }
        )

        .addCase(

          getFindings.rejected,

          (state) => {

            state.isLoading =
              false;

            state.isError =
              true;
          }
        );
    },
});

export default
findingSlice.reducer;