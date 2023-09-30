import { useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

function SpanCalendario({
  titolo,
  slug,
  periodo,
  attivita,
  setAttivita,
  giorno,
  classe,
  isSaved,
}) {
  const navigate = useNavigate();
  const goToAttivita = (_slug) => {
    document.body.classList.remove("no-scroll");
    navigate(`/attivita/${_slug}`);
  };

  const removeItem = (title, date) => {
    setAttivita((attivita) => {
      return attivita.filter((value) => {
        if (
          value.titolo === title &&
          value.periodo === periodo &&
          value.data === date
        ) {
          return false;
        }
        return true;
      });
    });
  };

  return (
    <div className={`blocco-attivita pointer blocco-att-active ${classe}`}>
      {!isSaved && (
        <span
          className='remove-attivita'
          onClick={() => removeItem(titolo, giorno)}
        >
          <RiCloseLine />
        </span>
      )}
      <div
        className='content-blocco-attivita'
        onClick={() => goToAttivita(slug)}
      >
        <p dangerouslySetInnerHTML={{ __html: titolo }}></p>
        <hr />
        <small>{periodo}</small>
      </div>
    </div>
  );
}

export default SpanCalendario;
