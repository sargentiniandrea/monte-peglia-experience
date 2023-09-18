import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../authContext";

function ForgotPasswordAPI({ APIDetailsSignup }) {
  const [urlToLogin, setUrlToLogin] = useState("");
  const { setIsTokenPresent, setServerMessage, setIsUserLoading } =
    useAuthContext();

  useEffect(() => {
    if (APIDetailsSignup.email.length > 0) {
      let formData = new FormData();
      formData.append("email", APIDetailsSignup.email);
      formData.append("password", APIDetailsSignup.pass);
      const url = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/users&email=${APIDetailsSignup.email}&password=${APIDetailsSignup.pass}`;
      setIsUserLoading(true);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["success"] === true) {
            localStorage.setItem("jwt", data["jwt"]);
            setUrlToLogin(
              `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/autologin&jwt=${data["jwt"]}`
            );
          } else {
            setServerMessage(data["data"]["message"]);
          }
        });
    }
  }, [APIDetailsSignup]);

  useEffect(() => {
    if (urlToLogin.length > 0) {
      fetch(urlToLogin, {
        method: "GET",
      }).then((response) => {
        if (response.status == "200") {
          setIsTokenPresent(true);
          setIsUserLoading(true);
          window.location.replace("/accedi");
        } else {
          console.log("error");
        }
      });
    }
  }, [urlToLogin]);

  return <></>;
}

export default ForgotPasswordAPI;
