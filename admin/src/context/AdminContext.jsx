import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext";
import { useEffect } from "react";
import axios from "axios";

export const adminDataContext = createContext();

function AdminContext({ children }) {

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {

      let res = await axios.get(
        serverUrl + "/api/user/getadmin",
        { withCredentials: true }
      );

      if (res.data.success) {
        setAdminData(res.data.admin);
      } else {
        setAdminData(null);
      }
    } catch (error) {
      if (error.response?.status=== 401) {
      // user not logged in
      setAdminData(null);
    } else {
      console.log("Error fetching admin:", error);
    }
    }

    setLoading(false);
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const values = { adminData, setAdminData, getAdmin, loading };

  return (
    <adminDataContext.Provider value={values}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;