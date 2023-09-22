import { useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import axios from "axios";

const useLogged = () => {
  const {
    setIsTokenPresent,
    isTokenPresent,
    setIsUserLoading,
    setIsUserError,
    isUserLogged,
    setIsUserLogged,
    setUserData,
  } = useAuthContext();
  const [userResponse, setUserResponse] = useState([]);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isTokenPresent) {
      setUserData([]);
      let userJWT = localStorage.getItem("jwt") || "";
      if (userJWT.length > 0) {
        let url = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${userJWT}`;
        (async () => {
          try {
            let response = await axios.get(`${url}`);
            setUserResponse(response.data.data.user);
            localStorage.setItem("userId", response.data.data.user.ID);
            localStorage.setItem("isLogged", true);
            setIsUserLogged(true);
          } catch (error) {
            console.log(error);
            if (error.response.data.data.errorCode === 14) {
              setIsExpired(true);
            } else {
              setIsUserError(true);
              setIsUserLogged(false);
              localStorage.removeItem("jwt");
              localStorage.removeItem("userId");
              localStorage.removeItem("isLogged");
            }
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

  useEffect(() => {
    if (isExpired) {
      setIsUserLoading(true);
      const userJWT = localStorage.getItem("jwt");
      let urlRefresh = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT=${userJWT}`;
      (async () => {
        try {
          const response = await axios.get(urlRefresh);
          setIsUserLoading(false);
          console.log(response);
        } catch (error) {
          setIsUserLoading(false);
          setIsUserError(true);
          setIsUserLogged(false);
          localStorage.removeItem("jwt");
          localStorage.removeItem("userId");
          localStorage.removeItem("isLogged");
        }
      })();
    }
  }, [isExpired]);

  return <></>;
};

export default useLogged;
