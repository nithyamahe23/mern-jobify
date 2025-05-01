import { Outlet, redirect, useLoaderData, useNavigate} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, NavBar, SmallSideBar } from '../components';
import { useState, createContext, useContext} from 'react';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
//Create a context
const DashboardContext = createContext();

export const loader = async() => {
  try{
      const {data} = await customFetch.get('/users/current-user');
      return data;
  }catch(error){
    return redirect('/');
  }
}



const DashboardLayout = () => {

  //Use the loader data
  const {user} = useLoaderData();

  const navigate = useNavigate();
  //to show or hide side bar
  const [showSideBar, setShowSideBar] = useState(false);
  //dark theme
  //Get the value from checkDefaultTheme method
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  //Place holder function for side bar and dark theme
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    //console.log("toggle dark theme");
    //store the newDarkTheme in local storage because when we refresh again it will be back to light mode
    localStorage.setItem('darkTheme', newDarkTheme);

  }

  const toggleSideBar = () => {
    
    setShowSideBar(!showSideBar);
    console.log(showSideBar)
  }

  //logout user - async since we need to communicate with server
  const logoutUser = async() => {
    navigate('/');  //navigate to the landing page
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  }

  return (
    <DashboardContext.Provider value={{user, showSideBar, isDarkTheme, toggleDarkTheme, toggleSideBar, logoutUser}}>
    <Wrapper>
      <main className='dashboard'>
      <SmallSideBar/>
      <BigSideBar/>
    
      <div>
        <NavBar/>
        <div className='dashboard-page'>
        <Outlet context={{user}}/>
        </div>
      </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
