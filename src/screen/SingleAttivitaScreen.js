import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { useGlobalContext } from "../context";
import { ScrollToTop } from "../utils/helpers";
import { RxArrowLeft } from "react-icons/rx";

const SingleAttivitaScreen = () => {
  const { deleteScrollPosition } = useGlobalContext();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { isLoading, isError, data } = useFetch("attivita", slug);

  useEffect(() => {
    deleteScrollPosition();
  }, []);

  if (isLoading) {
    return (
      <>
        <ScrollToTop />
        <section className='page-section'>
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
    ACF: {
      immagine_attivita: {
        sizes: { large: url_immagine },
      },
      tipologia_attivita,
      data_ricorrente,
      durata,
      descrizione_attivita: descrizione,
      orario_specifico,
    },
  } = data[0];

  return (
    <>
      <ScrollToTop />
      <section className='page-section'>
        <div className='container'>
          <div className='return-arrow pointer' onClick={() => navigate(-1)}>
            <RxArrowLeft /> Torna indietro
          </div>
          <h1 className='page-title'>{titolo}</h1>
        </div>
        <div
          className='container-img-singolo'
          style={{
            backgroundImage: `url(${url_immagine})`,
          }}
        ></div>
        <div className='container'>
          <div
            className='container-descr-attivita'
            dangerouslySetInnerHTML={{ __html: descrizione }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default SingleAttivitaScreen;
