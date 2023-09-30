import { React } from "react";
import backImage from "../assets/img/home.jpg";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const goToTool = () => {
    navigate("/organizza-esperienza");
  };
  return (
    <section
      className='hero-section'
      style={{
        background: `url(${backImage})`,
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className='overlay-hero'>
        <div className='container'>
          <div>
            <h1>Riscopri la connessione con la natura incontaminata.</h1>
            <button className='btn btn-hero' onClick={goToTool}>
              Costruisci la tua esperienza
              <BsArrowUpRight className='btn-icon' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
