import React from "react";
import { formatArray } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";

function BoxAttivitaArchivio({ acf, slug, title }) {
  const navigate = useNavigate();
  const goToAttivita = (_slug) => {
    navigate(`/attivita/${_slug}`);
  };

  let classTipologia = acf.generali.tipologia ? acf.generali.tipologia : "";
  let classSport =
    acf.generali.tipologia === "sportiva" && acf.generali.sport
      ? acf.generali.sport
      : "";
  let classPrenotazione = acf.generali.prenotazione
    ? acf.generali.prenotazione
    : "";
  let classData = acf.generali.data ? acf.generali.data : "";

  return (
    <div
      className={`box-attivita ${classTipologia} ${classSport} ${classPrenotazione} ${classData}`}
    >
      <div
        className='img-attivita pointer'
        style={{
          backgroundImage: `url(${acf.immagine_attivita.sizes.medium_large})`,
        }}
        onClick={() => goToAttivita(slug)}
      >
        {acf.categorie_attivita ? (
          <span className='category-attivita'>
            {formatArray(acf.categorie_attivita, "compatta")}
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
          {acf.generali.data === "singola_data" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' />{" "}
              {acf.dettagli.singola_data}
            </p>
          ) : acf.generali.data === "ricorrente" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Ogni{" "}
              {formatArray(acf.dettagli.data_ricorrente)}
            </p>
          ) : (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Attività libera
            </p>
          )}
        </div>
        {acf.dettagli.durata_specifica && acf.dettagli.durata ? (
          <div className='durata-attivita'>
            <p>
              <FaHourglassHalf className='icon-durata' /> Durata:{" "}
              {acf.dettagli.durata} ore ca.
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
