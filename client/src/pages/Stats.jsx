import React from 'react'
import { ChartContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

//set up loader
export const loader = async() => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
}

const Stats = () => {
  //Get the default stats and monthly applications from loader data
  const {defaultStats, monthlyApplications} = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats = {defaultStats} />
      {/* Chart should be displayed if there are monthly applications */}
      {/* we use optoional chaining because there is a possibility the monthly application will not be returned */}
      {
        monthlyApplications?.length > 1 && <ChartContainer data = {monthlyApplications} />
      }
    </>
  )
}

export default Stats;
