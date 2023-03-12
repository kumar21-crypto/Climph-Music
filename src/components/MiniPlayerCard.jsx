import React, { useState, useEffect, useContext,useRef } from 'react'
import { playIcon, nextIcon, previousIcon, pauseIcon } from '../components/Constants';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { MiniPlayerContext } from '../AlbumFetch/SongCard';
import {motion} from 'framer-motion'

const togglePlayPause = (value) => {
  value ? pauseIcon : playIcon
}

const MiniPlayerCard = ({ data }) => {


  const songUrl = data?.downloadUrl[4]?.link
  let audio = new Audio(songUrl);

  const [isPlaying, setisPlaying] = useState(false);
  const myRef = useRef(audio);
  const {setshowMiniPlayer} = useState();
  

 

  return (
    <motion.div style={{
      background: '#0F2027',
background: '-webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027)',
background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }} 
    className='flex flex-row h-[10vh] w-[80vw] bg-[#eeeee4] rounded-lg   bottom-1 sticky'>

      <div className=' h-[90%] w-[4.5vw] m-1 ml-2'>
        <img
          className='h-full w-full rounded-lg'
          src={data?.image[2]?.link}
        />
      </div>

      <div className='flex flex-col w-[25%] justify-center'>
        <span className='text-lg font-bold  pl-3 text-white'>{data?.name}</span>
        <span className='text-sm  pl-3 text-white' >{data?.primaryArtists}</span>
      </div>


      <div className='w-[35%] flex items-center justify-evenly'>
        <button onClick={() => {

        }}>{previousIcon}</button>

        

        <div onClick={() => {

          if(isPlaying){
            setisPlaying(false);
          myRef.current.pause();
          }
          else{
            setisPlaying(true);
          myRef.current.play();
          }
          


        }}>

          {
            isPlaying ? pauseIcon : playIcon
          }

        </div>
        <button>{nextIcon}</button>


      </div>

      <button onClick={() => {
        setshowMiniPlayer(false);
      }}><CancelRoundedIcon /></button>
    </motion.div>
  )
}

export default MiniPlayerCard