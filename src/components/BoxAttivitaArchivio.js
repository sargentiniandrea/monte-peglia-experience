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
  return (
    <div className='box-attivita'>
      <div
        className='img-attivita'
        style={{
          backgroundImage: `url(${ACF.immagine_attivita.sizes.medium_large})`,
        }}
        onClick={() => goToAttivita(slug)}
      >
        <span className='category-attivita'>
          {formatArray(ACF.categoria_attivita, "compatta")}
        </span>
      </div>
      <div className='info-attivita'>
        <div className='titolo-attivita'>
          <h3 onClick={() => goToAttivita(slug)}>{title.rendered}</h3>
        </div>
        <div className='date-attivita'>
          {ACF.tipologia_attivita === "singola_data" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' />{" "}
              {ACF.singola_data}
            </p>
          ) : ACF.tipologia_attivita === "ricorrente" ? (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Ogni{" "}
              {formatArray(ACF.data_ricorrente)}
            </p>
          ) : (
            <p>
              <FaRegCalendarAlt className='icon-calendario' /> Attività libera
            </p>
          )}
        </div>
        <div className='durata-attivita'>
          <p>
            <FaHourglassHalf className='icon-durata' /> Durata: {ACF.durata} ore
            ca.
          </p>
        </div>

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
