import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './App.jsx';


//import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import TestToast from './TestToast.jsx';
//import customFetch from './utils/customFetch.js';



//axios returns json. We need not do anything.
//const data = await axios.get('/api/jobs/v1/test');

//using custom fetch
//const data = await customFetch.get('/test');

//console.log(data);
// fetch('/api/jobs/v1/test')
//       .then((res) => res.json())
//       .then((data) => console.log(data));
      
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    <App />
    <ToastContainer position='top-center' />
    
  </React.StrictMode>
);
