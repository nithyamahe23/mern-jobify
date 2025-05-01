import React from 'react'
import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if(error.status === 404){
    return (
      <Wrapper>
        <div>
          <h3 style={{marginBottom:'2em'}}>Page Not found</h3>
          <img src={img} alt='Page Not Found'></img>    
          {/* Provide a link to the dashboard because it only has all the functionality*/}
          <p>We can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    )
  }else{
    return (
      <Wrapper>
        <div>
          <h3>Something went wrong!!!</h3>      
        </div>
      </Wrapper>
    )
  }
}

export default Error;
