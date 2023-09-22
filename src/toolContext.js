import { useState, useContext, createContext } from "react";

const ToolContext = createContext();

const ToolProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(
    localStorage.getItem("start")
      ? new Date(localStorage.getItem("start"))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("end")
      ? new Date(localStorage.getItem("end"))
      : new Date()
  );

  const [startDateSearch, setStartDateSearch] = useState(
    localStorage.getItem("start-search")
      ? new Date(localStorage.getItem("start-search"))
      : false
  );
  const [endDateSearch, setEndDateSearch] = useState(
    localStorage.getItem("end-search")
      ? new Date(localStorage.getItem("end-search"))
      : false
  );

  const [attivita, setAttivita] = useState(
    localStorage.getItem("attivita")
      ? JSON.parse(localStorage.getItem("attivita"))
      : []
  );

  const [isReset, setIsResect] = useState(
    localStorage.getItem("is-reset")
      ? JSON.parse(localStorage.getItem("is-reset"))
      : []
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [calendarAnimation, setCalendarAnimation] = useState(0);

  const resetAll = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setStartDateSearch(false);
    setEndDateSearch(false);
    setAttivita([]);
    setIsResect(true);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <ToolContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        startDateSearch,
        setStartDateSearch,
        endDateSearch,
        setEndDateSearch,
        attivita,
        setAttivita,
        isReset,
        setIsResect,
        resetAll,
        isCalendarOpen,
        setIsCalendarOpen,
        openCalendar,
        closeCalendar,
        calendarAnimation,
        setCalendarAnimation,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

const useToolContext = () => {
  return useContext(ToolContext);
};

export { ToolProvider, useToolContext };
