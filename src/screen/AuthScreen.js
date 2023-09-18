import React, { useEffect, useState } from "react";
import { ScrollToTop } from "../utils/helpers";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Profile from "../components/auth/Profile";
import Loader from "../components/Loader";
import { useAuthContext } from "../authContext";
import useLogged from "../useLogged";

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  useLogged();
  const {
    isUserLoading,
    setIsUserLoading,
    isUserError,
    userData,
    setIsUserLogged,
    isUserLogged,
  } = useAuthContext();

  let title = isUserLogged ? "Profilo" : "Accedi";
  return (
    <>
      <ScrollToTop />
      <Loader isLoading={isUserLoading} isError={isUserError} />
      <section className='page-section section-auth'>
        <div className='container'>
          <h1 className='page-title'>{title}</h1>
          {!isUserLoading ? (
            isUserLogged ? (
              <Profile
                data={userData}
                isUserLogged={isUserLogged}
                setIsUserLogged={setIsUserLogged}
                isUserLoading={isUserLoading}
              />
            ) : isUserError ? (
              <p>Errore</p>
            ) : (
              <>
                <div className='container-btns-auth'>
                  <button
                    className={activeTab === "login" ? "btn active" : "btn"}
                    onClick={() => handleActiveTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={
                      activeTab === "registrati" ? "btn active" : "btn"
                    }
                    onClick={() => handleActiveTab("registrati")}
                  >
                    Registrati
                  </button>
                </div>
                {activeTab === "login" ? <Login /> : <Signup />}
              </>
            )
          ) : null}
        </div>
      </section>
    </>
  );
};

export default AuthScreen;
