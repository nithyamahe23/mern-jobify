import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({data}) => {
  return (
    // <ResponsiveContainer width='100%' height = {300} >  {/* these components are provided by rechart library */}
    //   <AreaChart data = {data} margin= {{top : 50}}>
    //     <CartesianGrid strokeDasharray='3 3'/>
    //       {/* set date on x axis */}
    //       <XAxis dataKey='date' />    {/* date is got from data which is passed */}
    //       <YAxis allowDecimals={false} />   {/* dont allow decimals in y axis */}
    //       <Tooltip /> 
    //       <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
    //   </AreaChart>
    // </ResponsiveContainer>
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  )
};

export default AreaChartComponent;
