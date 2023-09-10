import React from "react";
import { ScrollToTop } from "../utils/helpers";
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";

const PageScreen = ({ title, content }) => {
  return (
    <>
      <ScrollToTop />
      <section className='page-section'>
        <div className='container'>
          <h1 className='page-title'>{title.rendered}</h1>
          <div
            className='page-content'
            dangerouslySetInnerHTML={{
              __html: content.rendered,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default PageScreen;
