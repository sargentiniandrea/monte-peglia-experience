import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import useFetch from "../useFetch";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";

const links = [
  {
    url: "/organizza-esperienza",
    text: "Organizza la tua esperienza",
    icon: null,
  },
  {
    url: "/attivita",
    text: "Attività",
    icon: null,
  },
  {
    url: "/contattaci",
    text: "Contattaci",
    icon: <FaPhoneAlt />,
  },
  {
    url: "/accedi",
    text: localStorage.getItem("jwt") ? "Profilo" : "Accedi / Registrati",
    icon: <FaUserAlt />,
  },
];

const LinkComponent = ({ classLink }) => {
  const { isLoading, isError, data } = useFetch("pages");
  const { closeSidebar, localPage } = useGlobalContext();
  return (
    <ul className={classLink}>
      <Link key={"home"} to='/' className='nav-item' onClick={closeSidebar}>
        <div className='nav-link'>
          <span className='nav-text'>Home</span>
        </div>
      </Link>
      {!isLoading && !isError
        ? data.map((link) => {
            return (
              <Link
                key={link.id}
                to={`/${link.slug}`}
                className='nav-item'
                onClick={closeSidebar}
              >
                <div className='nav-link'>
                  <span className='nav-text'>{link.title.rendered}</span>
                </div>
              </Link>
            );
          })
        : isLoading && localPage
        ? localPage.map((link) => {
            return (
              <Link
                key={link.id}
                to={`/${link.slug}`}
                className='nav-item'
                onClick={closeSidebar}
              >
                <div className='nav-link'>
                  <span className='nav-text'>{link.title.rendered}</span>
                </div>
              </Link>
            );
          })
        : null}
      {links.map((customLink) => {
        return (
          <Link
            key={customLink.text}
            to={customLink.url}
            className='nav-item'
            onClick={closeSidebar}
          >
            <div className='nav-link'>
              <span className='nav-text'>{customLink.text}</span>
              {customLink.icon}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export { LinkComponent };
