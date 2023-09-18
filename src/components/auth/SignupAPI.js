import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../authContext";

function SignupAPI({ APIDetailsSignup, setSignupMessage }) {
  const [urlToLogin, setUrlToLogin] = useState("");
  const { setIsUserLogged, setIsTokenPresent, setIsUserLoading } =
    useAuthContext();

  useEffect(() => {
    if (APIDetailsSignup.email.length > 0) {
      let formData = new FormData();
      formData.append("email", APIDetailsSignup.email);
      formData.append("password", APIDetailsSignup.pass);
      const url = `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/users&email=${APIDetailsSignup.email}&password=${APIDetailsSignup.pass}`;
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
          } else if (data["code"] === "rest_no_route") {
            setIsUserLoading(false);
            setSignupMessage("Errore");
            console.log(data);
          } else {
            setIsUserLoading(false);
            setSignupMessage(data["data"]["message"]);
            console.log(data);
          }
        });
    }
  }, [APIDetailsSignup]);

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
          setSignupMessage("Errore");
        }
      });
    }
  }, [urlToLogin]);

  return <></>;
}

export default SignupAPI;
