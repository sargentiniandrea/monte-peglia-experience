import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../useFetch";
import BoxAttivitaArchivio from "../components/BoxAttivitaArchivio";
import { useGlobalContext } from "../context";
import BoxAttivitaSkeleton from "../components/BoxAttivitaSkeleton";

const AttivitaScreen = () => {
  const { isLoading, isError, data, categorie } = useFetch();
  const { filterProducts, setFilterProducts } = useGlobalContext();
  const [selected, setSelected] = useState(0);

  const filtraProdotti = (categoria, index) => {
    setSelected(index);
    if (categoria === "Tutto") {
      setFilterProducts(data);
    } else {
      setFilterProducts(
        data.filter((el) =>
          el.ACF.categoria_attivita.includes(categoria) ? el : ""
        )
      );
    }
  };

  return (
    <>
      <section className='page-section'>
        <div className='container'>
          <h1 className='page-title'>Attività</h1>
          <div className='container-archivio-attivita'>
            {!isLoading && !isError ? (
              <>
                <div className='lista-categorie'>
                  {categorie.map((categoria, i) => {
                    return (
                      <button
                        key={i}
                        className={`btn btn-filtri ${
                          i === selected && "active"
                        }`}
                        onClick={() => filtraProdotti(categoria, i)}
                      >
                        {categoria}
                      </button>
                    );
                  })}
                </div>
                <div className='archivio-attivita'>
                  {filterProducts.map((el) => {
                    return <BoxAttivitaArchivio key={el.id} {...el} />;
                  })}
                </div>
              </>
            ) : !isLoading && isError ? (
              <p className='message-is-error'>Errore</p>
            ) : (
              <>
                <div className='lista-categorie lista-cat-skeleton'>
                  <button className='btn btn-filtri'></button>
                  <button className='btn btn-filtri'></button>
                  <button className='btn btn-filtri'></button>
                  <button className='btn btn-filtri'></button>
                  <button className='btn btn-filtri'></button>
                </div>
                <BoxAttivitaSkeleton n={2} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AttivitaScreen;
