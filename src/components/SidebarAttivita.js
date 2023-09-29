import StickyBox from "react-sticky-box";
import gpx from "../assets/img/gpx.png";
import kml from "../assets/img/kml.png";

const SidebarAttivita = ({ data: Data }) => {
  const {
    acf: {
      generali: { data, prenotazione, sport, tipologia },
      dettagli: {
        data_ricorrente,
        durata,
        durata_specifica,
        orario_fine,
        orario_inizio,
        orario_specifico,
        singola_data,
      },
      scheda_tecnica,
      file_percorsi: { file_gpx, file_kml },
      box_contatti,
      contatti,
      email_organizzatore,
    },
  } = Data[0];

  return (
    <StickyBox className='sidebar-attivita' offsetTop={80} offsetBottom={30}>
      {tipologia === "sportiva" && scheda_tecnica ? (
        <div className='box-sidebar container-scheda-tecnica'>
          <h4>Scheda tecnica</h4>
          <div dangerouslySetInnerHTML={{ __html: scheda_tecnica }}></div>
        </div>
      ) : null}
      {tipologia === "sportiva" && (file_gpx || file_kml) ? (
        <div className='box-sidebar container-download'>
          <h4>Download</h4>
          <div>
            <p>Scarica il tracciato:</p>
            <div>
              {file_gpx && (
                <a href={file_gpx} className='btn'>
                  File gpx <img src={`${gpx}`} alt='gpx'></img>
                </a>
              )}
              {file_kml && (
                <a href={file_kml} className='btn'>
                  File kml <img src={`${kml}`} alt='kml'></img>
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {(box_contatti && contatti) || email_organizzatore ? (
        <div className='box-sidebar container-contatti'>
          <h4>Contatti</h4>
          <div>
            {prenotazione === "si_prenotazione" && email_organizzatore ? (
              <div className='container-btn-form-prenot'>
                <p>Prenota l'attività tramite il form</p>
                <button className='btn'>Prenota</button>
              </div>
            ) : null}
            {box_contatti && contatti ? (
              <div
                className='container-contatti'
                dangerouslySetInnerHTML={{ __html: contatti }}
              ></div>
            ) : null}
          </div>
        </div>
      ) : null}
    </StickyBox>
  );
};

export default SidebarAttivita;
