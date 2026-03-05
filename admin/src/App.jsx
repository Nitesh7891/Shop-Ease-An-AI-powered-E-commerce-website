import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";

function App() {

  const { adminData, loading } = useContext(adminDataContext);

if (loading) {
  return <div>Loading...</div>;
}

return (
  <>
    {!adminData ? (
      <Login />
    ) : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/lists" element={<List />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    )}
  </>
);
}

export default App;