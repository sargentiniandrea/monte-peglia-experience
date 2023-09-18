import React from "react";
import axios from "axios";
import { useState } from "react";

function RemoveCalendario({ setEmptyCalendario }) {
  const jwt = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : false;
  const [profileCalendarMessage, setProfileCalendarMessage] = useState("");

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleRemoveCalendario = async () => {
    const id = localStorage.getItem("userId");
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    };
    const meta = {
      meta: {
        calendario: "",
        inizio: "",
        fine: "",
      },
    };
    if (jwt) {
      try {
        await axios.post(
          `https://backend.andreasargentini.com/wp-json/wp/v2/users/${id}`,
          meta,
          { headers: headers }
        );
        scrollTop();
        setEmptyCalendario(true);
      } catch (error) {
        setProfileCalendarMessage("Errore");
      }
    }
  };

  return (
    <>
      <button className='btn btn-danger' onClick={handleRemoveCalendario}>
        Rimuovi
      </button>
      <p className='message-is-error centered'>{profileCalendarMessage}</p>
    </>
  );
}

export default RemoveCalendario;
