import React from 'react'
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //console.log(data);

  try{
      await customFetch.post('/jobs', data);
      toast.success('Job Added Successfully');
      return redirect('all-jobs');    //Navigate to All jobs page
  }catch(error){
      toast.error(error?.response?.data?.msg);
      return('/addJob');
  } 

  
}


const AddJob = () => {
  //get the user details from Outlet
  const {user} = useOutletContext();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          {/* 3 rows for position, company and job location*/}
          <FormRow inputType='text' name='position' labelText='position'></FormRow>
          <FormRow inputType='text' name='company' labelText='company'></FormRow>
          {/* Get the user's location because he will be searching for job in his location*/}
          <FormRow inputType='text' name='jobLocation' labelText='job location' defaultValue={user.location}></FormRow>
          {/* select for job status*/}
          <FormRowSelect name='jobStatus' labelText='job status' 
                         list={Object.values(JOB_STATUS)} defaultValue={JOB_STATUS.PENDING} />
          <FormRowSelect name='jobType' labelText='job type' 
                         list={Object.values(JOB_TYPE)} 
                         defaultValue={JOB_TYPE.FULL_TIME} />

          <SubmitBtn formBtn></SubmitBtn>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddJob;
