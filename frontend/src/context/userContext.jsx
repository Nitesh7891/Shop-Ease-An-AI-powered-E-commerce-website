import { useContext, createContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {

      const response = await axios.get(
        serverUrl + "/api/user/getuser",
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        setUserData(null);
      }

    } catch (error) {

      // 401 means user not logged in → not an error
      if (error.response?.status !== 401) {
        console.log("Error fetching user data:", error.message);
      }

      setUserData(null);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  const values = {
    userData,
    setUserData,
    getCurrentUser,
    loading
  };

  return (
    <userDataContext.Provider value={values}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

