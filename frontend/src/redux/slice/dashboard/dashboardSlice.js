import {
  createSlice,
} from "@reduxjs/toolkit";

import {

  getDashboardStats,

  getDashboardSummary,

} from "../../thunk/dashboardThunk";

const dashboardSlice =
createSlice({

  name:
    "dashboard",

  initialState: {

    findings: [],

    datasources: [],

    summary: {

      totalSources: 0,

      totalFindings: 0,

      confirmed: 0,

      pending: 0,

      scans: 0,
    },

    isLoading: false,

    isError: false,
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        // DASHBOARD STATS
        .addCase(

          getDashboardStats.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          getDashboardStats.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.findings =
              action.payload.findings;

            state.datasources =
              action.payload.datasources;
          }
        )

        .addCase(

          getDashboardStats.rejected,

          (state) => {

            state.isLoading =
              false;

            state.isError =
              true;
          }
        )

        // DASHBOARD SUMMARY
        .addCase(

          getDashboardSummary.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          getDashboardSummary.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.summary =
              action.payload.summary;
          }
        )

        .addCase(

          getDashboardSummary.rejected,

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
dashboardSlice.reducer;