import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./authContext";
import { useEffect,useState } from "react";
import axios from "axios";


export const userDataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/user/getuser", {
        withCredentials: true,
      });
      if (!response.data.success) {
        console.log("Failed to fetch user data");
        setUserData(null);
      } else {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
      setUserData(null);
    }
  };

  useEffect(() => {getCurrentUser()}, [serverUrl]);

  let values = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <div>
      <userDataContext.Provider value={values}>{children}</userDataContext.Provider>
    </div>
  );
}

export default UserContext;
