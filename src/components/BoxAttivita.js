import { useState, useRef, useEffect } from "react";
import { useToolContext } from "../toolContext";
import { useNavigate } from "react-router-dom";
import { formatArray } from "../utils/helpers";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";

function BoxAttivita({ ACF, slug, title, date }) {
  const { attivita, setAttivita } = useToolContext();

  const navigate = useNavigate();
  const goToAttivita = (_slug) => {
    navigate(`/attivita/${_slug}`);
  };

  const handleSetAttivita = (e) => {
    const objAttivita = {
      "data": date,
      "titolo": title.rendered,
      "slug": slug,
      "periodo": e.target.innerHTML,
      "ordine":
        e.target.innerHTML === "Mattina"
          ? 1
          : e.target.innerHTML === "Pomeriggio"
          ? 2
          : e.target.innerHTML === "Intera giornata"
          ? 3
          : e.target.innerHTML === "Sera"
          ? 4
          : null,
    };
    setAttivita([...attivita, objAttivita]);
  };

  const isPresentAttivita = attivita.some(
    (item) => item.data === date && item.titolo === title.rendered
  );
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);
  const buttonRef = useRef(null);

  const displayModal = () => {
    setShowModal(!showModal);
  };

  const handleOutsideClick = (event) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      event.target !== buttonRef.current
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className='box-attivita'>
      <div
        className='img-attivita pointer'
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
        <div className='titolo-attivita pointer'>
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
        {showModal && (
          <div className='modal-periodo-attivita' ref={divRef}>
            {ACF.periodo_giornata.map((periodoSearch, i) => {
              const specificObject = attivita.find(
                (item) =>
                  item.data === date &&
                  item.titolo === title.rendered &&
                  item.periodo === periodoSearch
              );
              const isPresentMattina = attivita.some(
                (item) => item.data === date && item.periodo === "Mattina"
              );
              const isPresentPomeriggio = attivita.some(
                (item) => item.data === date && item.periodo === "Pomeriggio"
              );
              const isPresentInteraGiornata = attivita.some(
                (item) =>
                  item.data === date && item.periodo === "Intera giornata"
              );
              const isPresentSera = attivita.some(
                (item) => item.data === date && item.periodo === "Sera"
              );

              if (specificObject) {
                return (
                  <button disabled key={i + 1}>
                    {periodoSearch}
                  </button>
                );
              } else if (
                isPresentMattina &&
                (periodoSearch === "Mattina" ||
                  periodoSearch === "Intera giornata")
              ) {
                return (
                  <button disabled key={i + 1}>
                    {periodoSearch}
                  </button>
                );
              } else if (
                isPresentPomeriggio &&
                (periodoSearch === "Pomeriggio" ||
                  periodoSearch === "Intera giornata")
              ) {
                return (
                  <button disabled key={i + 1}>
                    {periodoSearch}
                  </button>
                );
              } else if (
                isPresentInteraGiornata &&
                (periodoSearch === "Pomeriggio" ||
                  periodoSearch === "Mattina" ||
                  periodoSearch === "Intera giornata")
              ) {
                return (
                  <button disabled key={i + 1}>
                    {periodoSearch}
                  </button>
                );
              } else if (isPresentSera && periodoSearch === "Sera") {
                return (
                  <button disabled key={i + 1}>
                    {periodoSearch}
                  </button>
                );
              } else {
                return (
                  <button
                    key={i + 1}
                    onClick={(e) => {
                      handleSetAttivita(e);
                      setShowModal(false);
                    }}
                  >
                    {periodoSearch}
                  </button>
                );
              }
            })}
          </div>
        )}
        <div className='btns-attivita'>
          {isPresentAttivita ? (
            <button className='btn' disabled>
              Aggiungi
            </button>
          ) : (
            <button className='btn' ref={buttonRef} onClick={displayModal}>
              Aggiungi
            </button>
          )}
          <button className='btn' onClick={() => goToAttivita(slug)}>
            Dettagli
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoxAttivita;
