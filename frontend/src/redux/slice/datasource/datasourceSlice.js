import {
  createSlice,
} from "@reduxjs/toolkit";

import {

  createDatasource,

  getDatasources,

} from "../../thunk/datasourceThunk";

const datasourceSlice =
createSlice({

  name:
    "datasource",

  initialState: {

    datasources: [],

    isLoading: false,

    isError: false,

    message: "",
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

        // CREATE
        .addCase(

          createDatasource.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          createDatasource.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.datasources.push(
              action.payload.source
            );
          }
        )

        .addCase(

          createDatasource.rejected,

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

        // LIST
        .addCase(

          getDatasources.pending,

          (state) => {

            state.isLoading =
              true;
          }
        )

        .addCase(

          getDatasources.fulfilled,

          (
            state,
            action
          ) => {

            state.isLoading =
              false;

            state.datasources =
              action.payload.sources;
          }
        )

        .addCase(

          getDatasources.rejected,

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
        );
    },
});

export default
datasourceSlice.reducer;