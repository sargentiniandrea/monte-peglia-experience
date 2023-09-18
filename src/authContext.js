import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isTokenPresent, setIsTokenPresent] = useState(
    localStorage.getItem("jwt") ? true : false
  );

  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );

  const [isUserLogged, setIsUserLogged] = useState(
    localStorage.getItem("isLogged") ? true : false
  );

  const [serverMessage, setServerMessage] = useState(false);

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isUserError, setIsUserError] = useState(false);
  const [userResponse, setUserResponse] = useState([]);
  const [userData, setUserData] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        isTokenPresent,
        setIsTokenPresent,
        serverMessage,
        setServerMessage,
        isUserLoading,
        setIsUserLoading,
        isUserError,
        setIsUserError,
        isUserLogged,
        setIsUserLogged,
        userResponse,
        setUserResponse,
        userData,
        setUserData,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
