import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarAttivita from "../components/SidebarAttivita";
import useFetch from "../useFetch";
import Mappa from "../components/Mappa";
import Galleria from "../components/Galleria";
import DettagliAttivita from "../components/DettagliAttivita";
import { formatArray } from "../utils/helpers";
import { useGlobalContext } from "../context";
import { ScrollToTop } from "../utils/helpers";
import { RxArrowLeft } from "react-icons/rx";

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
          <div className='container'>
            <div className='container-img-singolo-loading'></div>
            <div className='container-descr-attivita-loading'></div>
          </div>
        </section>
      </>
    );
  }

  if (isError || Data.length < 1) {
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

  if (!isLoading && !isError && Data.length > 0) {
    // var stringToHTML = function (str) {
    //   var dom = document.createElement("div");
    //   dom.innerHTML = str;
    //   return dom;
    // };
    const {
      title: { rendered: titolo },
      acf: {
        immagine_attivita: {
          sizes: { "1536x1536": url_immagine },
        },
        categorie_attivita,
        descrizione_attivita,
        generali: { data, prenotazione, sport, tipologia },
        photo_gallery: { galleria },
        scheda_tecnica,
        file_percorsi: { file_gpx, file_kml },
        box_contatti,
        contatti,
        email_organizzatore,
        mappa_google,
      },
      xml_mappa,
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
            {/* Header attività */}
            <div className='return-arrow pointer' onClick={() => navigate(-1)}>
              <RxArrowLeft /> Torna indietro
            </div>
            <h1
              className='page-title'
              dangerouslySetInnerHTML={{ __html: titolo }}
            ></h1>
          </div>

          {/* Inizio contenuto attività */}
          <div className='container container-attivita'>
            <div className='container-img-text'>
              {/* Immagine attività */}
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

              {/* Dettagli attività */}
              <DettagliAttivita data={Data} />

              {/* Descrizione attività */}
              {descrizione_attivita && (
                <div className='container-descr-attivita'>
                  <p className='subtitolo-attivita'>Descrizione</p>
                  <div
                    dangerouslySetInnerHTML={{ __html: descrizione_attivita }}
                  ></div>
                </div>
              )}
            </div>
            {(tipologia === "sportiva" &&
              (scheda_tecnica || file_gpx || file_kml)) ||
            (box_contatti && contatti) ||
            email_organizzatore ? (
              <SidebarAttivita data={Data} />
            ) : null}
          </div>
          {xml_mappa && (
            <div className='container container-mappa'>
              <Mappa mappa={xml_mappa} />
            </div>
          )}
          {mappa_google && (
            <div className='container container-google-maps'>
              <p className='subtitolo-attivita'>Mappa</p>
              <div dangerouslySetInnerHTML={{ __html: mappa_google }}></div>
            </div>
          )}
          {galleria[0].length > 0 && (
            <div className='container container-galleria'>
              <p className='subtitolo-attivita'>Galleria</p>
              <Galleria galleria={galleria[0]} />
            </div>
          )}
        </section>
      </>
    );
  }
};

export default SingleAttivitaScreen;
