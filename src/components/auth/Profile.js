import React from "react";
import Logout from "./Logout";
import Loader from "../Loader";
import ProfileCalendario from "./ProfileCalendario";

function Profile({ data, isUserLogged, isUserLoading, isUserError }) {
  return (
    <>
      <Loader isLoading={isUserLoading} isError={isUserError} />
      {!isUserLoading && isUserLogged ? (
        <>
          <p className='header-profilo'>
            Ciao,
            <br />
            {data.name}
          </p>
          <Logout />
          {data.meta.calendario ? (
            <ProfileCalendario
              dataCalendario={data.meta.calendario}
              inizio={data.meta.inizio}
              fine={data.meta.fine}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default Profile;
