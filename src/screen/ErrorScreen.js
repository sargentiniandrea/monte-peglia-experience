import React from "react";
import { ScrollToTop } from "../utils/helpers";

const ErrorScreen = () => {
  return (
    <>
      <ScrollToTop />
      <section className='page-section page-error'>
        <div className='container'>
          <h1 className='page-title'>Errore</h1>
          <p>La pagina che stai cercando non è presente in questo sito.</p>
        </div>
      </section>
    </>
  );
};

export default ErrorScreen;
