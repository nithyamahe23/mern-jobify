import React from 'react'
import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router-dom';
const NavLinks = ({isBigSideBar}) => {
    const {toggleSideBar, user} = useDashboardContext();
  return (
    <div className="nav-links">
            {links.map((link) => {
              const {text, path, icon} = link;  //create an object with link
              //Get the user role from user
              const {role} = user;
              //For users not admin, admin link should not be displayed
              if (path === 'admin' && role !== 'admin') return;
              return(
                <NavLink  to={path} 
                          key={text} className='nav-link'
                          onClick={isBigSideBar ? null : toggleSideBar}>
                    <span className='icon'>{icon}</span>
                    {text}
                </NavLink>
              )
            })
            }
          </div>
  )
}

export default NavLinks;
