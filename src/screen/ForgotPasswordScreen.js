import React from "react";
import { useState } from "react";
import axios from "axios";
import { ScrollToTop } from "../utils/helpers";

function ForgotPasswordScreen() {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setResetPasswordEmail(value);
  }

  const jwt = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : false;

  const handleResetPassword = async () => {
    if (!jwt) {
      try {
        await axios.post(
          `https://backend.andreasargentini.com/?rest_route=/simple-jwt-login/v1/user/reset_password&email=${resetPasswordEmail}`
        );
        setResetPasswordMessage("Email inviata con successo");
      } catch (error) {
        if (error.response.data.data.errorCode === 64) {
          setResetPasswordMessage(
            "Email non associata a nessun utente esistente."
          );
        } else {
          setResetPasswordMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <section className='page-section section-auth'>
        <div className='container'>
          <h1 className='page-title'>Password dimenticata</h1>
          <p>
            Inserisci la mail utilizzata in fase di registrazione, clicca su
            'Invia' e controlla la tua casella email.
          </p>
          <div className='login container-form'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='Email'
              name='email'
              value={resetPasswordEmail}
              onChange={handleChange}
            />
            <button className='btn' onClick={handleResetPassword}>
              Invia
            </button>
            {resetPasswordMessage === "Email inviata con successo" ? (
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

export default ForgotPasswordScreen;
