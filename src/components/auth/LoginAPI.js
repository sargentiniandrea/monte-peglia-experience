import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../authContext";

function LoginAPI({ APIDetailsLogin, setLoginMessage }) {
  const [urlToLogin, setUrlToLogin] = useState("");
  const { setIsUserLogged, setIsTokenPresent, setIsUserLoading } =
    useAuthContext();

  useEffect(() => {
    if (APIDetailsLogin.email.length > 0) {
      let formData = new FormData();
      formData.append("email", APIDetailsLogin.email);
      formData.append("password", APIDetailsLogin.pass);
      const url = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/auth&email=${APIDetailsLogin.email}&password=${APIDetailsLogin.pass}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["success"] === true) {
            localStorage.setItem("jwt", data["data"]["jwt"]);
            setUrlToLogin(
              `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/autologin&jwt=${data["data"]["jwt"]}`
            );
          } else if (data["code"] === "rest_no_route") {
            setIsUserLoading(false);
            setLoginMessage("Errore");
          } else {
            setIsUserLoading(false);
            setLoginMessage(data["data"]["message"]);
          }
        });
    }
  }, [APIDetailsLogin]);

  useEffect(() => {
    if (urlToLogin.length > 0) {
      setIsUserLoading(true);
      fetch(urlToLogin, {
        method: "GET",
      }).then((response) => {
        if (response.status == "200") {
          setIsTokenPresent(true);
          setIsUserLogged(true);
          window.location.replace("/accedi");
        } else {
          setLoginMessage("Errore");
        }
      });
    }
  }, [urlToLogin]);

  return <></>;
}

export default LoginAPI;
