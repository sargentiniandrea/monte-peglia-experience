import React from "react";
import { formatArray } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";

function BoxAttivitaArchivio({ ACF, slug, title }) {
  const navigate = useNavigate();
  const goToAttivita = (_slug) => {
    navigate(`/attivita/${_slug}`);
  };

  let classTipologia = ACF.generali.tipologia ? ACF.generali.tipologia : "";
  let classSport =
    ACF.generali.tipologia === "sportiva" && ACF.generali.sport
      ? ACF.generali.sport
      : "";
  let classPrenotazione = ACF.generali.prenotazione
    ? ACF.generali.prenotazione
    : "";
  let classData = ACF.generali.data ? ACF.generali.data : "";

  return (
    <div
      className={`box-attivita ${classTipologia} ${classSport} ${classPrenotazione} ${classData}`}
    >
      <div
        className='img-attivita pointer'
        style={{
          backgroundImage: `url(${ACF.immagine_attivita.sizes.medium_large})`,
        }}
        onClick={() => goToAttivita(slug)}
      >
        {ACF.categorie_attivita ? (
          <span className='category-attivita'>
            {formatArray(ACF.categorie_attivita, "compatta")}
          </span>
        ) : null}
      </div>
      <div className='info-attivita'>
        <div className='titolo-attivita pointer'>
          <h3
            onClick={() => goToAttivita(slug)}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          ></h3>
        </div>
        <div className='date-attivita'>
          {ACF.generali.data === "singola_data" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' />{" "}
              {ACF.dettagli.singola_data}
            </p>
          ) : ACF.generali.data === "ricorrente" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Ogni{" "}
              {formatArray(ACF.dettagli.data_ricorrente)}
            </p>
          ) : (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Attività libera
            </p>
          )}
        </div>
        {ACF.dettagli.durata_specifica && ACF.dettagli.durata ? (
          <div className='durata-attivita'>
            <p>
              <FaHourglassHalf className='icon-durata' /> Durata:{" "}
              {ACF.dettagli.durata} ore ca.
            </p>
          </div>
        ) : null}

        <div className='btns-attivita'>
          <button className='btn' onClick={() => goToAttivita(slug)}>
            Dettagli
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoxAttivitaArchivio;
