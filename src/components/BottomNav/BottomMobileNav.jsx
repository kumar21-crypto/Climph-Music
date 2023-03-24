import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {BiHomeAlt2,BiTrendingUp} from 'react-icons/bi';
import {AiOutlineCompass} from 'react-icons/ai';
import {BsFillPersonFill,BsCardImage} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';



const BottomMobileNav = () => {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <div className='fixed bottom-0 w-full bg-[black]  md:hidden'>
      <BottomNavigation
         sx={{bgcolor:'black'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={{color:'white'}} onClick={()=>{navigate('/')}} label="Home" icon={<BiHomeAlt2 />} />
        <BottomNavigationAction sx={{color:'white'}} onClick={()=>{navigate('/browse')}} label="Browse" icon={<AiOutlineCompass />} />
        <BottomNavigationAction sx={{color:'white'}} onClick={()=>{navigate('/trending')}} label="Trending" icon={<BiTrendingUp />} />
        <BottomNavigationAction sx={{color:'white'}} onClick={()=>{navigate('/artists')}} label="Artists" icon={<BsFillPersonFill />} />
        <BottomNavigationAction sx={{color:'white'}} onClick={()=>{navigate('/albums')}} label="Albums" icon={<BsCardImage />} />
      </BottomNavigation>
    </div>
  )
}

export default BottomMobileNav