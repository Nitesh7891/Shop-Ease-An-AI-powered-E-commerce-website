import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {

  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}

      <Route
        path="/"
        element={
          <AdminProtectedRoute>
            <Home />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <AdminProtectedRoute>
            <Add />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/lists"
        element={
          <AdminProtectedRoute>
            <List />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <AdminProtectedRoute>
            <Orders />
          </AdminProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
