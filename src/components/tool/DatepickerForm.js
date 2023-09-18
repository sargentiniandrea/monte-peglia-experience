import { useToolContext } from "../../toolContext";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
registerLocale("it", it);

function DatepickerForm() {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setStartDateSearch,
    setEndDateSearch,
    isReset,
    setIsResect,
    resetAll,
  } = useToolContext();

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  let difference =
    endDate.length > 0 && startDate.length > 0
      ? endDate.getTime() - startDate.getTime()
      : 0;
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return (
    <>
      <p>E' possibile selezionare un periodo massimo di 8 giorni.</p>
      <div className='container-search-eventi-form'>
        <div className='containerDatepicker'>
          <div className='cont-checkin-input'>
            <span>Check-In</span>
            <DatePicker
              minDate={new Date()}
              locale='it'
              dateFormat='dd MMMM yyyy'
              placeholderText='Arrivo'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              withPortal
            />
          </div>

          <div className='cont-checkout-input'>
            <span>Check-Out</span>
            <DatePicker
              minDate={startDate ? startDate : new Date()}
              locale='it'
              dateFormat='dd MMMM yyyy'
              placeholderText='Partenza'
              selected={
                endDate && startDate && endDate.getTime() <= startDate.getTime()
                  ? startDate
                  : TotalDays > 7
                  ? startDate
                  : endDate
              }
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              maxDate={
                startDate ? addDays(startDate, 7) : addDays(new Date(), 7)
              }
              withPortal
            />
          </div>
        </div>
        <div className='container-date-btns'>
          <button
            className={`reset-tool btn ${isReset ? "" : "open-reset-tool"}`}
            onClick={() => {
              resetAll();
              scrollTop();
            }}
          >
            Reset
          </button>
          <button
            className='search-eventi btn'
            onClick={() => {
              setStartDateSearch(startDate);
              setEndDateSearch(endDate);
              setIsResect(false);
            }}
          >
            Cerca
          </button>
        </div>
      </div>
    </>
  );
}

export default DatepickerForm;
