import React, { useState } from "react";
import LoginAPI from "./LoginAPI";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginMessage, setLoginMessage] = useState("");
  const [APIDetailsLogin, setAPIDetailsLogin] = useState({
    email: "",
    pass: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    pass: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    setAPIDetailsLogin({ ...loginDetails });
  }

  const navigate = useNavigate();
  const goToResetScreen = (e) => {
    navigate("/accedi/password-dimenticata");
  };

  return (
    <>
      <div className='login container-form'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email'
          name='email'
          value={loginDetails.email}
          onChange={handleChange}
        />
        <label htmlFor='pass'>Password</label>
        <input
          id='pass'
          type='password'
          placeholder='Password'
          name='pass'
          value={loginDetails.pass}
          onChange={handleChange}
        />
        <input
          className='btn'
          type='submit'
          value='Login'
          onClick={handleSubmit}
        />
        <span className='span-error message-is-error'>{loginMessage}</span>
        <div
          className='cursor container-forgot-password'
          onClick={goToResetScreen}
        >
          Hai dimenticato la tua password?
        </div>
      </div>

      <LoginAPI
        APIDetailsLogin={APIDetailsLogin}
        setLoginMessage={setLoginMessage}
      />
    </>
  );
}

export default Login;
