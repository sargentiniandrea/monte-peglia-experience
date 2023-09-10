function BoxAttivitaSkeleton({ n = 2 }) {
  return (
    <div className='container-skeleton'>
      {[...Array(n)].map((box, i) => {
        return (
          <div key={i + 1} className='box-attivita box-attivita-skeleton'>
            <div className='img-attivita'></div>
            <div className='info-attivita'>
              <div className='titolo-attivita'></div>
              <div className='date-attivita'></div>
              <div className='date-attivita'></div>
              <div className='btns-attivita'></div>
              <div className='btns-attivita btns-attivita-last'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BoxAttivitaSkeleton;
