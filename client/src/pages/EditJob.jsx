import React from 'react'
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

//set the loader
export const loader = async({params}) => {
  try{
    const {data} = await customFetch.get(`/jobs/${params.id}`);
    console.log({data});
    return data;
  }catch(error){
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
}

//set the action
export const action = async({request, params}) => {
  console.log('in edit job action');
  //get the form data
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job details updated successfully!');
    //redirect to all jobs
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
const EditJob = () => {
  const {job} = useLoaderData();
  //console.log(job);
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position}></FormRow>
          <FormRow type='text' name='company' defaultValue={job.company}></FormRow>
          <FormRow type='text' name='jobLocation' defaultValue={job.jobLocation} labelText='Job Location'></FormRow>
          <FormRowSelect name='jobStatus' labelText='job status' defaultValue={job.jobStatus} 
                        list={Object.values(JOB_STATUS)}></FormRowSelect>
          <FormRowSelect name='jobType' labelText='job type' defaultValue={job.jobType} 
                         list={Object.values(JOB_TYPE)}></FormRowSelect>

          <SubmitBtn formBtn />
        </div>

      </Form>
    </Wrapper>
  )
}

export default EditJob;
