import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { logo } from '../components/Constants'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Context } from './ContextApi'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import './navbar.css'


const Navbar = () => {

 

  const [searchQuery, setsearchQuery] = useState("");
  const { loading, mobileMenu, setmobileMenu } = useContext(Context);
  const navigate = useNavigate();
  const searchinput = document.getElementById("search");

  const handleChange = (event) => {
    setsearchQuery(event.target.value);
  }

  const searchQueryHandler = (event) => {
      if(event.key === 'Enter'){
        if(searchQuery === ""){
          alert("please enter something .....")
        }
        else{
          navigate('/searchresult', { state: { data : searchQuery } });
        }
        
      }
      
  }

  

  return (

    <nav 
    className='flex fixed overflow:hidden w-full bg-[#0a0a0b] h-[7vh] items-center'>
      <div className='w-1/5 flex items-center md:w-1/4 sm:w-1/3'>
        <h2 className='text-2xl font-bold ml-5 text-white'>Climph Music</h2>
      </div>

      {/* <div className='flex justify-center items-center w-[60%] sm:w-1/2'>

        <input className='w-[50%] h-[40%] p-5 rounded-lg outline-none bg-[#d8d2d2] sm:w-[70%]' placeholder='search song , album or artists' />
      </div> */}
       
       <div class='w-[20%] mx-auto '>
    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#1d1d1d]  overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        class="peer h-full w-full outline-none text-sm text-white pr-2 bg-[#1d1d1d]"
        type="text"
        id="search"
        onChange={handleChange}
        onKeyDown={searchQueryHandler}
        placeholder="Search something.." /> 
    </div>
</div>


      <div className='flex w-[20%] justify-evenly items-center  '>
        <NotificationsIcon />
        <SettingsRoundedIcon />
        <button className='bg-[#172b40] text-[white] pl-2 pr-2 pt-1 pb-1 rounded-3xl'>
          Subscribe
        </button>
      </div>
    </nav>
  )
}


const styles = {
  logo: {
    width: 50,
    height: 50
  }
}

export default Navbar