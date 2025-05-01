import React from 'react';

//Import the icons
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

//links array
const links = [
    {
        text : 'add job', path: '.', icon: <FaWpforms/>     //If we give '/' in path, then it will go to the landing page. If we give '/dashboard', it will work
    },
    {
        text : 'all jobs', path: 'all-jobs', icon: <MdQueryStats/>
    },
    {
        text : 'stats', path: 'stats', icon: <IoBarChartSharp/>
    },
    {
        text : 'profile', path: 'profile', icon: <ImProfile/>
    },
    {
        text : 'admin', path: 'admin', icon:<MdAdminPanelSettings/>
    }
];

export default links;