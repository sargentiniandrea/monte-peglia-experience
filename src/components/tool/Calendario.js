import { useEffect, useRef } from "react";
import { useToolContext } from "../../toolContext";
import { useAuthContext } from "../../authContext";
import SpanCalendario from "./SpanCalendario";
import moment from "moment";
import "moment/locale/it";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SaveCalendario from "./SaveCalendario";

function Calendario() {
  const navigate = useNavigate();
  const goToAuth = () => {
    closeCalendar();
    navigate("/accedi");
  };
  const {
    startDateSearch,
    endDateSearch,
    attivita,
    setAttivita,
    isCalendarOpen,
    closeCalendar,
  } = useToolContext();
  const { isUserLogged } = useAuthContext();

  const divRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      closeCalendar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (startDateSearch && endDateSearch) {
    const sortedArray = attivita.slice().sort((a, b) => a.ordine - b.ordine);

    let difference = endDateSearch.getTime() - startDateSearch.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    let startTime = startDateSearch.getTime() - 86400000;

    const arraySkeleton = ["Mattina", "Pomeriggio", "Sera"];

    let classe = "giorni-1";
    TotalDays > 0 && TotalDays < 9
      ? Array.from(Array(TotalDays), (e, i) => {
          classe = `giorni-${i + 1}`;
        })
      : (classe = "giorni-1");

    return (
      <div
        className={`${
          isCalendarOpen
            ? "overlay-calendario show-calendar"
            : "overlay-calendario"
        }`}
      >
        <div className='calendario' ref={divRef}>
          <div className='container'>
            <h2 className='calendar-title'>Calendario</h2>
            {isUserLogged ? (
              <SaveCalendario data={sortedArray} />
            ) : (
              <p className='gotologin-calendario pointer' onClick={goToAuth}>
                Accedi o Registrati per salvare il calendario
              </p>
            )}
            <div className='nav-toggler'>
              <button
                className='nav-icon-btn nav-toggler pointer'
                onClick={closeCalendar}
              >
                <RiCloseLine className='nav-icon' />
              </button>
            </div>
            <div className={`container-punti-giorni ${classe}`}>
              {TotalDays > 0 && TotalDays < 9
                ? Array.from(Array(TotalDays), (e, i) => {
                    startTime += 86400000;
                    let stringa = new Date(startTime);
                    let giorno = moment(stringa).format("DD");
                    let mese = moment(stringa).format("MMMM");
                    let anno = moment(stringa).format("YYYY");
                    let meseFormat =
                      mese.charAt(0).toUpperCase() + mese.slice(1);
                    let stringaFormatDate =
                      giorno + " " + meseFormat + " " + anno;
                    let stringaFormat = moment(stringa).format("dddd");
                    return (
                      <span key={i}>
                        <div className='header-span-calendario'>
                          <p>Giorno {i + 1}</p>
                          <small>
                            {stringaFormat} - {stringaFormatDate}
                          </small>
                        </div>

                        {arraySkeleton.map((skeleton, index) => {
                          const specificObject = sortedArray.find(
                            (item) =>
                              item.data === stringaFormatDate &&
                              item.periodo === skeleton
                          );

                          const isInteraGiornata = sortedArray.find(
                            (item) =>
                              item.data === stringaFormatDate &&
                              item.periodo === "Intera giornata"
                          );

                          if (specificObject) {
                            return (
                              <SpanCalendario
                                key={index + 1}
                                titolo={specificObject.titolo}
                                slug={specificObject.slug}
                                periodo={specificObject.periodo}
                                attivita={attivita}
                                setAttivita={setAttivita}
                                giorno={stringaFormatDate}
                                classe={""}
                              />
                            );
                          } else if (
                            isInteraGiornata &&
                            skeleton === "Mattina"
                          ) {
                            return (
                              <SpanCalendario
                                key={index + 1}
                                titolo={isInteraGiornata.titolo}
                                slug={isInteraGiornata.slug}
                                periodo={isInteraGiornata.periodo}
                                attivita={attivita}
                                setAttivita={setAttivita}
                                giorno={stringaFormatDate}
                                classe={"blocco-attivita-intera-giornata"}
                              />
                            );
                          } else if (
                            isInteraGiornata &&
                            skeleton === "Pomeriggio"
                          ) {
                            return null;
                          } else {
                            return (
                              <div
                                className='blocco-attivita blocco-att-skeleton'
                                key={index + 1}
                              >
                                <p>{skeleton}</p>
                              </div>
                            );
                          }
                        })}
                      </span>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Calendario;
