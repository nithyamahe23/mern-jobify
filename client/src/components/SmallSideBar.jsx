import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import links from '../utils/links';
import NavLinks from './NavLinks';
const SmallSideBar = () => {
  //get showSideBar and toggle sidebar from context
  //const data = useDashboardContext();
  const {showSideBar, toggleSideBar} = useDashboardContext();
  //console.log(data);
  
  return (
    <Wrapper>
      {/* display the side bar according to the value os show side bar*/}

      <div className={showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>    {/* Even if we have show-sidebar class, if the screen size is more, small sidebar will not be displayed*/}
        <div className="content">
          {/* close button*/}
          <button type='button' className='close-btn' onClick={toggleSideBar}>  {/* toggle side bar closes the side bar*/}
            <FaTimes/>
          </button>
          <header>
            <Logo/>
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
