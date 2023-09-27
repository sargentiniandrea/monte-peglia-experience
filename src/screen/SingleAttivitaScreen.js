import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StickyBox from "react-sticky-box";
import useFetch from "../useFetch";
import { formatArray } from "../utils/helpers";
import { useGlobalContext } from "../context";
import { ScrollToTop } from "../utils/helpers";
import { RxArrowLeft } from "react-icons/rx";
import gpx from "../assets/img/gpx.png";
import kml from "../assets/img/kml.png";

const SingleAttivitaScreen = () => {
  const { deleteScrollPosition } = useGlobalContext();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isLoading, isError, data: Data } = useFetch("attivita", slug);

  useEffect(() => {
    deleteScrollPosition();
  }, []);

  if (isLoading) {
    return (
      <>
        <ScrollToTop />
        <section className='page-section single-attivita'>
          <div className='container'>
            <div className='return-arrow pointer' onClick={() => navigate(-1)}>
              <RxArrowLeft /> Torna indietro
            </div>
            <div className='page-title-loading'></div>
          </div>
          <div className='container-img-singolo-loading'></div>
          <div className='container'>
            <div className='container-descr-attivita-loading'></div>
          </div>
        </section>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ScrollToTop />
        <section className='page-section'>
          <div className='container'>
            <div className='return-arrow pointer' onClick={() => navigate(-1)}>
              <RxArrowLeft /> Torna indietro
            </div>
            <h1 className='page-title'>Attività non disponibile</h1>
          </div>
        </section>
      </>
    );
  }

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
        email_organizzatore,
        orario_fine,
        orario_inizio,
        orario_specifico,
        singola_data,
      },
      scheda_tecnica,
      file_percorsi: { file_gpx, file_kml },
    },
  } = Data[0];

  let classTipologia = tipologia ? tipologia : "";
  let classSport = tipologia === "sportiva" && sport ? sport : "";
  let classPrenotazione = prenotazione ? prenotazione : "";
  let classData = data ? data : "";

  return (
    <>
      <ScrollToTop />
      <section
        className={`page-section single-attivita ${classTipologia} ${classSport} ${classPrenotazione} ${classData}`}
      >
        <div className='container'>
          <div className='return-arrow pointer' onClick={() => navigate(-1)}>
            <RxArrowLeft /> Torna indietro
          </div>
          <h1
            className='page-title'
            dangerouslySetInnerHTML={{ __html: titolo }}
          ></h1>
        </div>
        <div className='container container-attivita'>
          <div className='container-img-text'>
            <div
              className='container-img-singolo'
              style={{
                backgroundImage: `url(${url_immagine})`,
              }}
            >
              <span className='category-attivita'>
                {formatArray(categorie_attivita, "compatta")}
              </span>
            </div>
            <div
              className='container-descr-attivita'
              dangerouslySetInnerHTML={{ __html: descrizione_attivita }}
            ></div>
          </div>
          <StickyBox
            className='sidebar-attivita'
            offsetTop={80}
            offsetBottom={30}
          >
            {tipologia === "sportiva" && scheda_tecnica ? (
              <div className='box-sidebar container-scheda-tecnica'>
                <h4>Scheda tecnica</h4>
                <div dangerouslySetInnerHTML={{ __html: scheda_tecnica }}></div>
              </div>
            ) : null}
            {tipologia === "sportiva" && (file_gpx || file_kml) ? (
              <div className='box-sidebar container-download'>
                <h4>Download</h4>
                <p>Scarica il tracciato:</p>
                <div>
                  <a href={file_gpx} className='btn'>
                    File gpx <img src={`${gpx}`} alt='gpx'></img>
                  </a>
                  <a href={file_kml} className='btn'>
                    File kml <img src={`${kml}`} alt='kml'></img>
                  </a>
                </div>
              </div>
            ) : null}
            {prenotazione === "si_prenotazione" ? (
              <div className='box-sidebar container-prenotazione'>
                <h4>Prenotazione</h4>
                <div>
                  <p>Prenota l'attività tramite il form</p>
                  <button className='btn'>Prenota</button>
                </div>
              </div>
            ) : null}
          </StickyBox>
        </div>
      </section>
    </>
  );
};

export default SingleAttivitaScreen;
