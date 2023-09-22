import { React } from "react";
import HeroSection from "../components/HeroSection";
import { ScrollToTop } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import riserva2 from "../assets/img/riserva-2.jpg";
import ostello from "../assets/img/ostello.jpg";
import trekking from "../assets/img/trekking.jpg";
import calendario from "../assets/img/calendario.jpg";
import contatti from "../assets/img/contatti.jpg";

const HomeScreen = (isLoading) => {
  const navigate = useNavigate();
  const goToPage = (path) => {
    navigate(path);
  };
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <section className='section-padding'>
        <div className='container'>
          <div className='section-home'>
            <div className='inner-section-home'>
              <div className='inner-home-info'>
                <h2>Riserva Mondiale della Biosfera Unesco del Monte Peglia</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus turpis lectus, egestas in suscipit vitae, mollis ut
                  justo. Nullam felis tortor, sagittis id ipsum non, molestie
                  blandit mauris. Fusce sapien purus, accumsan ut efficitur sed,
                  finibus in eros. Donec in sapien suscipit, lacinia sapien a,
                  condimentum quam. Cras volutpat pellentesque lacus et
                  dignissim. Quisque scelerisque faucibus neque, vel auctor leo
                  ullamcorper in. Aliquam at cursus dui, ut volutpat nunc.
                </p>
                <button className='btn' onClick={() => goToPage("/la-riserva")}>
                  Scopri di più
                </button>
              </div>
            </div>
            <div className='inner-section-home'>
              <img className='shadow' src={`${riserva2}`} alt='riserva-2'></img>
            </div>
          </div>

          <div className='section-home'>
            <div className='inner-section-home'>
              <div className='inner-home-info'>
                <h2>Ostello</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus turpis lectus, egestas in suscipit vitae, mollis ut
                  justo. Nullam felis tortor, sagittis id ipsum non, molestie
                  blandit mauris. Fusce sapien purus, accumsan ut efficitur sed,
                  finibus in eros. Donec in sapien suscipit, lacinia sapien a,
                  condimentum quam. Cras volutpat pellentesque lacus et
                  dignissim. Quisque scelerisque faucibus neque, vel auctor leo
                  ullamcorper in. Aliquam at cursus dui, ut volutpat nunc.
                </p>
                <button className='btn' onClick={() => goToPage("/ostello")}>
                  Scopri di più
                </button>
              </div>
            </div>
            <div className='inner-section-home'>
              <img className='shadow' src={`${ostello}`} alt='ostello'></img>
            </div>
          </div>

          <div className='section-home'>
            <div className='inner-section-home'>
              <div className='inner-home-info'>
                <h2>Organizza in autonomia la tua esperienza</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus turpis lectus, egestas in suscipit vitae, mollis ut
                  justo. Nullam felis tortor, sagittis id ipsum non, molestie
                  blandit mauris. Fusce sapien purus, accumsan ut efficitur sed,
                  finibus in eros. Donec in sapien suscipit, lacinia sapien a,
                  condimentum quam. Cras volutpat pellentesque lacus et
                  dignissim. Quisque scelerisque faucibus neque, vel auctor leo
                  ullamcorper in. Aliquam at cursus dui, ut volutpat nunc.
                </p>
                <button
                  className='btn'
                  onClick={() => goToPage("/organizza-esperienza")}
                >
                  Organizza
                </button>
              </div>
            </div>
            <div className='inner-section-home'>
              <img
                className='shadow'
                src={`${calendario}`}
                alt='calendario'
              ></img>
            </div>
          </div>

          <div className='section-home'>
            <div className='inner-section-home'>
              <div className='inner-home-info'>
                <h2>Attività</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus turpis lectus, egestas in suscipit vitae, mollis ut
                  justo. Nullam felis tortor, sagittis id ipsum non, molestie
                  blandit mauris. Fusce sapien purus, accumsan ut efficitur sed,
                  finibus in eros. Donec in sapien suscipit, lacinia sapien a,
                  condimentum quam. Cras volutpat pellentesque lacus et
                  dignissim. Quisque scelerisque faucibus neque, vel auctor leo
                  ullamcorper in. Aliquam at cursus dui, ut volutpat nunc.
                </p>
                <button className='btn' onClick={() => goToPage("/attivita")}>
                  Vedi tutte le attività
                </button>
              </div>
            </div>
            <div className='inner-section-home'>
              <img className='shadow' src={`${trekking}`} alt='attivita'></img>
            </div>
          </div>

          <div className='section-home'>
            <div className='inner-section-home'>
              <div className='inner-home-info'>
                <h2>Contattaci</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus turpis lectus, egestas in suscipit vitae, mollis ut
                  justo. Nullam felis tortor, sagittis id ipsum non, molestie
                  blandit mauris. Fusce sapien purus, accumsan ut efficitur sed,
                  finibus in eros. Donec in sapien suscipit, lacinia sapien a,
                  condimentum quam. Cras volutpat pellentesque lacus et
                  dignissim. Quisque scelerisque faucibus neque, vel auctor leo
                  ullamcorper in. Aliquam at cursus dui, ut volutpat nunc.
                </p>
                <button className='btn' onClick={() => goToPage("/contattaci")}>
                  Contatti
                </button>
              </div>
            </div>
            <div className='inner-section-home'>
              <img className='shadow' src={`${contatti}`} alt='contatti'></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
