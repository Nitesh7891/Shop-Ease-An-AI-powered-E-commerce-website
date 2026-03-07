import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Collections from "./pages/Collections";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { userDataContext } from "./context/userContext";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {

  const { userData } = useContext(userDataContext);

  return (
    <>
      {userData && <Navbar />}

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />

          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            }
          />

        </Routes>

      </GoogleOAuthProvider>
    </>
  );
}

export default App;

