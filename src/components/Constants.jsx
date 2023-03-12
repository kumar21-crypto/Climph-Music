import HomeRounded from '@mui/icons-material/HomeRounded';
import ExploreRounded from '@mui/icons-material/ExploreRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import PersonRounded from '@mui/icons-material/PersonRounded';
import LibraryMusicRounded from '@mui/icons-material/LibraryMusicRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';


export const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207';


export const categories = [
  {path:"/",id:1, name: 'Home', icon: <HomeRounded />, },
  {path:"/browse",id:2, name: 'Browse', icon: <ExploreRounded />, },
  {path:"/trending",id:3, name: 'Trending', icon: <TrendingUpRounded />, },
  {path:"/artists",id:4, name: 'Artists', icon: <PersonRounded />, },
  {path:"/albums",id:5, name: 'Albums', icon: <LibraryMusicRounded />, },
];

export const Colors = {
  mainContainerbg:'#0a0a0b',
  lightgree:'green',
  sidebarSelect:'#5b7afa'
}

export const sizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const playIcon = <PlayCircleFilledWhiteRoundedIcon sx={{fontSize:60,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
export const pauseIcon = <PauseCircleRoundedIcon sx={{fontSize:60,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
export const nextIcon = <SkipNextRoundedIcon  sx={{fontSize:50,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
export const previousIcon = <SkipPreviousRoundedIcon  sx={{fontSize:50,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'  />
