import React from "react";
import { useState } from "react";
import axios from "axios";

function SaveCalendario({ data }) {
  const jwt = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : false;
  const inizio = localStorage.getItem("start-search")
    ? new Date(localStorage.getItem("start-search"))
    : false;
  const fine = localStorage.getItem("end-search")
    ? new Date(localStorage.getItem("end-search"))
    : false;
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingError, setIsSavingError] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("Salva");

  const handleSaveCalendario = async () => {
    const id = localStorage.getItem("userId");
    const data2 = JSON.stringify(data);
    const start = JSON.stringify(inizio.getTime());
    const end = JSON.stringify(fine.getTime());
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    };
    const meta = {
      meta: {
        calendario: data2,
        inizio: start,
        fine: end,
      },
    };
    if (jwt) {
      setIsSaving(true);
      setSaveButtonText("Caricamento..");
      try {
        await axios.post(
          `https://backend.andreasargentini.com/wp-json/wp/v2/users/${id}`,
          meta,
          { headers: headers }
        );
        setIsSaving(false);
        setSaveButtonText("Salvato ✓");
      } catch (error) {
        setIsSaving(false);
        setIsSavingError(true);
        setSaveButtonText("Errore");
      }
    }
  };

  if (isSaving) {
    return <button className='btn'>{saveButtonText}</button>;
  } else if (isSavingError) {
    return (
      <button className='btn' onClick={handleSaveCalendario}>
        {saveButtonText}
      </button>
    );
  } else {
    return (
      <button className='btn' onClick={handleSaveCalendario}>
        {saveButtonText}
      </button>
    );
  }
}

export default SaveCalendario;
