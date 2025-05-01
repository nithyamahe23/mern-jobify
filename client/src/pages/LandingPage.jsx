import React from 'react'
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';

//import the logo and main image from assets
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
const LandingPage = () => {
  return (
    <Wrapper>
    <nav>
      {/* set the logo*/}
      {/* <img src={logo} alt='jobify' className='logo'></img> */}
      {/* Use th Logo component*/}
      <Logo/>
    </nav>
    <div className="container page">
      <div className="info">
        <h1>
          job <span>tracking</span> app
        </h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
         when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
        </p>
        <Link to='/register' className='btn register-link'>Register</Link>{/* btn is a global class name */}
        <Link to='/login' className='btn'>Login/User Demo</Link>
      </div>
      <img src={main} alt='job hunt' className='img main-img'></img>
    </div>
    </Wrapper>
  )
}

export default LandingPage;
