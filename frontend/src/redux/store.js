import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import datasourceReducer from "./slice/datasource/datasourceSlice";
import scanReducer from "./slice/scan/scanSlice";
import findingReducer from "./slice/finding/findingSlice";
import dashboardReducer from "./slice/dashboard/dashboardSlice";
import healthReducer from "./slice/health/healthSlice";

const store =
configureStore({

  reducer: {

    auth: authReducer,
    datasource: datasourceReducer,
    scan: scanReducer,
    finding: findingReducer,
    dashboard: dashboardReducer,
    health: healthReducer,
  },
});

export default store;