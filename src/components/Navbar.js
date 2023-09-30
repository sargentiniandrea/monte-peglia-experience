import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { LinkComponent } from "../utils/links";

const Navbar = () => {
  const { openSidebar } = useGlobalContext();
  return (
    <nav className='main-nav main-nav-color'>
      <div className='container'>
        <header className='nav-header'>
          <Link to='/' className='nav-brand'>
            <div>
              <h3 className='logo'>Monte Peglia</h3>
              <span className='logo-span'>Experience</span>
            </div>
          </Link>
          <div className='nav-toggler pointer'>
            <button
              className='nav-icon-btn nav-toggler pointer'
              onClick={openSidebar}
            >
              <RiMenu3Line className='nav-icon' />
            </button>
          </div>
          <div className='container-nav-link-desktop'>
            <LinkComponent classLink='nav-links' />
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
