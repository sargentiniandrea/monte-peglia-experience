import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../authContext";
import { useParams } from "react-router-dom";
import { ScrollToTop } from "../utils/helpers";

function ResetPasswordScreen() {
  const [resetPasswordValue, setResetPasswordValue] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const { email, code } = useParams();

  function handleChange(e) {
    const { name, value } = e.target;
    setResetPasswordValue(value);
  }

  const { setIsUserLogged, setIsUserLoading, isUserLoading, isUserError } =
    useAuthContext();
  const jwt = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : false;

  const handleResetPassword = async () => {
    if (!jwt) {
      try {
        await axios.put(
          `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/user/reset_password&email=${email}&code=${code}&new_password=${resetPasswordValue}`
        );
        setResetPasswordMessage("Password reimpostata con successo");
      } catch (error) {
        setResetPasswordMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <section className='page-section section-auth'>
        <div className='container'>
          <h1 className='page-title'>Reset Password</h1>
          <p>
            Inserisci la tua nuova password e clicca su 'Invia' per
            reimpostarla.
          </p>
          <div className='login container-form'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={resetPasswordValue}
              onChange={handleChange}
            />
            <button className='btn' onClick={handleResetPassword}>
              Invia
            </button>
            {resetPasswordMessage === "Password reimpostata con successo" ? (
              <p>{resetPasswordMessage}</p>
            ) : (
              <p className='message-is-error'>{resetPasswordMessage}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPasswordScreen;
