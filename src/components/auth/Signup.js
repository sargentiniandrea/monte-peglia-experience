import React, { useState } from "react";
import SignupAPI from "./SignupAPI";

function Signup() {
  const [signupMessage, setSignupMessage] = useState("");
  const [APIDetailsSignup, setAPIDetailsSignup] = useState({
    email: "",
    pass: "",
  });
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    pass: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    setAPIDetailsSignup({ ...signupDetails });
  }
  return (
    <>
      <div className='login container-form'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email'
          name='email'
          value={signupDetails.email}
          onChange={handleChange}
        />
        <label htmlFor='pass'>Password</label>
        <input
          id='pass'
          type='password'
          placeholder='Password'
          name='pass'
          value={signupDetails.pass}
          onChange={handleChange}
        />
        <input
          disabled={
            signupDetails.email.length < 1 || signupDetails.pass.length < 3
              ? true
              : false
          }
          className='btn'
          type='submit'
          value='Registrati'
          onClick={handleSubmit}
        />
        <span className='span-error message-is-error'>{signupMessage}</span>
      </div>

      <SignupAPI
        APIDetailsSignup={APIDetailsSignup}
        setSignupMessage={setSignupMessage}
      />
    </>
  );
}

export default Signup;
