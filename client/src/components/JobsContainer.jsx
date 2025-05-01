import React from 'react'
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  //get the all jobs context
  const {data} = useAllJobsContext();
  console.log(data);
  const {jobs, totalJobs, numOfPages} = data;
  if (jobs.length === 0){
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    
    )
  }else{
    return (
      <Wrapper>
        <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>  {/* display total no of jobs. Add 's' tojob if there is mporer than one job  */}
        <div className='jobs'>
            {
              jobs.map((job) => {
                return <Job key={job._id} {...job}></Job>
              })
            }
        </div>
        {/* Display pag btn container if the number of page > 1 */}
        {
          numOfPages > 1 && <PageBtnContainer />
        }
      </Wrapper>
    )
  }
  
}

export default JobsContainer
