import { useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import axios from "axios";

const useLogged = () => {
  const {
    setIsTokenPresent,
    isTokenPresent,
    setIsUserLoading,
    isUserLoading,
    setIsUserError,
    isUserLogged,
    setIsUserLogged,
    setUserData,
    userId,
  } = useAuthContext();
  const [userResponse, setUserResponse] = useState([]);

  useEffect(() => {
    if (isTokenPresent) {
      setIsUserError(false);
      setUserData([]);
      let userJWT = localStorage.getItem("jwt") || "";
      if (userJWT.length > 0) {
        let url = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${userJWT}`;
        (async () => {
          setIsUserError(false);
          try {
            let response = await axios.get(`${url}`);
            setUserResponse(response.data.data.user);
            localStorage.setItem("userId", response.data.data.user.ID);
            localStorage.setItem("isLogged", true);
            setIsUserLogged(true);
          } catch (error) {
            setIsUserError(true);
            setIsUserLogged(false);
          }
        })();
      }
    } else {
      setIsTokenPresent(false);
      setIsUserLogged(false);
      setIsUserLoading(false);
      setIsUserError(false);
    }
  }, [isTokenPresent]);

  useEffect(() => {
    if (isUserLogged) {
      setIsUserLoading(true);
      const id = localStorage.getItem("userId")
        ? localStorage.getItem("userId")
        : userResponse.ID;
      let urlUser = `https://backend.andreasargentini.com/wp-json/wp/v2/users/${id}`;
      (async () => {
        try {
          const response = await axios.get(urlUser);
          setUserData(response.data);
          setIsUserLoading(false);
        } catch (error) {
          setIsUserLoading(false);
          setIsUserError(true);
        }
      })();
    }
  }, [isUserLogged]);

  return <></>;
};

export default useLogged;
