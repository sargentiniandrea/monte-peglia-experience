import React, { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../authContext";

function Logout() {
  const { setIsUserLogged, setIsUserLoading, setServerMessage, serverMessage } =
    useAuthContext();
  const jwt = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : false;

  const handleLogout = async () => {
    if (jwt) {
      try {
        await axios.post(
          `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT=${jwt}`
        );
        setIsUserLoading(true);
        setTimeout(function () {
          setIsUserLogged(false);
          localStorage.removeItem("jwt");
          localStorage.removeItem("userId");
          localStorage.removeItem("isLogged");
          window.location.replace("/accedi");
        }, 400);
      } catch (error) {
        setServerMessage("Errore");
      }
    }
  };

  return (
    <>
      <button className='btn btn-logout' onClick={handleLogout}>
        Logout
      </button>
      <span className='span-error message-is-error'>{serverMessage}</span>
    </>
  );
}

export default Logout;
