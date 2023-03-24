import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const [open, setopen] = useState(true);
  const [searchQuery, setsearchQuery] = useState("");
  const navigate = useNavigate();

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
    <Box sx={{ flexGrow: 1, marginBottom: 3 }} >

      <AppBar position='fixed'>
        <div className=' h-[8vh] bg-[black] w-full flex flex-grow'>

          <div className='w-[30%] h-full flex justify-start pl-3 items-center '>
            <span className='text-white text-md font-bold sm:text-lg md:text-xl'>Climph Music</span>
          </div>

          <div className='w-[60%] md:w-[70%]  flex items-center justify-end h-full ml-[15vw] md:ml-0'>
            <div className='flex bg-[#212121] rounded-xl mr-4 md:w-[70%]'>
              {
                open ?
                  <input
                    type="text"
                    name="search" id="search"
                    placeholder='search songs , albums or artists'
                    className='p-2 duration-500 bg-[#212121] translate-y-0 rounded-xl outline-none text-white pl-3 w-[40vw] truncate '
                    onChange={handleChange}
                    onKeyDown={searchQueryHandler}
                  />

                  :
                  ""
              }
              <Divider />

              <button
              className='flex  md:ml-[5vw]  lg:ml-[5vw] xl:ml-[5vw] 2xl:ml-[8vw] justify-center items-center'
                onClick={() => {
                  if (open) {
                    setopen(false);
                  }
                  else {
                    setopen(true);
                  }
                }}>
                <SearchIcon
                  sx={{ fontSize: 30 ,color:'white'}}
                  className=' text-[#0a0a0b] p-1  ' />
              </button>
            </div>

            <button className='mr-4 md:w-[30%] md:justify-end items-center md:pr-8 flex h-full  md:mr-0 '>
              <MenuIcon />
            </button>
          </div>

        </div>
      </AppBar>

    </Box>
  );
}

export default Header;
