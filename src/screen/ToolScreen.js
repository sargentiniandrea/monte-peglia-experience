import { useEffect } from "react";
import { useToolContext } from "../toolContext";
import DatepickerForm from "../components/tool/DatepickerForm";
import Calendario from "../components/tool/Calendario";
import Elenco from "../components/tool/Elenco";
import { BsFillCalendarCheckFill } from "react-icons/bs";

const ToolScreen = () => {
  const {
    startDate,
    endDate,
    startDateSearch,
    endDateSearch,
    attivita,
    openCalendar,
    isReset,
    calendarAnimation,
    setCalendarAnimation,
  } = useToolContext();

  useEffect(() => {
    if (startDate) {
      localStorage.setItem("start", startDate.toString());
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      localStorage.setItem("end", endDate.toString());
    }
  }, [endDate]);

  useEffect(() => {
    localStorage.setItem("start-search", startDateSearch.toString());
  }, [startDateSearch]);

  useEffect(() => {
    localStorage.setItem("end-search", endDateSearch.toString());
  }, [endDateSearch]);

  useEffect(() => {
    localStorage.setItem("attivita", JSON.stringify(attivita));
  }, [attivita]);

  useEffect(() => {
    localStorage.setItem("is-reset", JSON.stringify(isReset));
  }, [isReset]);

  return (
    <>
      <section className='page-section tool-page'>
        <div className='container'>
          <h1 className='page-title'>Costruisci la tua esperienza</h1>
          <p className='incipit-tool'>
            Scegli le date, esplora le attività che puoi fare per ognuno dei
            giorni selezionati e pianifica il tuo calendario di attività!
          </p>
          <div className='header-form'>
            <DatepickerForm />
          </div>
          <div className='elenco-attivita'>
            <Elenco />
          </div>
          <Calendario />
          <div
            className={`btn-modal-calendario pointer ${
              isReset ? "" : "show-btn-modal-calendario"
            }`}
            onClick={openCalendar}
            calendaranimation={calendarAnimation}
            onAnimationEnd={() => setCalendarAnimation(0)}
          >
            <span>Calendario</span>
            <BsFillCalendarCheckFill />
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolScreen;
