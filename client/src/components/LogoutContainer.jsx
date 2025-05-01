import React from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {

    const [showLogout, setShowLogout] = useState(true);
    //Get the values of user and logout user from dashboard context
    const {user, logoutUser} = useDashboardContext();

  return (
    <Wrapper>
      <button type='button' className='btn logout-btn'
                onClick={() => setShowLogout(!showLogout)}>
            {/* Inside the button display image if it is present else an avatar, 
                username, an icon which the user can click*/}
            {/* avatar*/}
            {/*If avatar is present, display it. Else use circle icon */}
            {
              user.avatar ? 
              (
                <img src={user.avatar} alt='avatar' className='img' />
              )
              : 
              (
                <FaUserCircle />
              )
            }
            
            {/* username if it is present*/}
            {user?.name}
            {/* icon */}
            <FaCaretDown />
        </button>
            {/* Display logout in the menu option*/}
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn'
                    onClick={logoutUser}> 
                    logout    
                </button>
            </div>
      
    </Wrapper>
  )
}

export default LogoutContainer
