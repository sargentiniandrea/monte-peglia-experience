import { formatArray } from "../utils/helpers";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoIosPricetags } from "react-icons/io";
import { ImInfo } from "react-icons/im";
import { BiSolidTimeFive } from "react-icons/bi";

const DettagliAttivita = ({ data: Data }) => {
  const {
    title: { rendered: titolo },
    acf: {
      immagine_attivita: {
        sizes: { "1536x1536": url_immagine },
      },
      categorie_attivita,
      descrizione_attivita,
      generali: { data, prenotazione, sport, tipologia },
      dettagli: {
        data_ricorrente,
        durata,
        durata_specifica,
        orario_fine,
        orario_inizio,
        orario_specifico,
        singola_data,
        ha_prezzo,
        prezzo,
        info_aggiuntiva,
      },
      photo_gallery: { galleria },
      scheda_tecnica,
      file_percorsi: { file_gpx, file_kml },
      box_contatti,
      contatti,
      email_organizzatore,
      mappa,
    },
    xml_mappa,
  } = Data[0];

  return (
    <div className='container-dettagli-attivita'>
      <div className='inner-container-dettagli-attivita'>
        {prenotazione === "si_prenotazione" && (
          <span className='span-prenotazione'>
            <HiOutlinePencilAlt /> Prenotazione necessaria
          </span>
        )}
        {prenotazione === "no_prenotazione" && data === "libera" ? (
          <span>
            <FaRegCalendarAlt /> Attività libera
          </span>
        ) : null}
        {data === "ricorrente" && (
          <span>
            <FaRegCalendarAlt /> Ogni {formatArray(data_ricorrente)}
          </span>
        )}
        {data === "singola_data" && (
          <span>
            <FaRegCalendarAlt /> {singola_data}
          </span>
        )}
        {ha_prezzo && prezzo ? (
          <span>
            <IoIosPricetags /> Costo: {prezzo} €
          </span>
        ) : null}
        {durata_specifica && durata ? (
          <span>
            <FaHourglassHalf /> {durata}
          </span>
        ) : null}
        {orario_specifico && orario_inizio ? (
          <span>
            <BiSolidTimeFive />{" "}
            {orario_inizio ? `Inizio: ${orario_inizio}` : null}
            {orario_fine ? ` - Fine: ${orario_fine}` : null}
          </span>
        ) : null}
        {info_aggiuntiva && (
          <span>
            <ImInfo />
            {info_aggiuntiva}
          </span>
        )}
      </div>
    </div>
  );
};

export default DettagliAttivita;
