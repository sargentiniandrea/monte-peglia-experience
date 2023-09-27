import Slider from "react-slick";
import BoxAttivita from "../BoxAttivita";
import BoxAttivitaSkeleton from "../BoxAttivitaSkeleton";
import useFetch from "../../useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderAttivita({ indice, date, giorno, setAttivita, attivita }) {
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    className: "container-box-attivita",
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const { isLoading, isError, data } = useFetch();

  return (
    <div className='row-elenco-attivita'>
      <div className='header-slider-attivita'>
        <p>Giorno {indice}</p>
        <small>
          {giorno} - {date}
        </small>
      </div>
      <div className='container-slider'>
        {!isLoading && !isError ? (
          <>
            <Slider {...settings}>
              {data.map((el, index) =>
                el.acf.generali.data === "singola_data" &&
                el.acf.dettagli.singola_data === date ? (
                  <BoxAttivita key={el.id} {...el} date={date} />
                ) : el.acf.generali.data === "ricorrente" &&
                  el.acf.dettagli.data_ricorrente.includes(giorno) ? (
                  <BoxAttivita key={el.id} {...el} date={date} />
                ) : el.acf.generali.data === "libera" ? (
                  <BoxAttivita key={el.id} {...el} date={date} />
                ) : null
              )}
            </Slider>
          </>
        ) : !isLoading && isError ? (
          <h5 className='message-is-error'>Errore</h5>
        ) : (
          <BoxAttivitaSkeleton n={8} />
        )}
      </div>
    </div>
  );
}

export default SliderAttivita;
