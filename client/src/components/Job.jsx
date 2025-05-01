import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import JobInfo from './JobInfo';
day.extend(advancedFormat);

const Job = ({
    _id, position, company, jobLocation, jobType, createdAt, jobStatus      //We are passing all properties as props
}) => {
    //console.log(createdAt);
    //format the date
    const date = day(createdAt).format('MMM Do, YYYY');
    //console.log(date);
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>  {/* get character at position 0 and display it as icon*/}
            <div className="info">
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
            
      </header>
      <div className="content">
        <div className="content-center">
            <JobInfo icon={<FaLocationArrow />} text={jobLocation}></JobInfo>
            <JobInfo icon={<FaCalendarAlt/>} text={date}></JobInfo>
            <JobInfo icon={<FaBriefcase />} text={jobType}></JobInfo>
            <div className={`status ${jobStatus}`}>{jobStatus}</div>    {/* status is a generic class.  based on ${jobStatus} ->class name got from index.css*/}
        </div>
        <footer className='actions'>
            <Link to={`../edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
            <Form method='post' action={`../delete-job/${_id}`}>
                <button type='submit' className='btn delete-btn'>Delete</button>
            </Form>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
