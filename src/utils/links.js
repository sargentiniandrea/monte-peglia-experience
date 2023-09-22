import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../context";
import useFetch from "../useFetch";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";

const links = [
  {
    url: "/attivita",
    text: "Attività",
    icon: null,
  },
  {
    url: "/organizza-esperienza",
    text: "Organizza la tua esperienza",
    icon: null,
  },
  {
    url: "/contattaci",
    text: "Contattaci",
    icon: <FaPhoneAlt />,
  },
  {
    url: "/accedi",
    text: localStorage.getItem("jwt") ? "Profilo" : "Accedi",
    icon: <FaUserAlt />,
  },
];

const LinkComponent = ({ classLink }) => {
  const { isLoading, isError, data } = useFetch("pages");
  const { closeSidebar, localPage } = useGlobalContext();
  return (
    <ul className={classLink}>
      <NavLink key={"home"} to='/' className='nav-item' onClick={closeSidebar}>
        <div className='nav-link'>
          <span className='nav-text'>Home</span>
        </div>
      </NavLink>
      {!isLoading && !isError
        ? data.map((link) => {
            return (
              <NavLink
                key={link.id}
                to={`/${link.slug}`}
                className='nav-item'
                onClick={closeSidebar}
              >
                <div className='nav-link'>
                  <span className='nav-text'>{link.title.rendered}</span>
                </div>
              </NavLink>
            );
          })
        : isLoading && localPage
        ? localPage.map((link) => {
            return (
              <NavLink
                key={link.id}
                to={`/${link.slug}`}
                className='nav-item'
                onClick={closeSidebar}
              >
                <div className='nav-link'>
                  <span className='nav-text'>{link.title.rendered}</span>
                </div>
              </NavLink>
            );
          })
        : null}
      {links.map((customLink) => {
        return (
          <NavLink
            key={customLink.text}
            to={customLink.url}
            className='nav-item'
            onClick={closeSidebar}
          >
            <div className='nav-link'>
              <span className='nav-text'>{customLink.text}</span>
              {customLink.icon}
            </div>
          </NavLink>
        );
      })}
    </ul>
  );
};

export { LinkComponent };
