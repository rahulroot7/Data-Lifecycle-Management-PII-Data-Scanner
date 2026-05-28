import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Datasource from "../pages/datasource/Datasource";
import Findings from "../pages/findings/Findings";
import ScanHistory from "../pages/scans/ScanHistory";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
        <Route
          path="/datasources"
          element={

            <ProtectedRoute>

              <Datasource />

            </ProtectedRoute>
          }
        />
        <Route
          path="/findings"
          element={

            <ProtectedRoute>

              <Findings />

            </ProtectedRoute>
          }
        />
        <Route
          path="/scan-history"
          element={

            <ProtectedRoute>

              <ScanHistory />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;