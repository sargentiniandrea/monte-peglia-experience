import React from "react";
import { Link } from "react-router-dom";
import { LinkComponent } from "../utils/links";
import { useGlobalContext } from "../context";
import { RiCloseLine } from "react-icons/ri";
import { LiaMountainSolid } from "react-icons/lia";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside
      className={`${
        isSidebarOpen ? "nav-sidebar show-sidebar" : "nav-sidebar"
      }`}
    >
      <div className='container'>
        <header className='nav-header'>
          <Link to='/' className='nav-brand'>
            <h3 className='logo'>
              <LiaMountainSolid /> Nome Sito
            </h3>
          </Link>
          <div className='nav-toggler'>
            <button
              className='nav-icon-btn nav-toggler pointer'
              onClick={closeSidebar}
            >
              <RiCloseLine className='nav-icon' />
            </button>
          </div>
        </header>
        <div className='container-nav-link-sidebar'>
          <LinkComponent classLink='nav-links' />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
