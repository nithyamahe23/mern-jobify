import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
//import HomeLayout from "./pages/HomeLayout";

import {HomeLayout, Register, Login, Error, DashboardLayout, LandingPage, AddJob, Stats, AllJobs, Profile, Admin, EditJob} from './pages'

import {action as registerAction} from './pages/Register';
import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob';
import {action as editJobAction} from './pages/EditJob';
import {action as deleteJobAction} from './pages/DeleteJob';
import {action as prfofileAction} from './pages/Profile';
import {loader as dashboardLoader} from './pages/DashboardLayout';
import {loader as allJobsLoader} from './pages/AllJobs';
import {loader as editJobLoader} from './pages/EditJob';
import {loader as statsLoader} from './pages/Stats';
import {loader as adminLoader} from './pages/Admin';


//method to check default theme
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';   //Since we are storing as string compare as 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

//For landing page, register and login pages
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path:'/',
    //element: <h1>Home</h1>
    element:<HomeLayout/>,
    errorElement: <Error/>,
    children:[
      {
        index: true,
        element: <LandingPage/>
      },
      {
        path:'register',
        //element: <h1>Home</h1>
        element:<Register/>,
        action : registerAction,
      },
      {
        path:'login',
        //element: <h1>Home</h1>
        element:<Login/>,
        action : loginAction,
      },
      {
        path:'dashboard',
        //element: <h1>Home</h1>
        element:<DashboardLayout />,
        loader : dashboardLoader,
        children:[
          {
            index: true,
            element: <AddJob/>,    //Add Job will be displayed if we give localhost:4173/dashboard
            action: addJobAction,
          },
          {
            path: 'addJob',
            element:<AddJob/>
          },
          {
            path: 'stats',
            element:<Stats/>,
            loader : statsLoader,
          },
          {
            path: 'all-jobs',
            element:<AllJobs/>,
            loader : allJobsLoader
          },
          {
            path: 'profile',
            element:<Profile/>,
            action: prfofileAction
          },
          {
            path: 'admin',
            element:<Admin/>,
            loader: adminLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader : editJobLoader,
            action : editJobAction,
          },
          {
            path: 'delete-job/:id',
            action : deleteJobAction
          }
        ]
      }
    ]

  },
  // {
  //   path:'/register',
  //   //element: <h1>Home</h1>
  //   element:<Register/>
  // },
  // {
  //   path:'/login',
  //   //element: <h1>Home</h1>
  //   element:<Login/>
  // },
  // {
  //   path:'/dashboard',
  //   //element: <h1>Home</h1>
  //   element:<DashboardLayout/>
  // }
])
const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
};

export default App;