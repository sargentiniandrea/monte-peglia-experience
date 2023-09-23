import React from "react";
import { ScrollToTop } from "../utils/helpers";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactScreen = () => {
  return (
    <>
      <ScrollToTop />
      <section className='page-section'>
        <div className='container-page'>
          <h1 className='page-title'>Contatti</h1>
          <p className='contact'>
            <FaPhoneAlt />
            XXX.XXXXXXX
          </p>
          <p className='contact'>
            <FaPhoneAlt />
            XXX.XXXXXXX
          </p>
          <p className='contact'>
            <FaEnvelope />
            XXX@XXXX.XXX
          </p>
        </div>
      </section>
    </>
  );
};

export default ContactScreen;
