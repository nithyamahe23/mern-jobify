import React from 'react';
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast }  from 'react-toastify';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);  
  try{

    //Call to server
    await customFetch.post('/auth/register', data);
    toast.success("Registation Successful!");
    
    return redirect('/login');
  }catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Register = () => {


  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow inputType='text' name='name' labelText='First Name' /> {/*name is passed to server. label text will be the text displayed for label in form*/}
        <FormRow inputType='text' name='lastName' labelText='Last Name' />
        <FormRow inputType='text' name='location' />
        <FormRow inputType='email' name='email' labelText='Email' />
        <FormRow inputType='password' name='password' labelText='Password' />
        <SubmitBtn />
        <p>Already a Member?
          <Link to='/login' className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register;
