import React from "react";
import { useState } from "react";
import { useToolContext } from "../../toolContext";
import { useAuthContext } from "../../authContext";
import SpanCalendario from "../tool/SpanCalendario";
import moment from "moment";
import "moment/locale/it";
import { RiCloseLine } from "react-icons/ri";
import RemoveCalendario from "../tool/RemoveCalendario";

function ProfileCalendario({ dataCalendario, inizio, fine }) {
  const [emptyCalendario, setEmptyCalendario] = useState(false);
  const calendario = JSON.parse(dataCalendario);
  const {
    startDateSearch,
    endDateSearch,
    attivita,
    setAttivita,
    isCalendarOpen,
  } = useToolContext();
  const { isUserLogged } = useAuthContext();

  if (startDateSearch && endDateSearch && !emptyCalendario) {
    const sortedArray = calendario.slice().sort((a, b) => a.ordine - b.ordine);
    let difference = Number(fine) - Number(inizio);
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
          isCalendarOpen ? "calendario show-calendar" : "calendario"
        }`}
      >
        <div className='container'>
          <h2 className='calendar-title'>Calendario</h2>
          <div className={`container-punti-giorni ${classe}`}>
            {TotalDays > 0 && TotalDays < 9
              ? Array.from(Array(TotalDays), (e, i) => {
                  startTime += 86400000;
                  let stringa = new Date(startTime);
                  let giorno = moment(stringa).format("DD");
                  let mese = moment(stringa).format("MMMM");
                  let anno = moment(stringa).format("YYYY");
                  let meseFormat = mese.charAt(0).toUpperCase() + mese.slice(1);
                  let stringaFormatDate =
                    giorno + " " + meseFormat + " " + anno;
                  let stringaFormat = moment(stringa).format("dddd");
                  return (
                    <span key={i}>
                      <p className='header-span-calendario'>
                        Giorno {i + 1}
                        <br />
                        <small>
                          {stringaFormat} - {stringaFormatDate}
                        </small>
                      </p>

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
                              isSaved={true}
                            />
                          );
                        } else if (isInteraGiornata && skeleton === "Mattina") {
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
                              isSaved={true}
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
          <RemoveCalendario setEmptyCalendario={setEmptyCalendario} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ProfileCalendario;
