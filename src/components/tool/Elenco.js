import { useToolContext } from "../../toolContext";
import SliderAttivita from "./SliderAttivita";
import moment from "moment";
import "moment/locale/it";

function Elenco() {
  const { startDateSearch, endDateSearch, attivita, setAttivita } =
    useToolContext();

  if (startDateSearch && endDateSearch) {
    moment.locale("it");
    let difference = endDateSearch.getTime() - startDateSearch.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    let startTime = startDateSearch.getTime() - 86400000;

    return TotalDays > 0 && TotalDays < 9
      ? Array.from(Array(TotalDays), (e, i) => {
          startTime += 86400000;
          let stringa = new Date(startTime);
          let giorno = moment(stringa).format("DD");
          let mese = moment(stringa).format("MMMM");
          let anno = moment(stringa).format("YYYY");
          let meseFormat = mese.charAt(0).toUpperCase() + mese.slice(1);
          let stringaFormatDate = giorno + " " + meseFormat + " " + anno;
          let stringaFormatDay = moment(stringa).format("dddd");
          let stringaFormatDayCap =
            stringaFormatDay.charAt(0).toUpperCase() +
            stringaFormatDay.slice(1);
          return (
            <SliderAttivita
              key={i + 1}
              indice={i + 1}
              date={stringaFormatDate}
              giorno={stringaFormatDayCap}
              setAttivita={setAttivita}
              attivita={attivita}
            />
          );
        })
      : null;
  } else {
    return null;
  }
}

export default Elenco;
