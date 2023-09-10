import React from "react";
import useFetch from "../useFetch";

function Loader() {
  const { isLoading, isError } = useFetch("pages");
  if (isLoading) {
    return (
      <div className='loader isLoading'>
        <div className='loader-external'>
          <div className='loader-inner'>
            <div></div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className='loader isLoading'>
        <p>Errore</p>
      </div>
    );
  }

  return (
    <div className='loader isLoaded'>
      <div className='loader-external'>
        <div className='loader-inner'>
          <div></div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
