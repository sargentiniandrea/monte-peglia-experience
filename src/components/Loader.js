import React from "react";

function Loader({ isLoading, isError }) {
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
    return <div className='loader isError'></div>;
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
