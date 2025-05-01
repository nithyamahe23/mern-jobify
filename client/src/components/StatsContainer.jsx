import React from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({defaultStats}) => {

  const stats = [
    {
      title : 'pending applications',
      count : defaultStats?.pending || 0, //if pending is not present, default to 0
      icon : <FaSuitcaseRolling />,
      color : '#f59e0b',
      bcg : '#fcf3c7'
    },
    {
      title : 'interviews scheduled',
      count : defaultStats?.interviewed || 0, //if pending is not present, default to 0
      icon : <FaCalendarCheck />,
      color : '#647acb',
      bcg : '#e0e8f9'

    },
    {
      title : 'declined',
      count : defaultStats?.declined || 0, //if pending is not present, default to 0
      icon : <FaSuitcaseRolling />,
      color : '#d66a6a',
      bcg : '#ffeeee'

    }
  ]
  return (
    <Wrapper>
    {
      stats.map((item) => {
        return(
          <StatItem key={item.title} {...item} />
        )
      })
    }
    </Wrapper>
  )
}

export default StatsContainer
