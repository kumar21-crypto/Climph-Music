import React, { useState, useEffect, useContext, useRef } from 'react'
import { playIcon, nextIcon, previousIcon, pauseIcon } from '../components/Constants';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { MiniPlayerContext } from '../AlbumFetch/SongCard';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { setCompletePlayPause, setPlayPause, setCurrentSongRef, setCurrentSong } from '../components/Slices/PlayerSlice';



const MiniPlayerCard = ({ data, i }) => {


  const dispatch = useDispatch();

  const data1 = useSelector((state) => {
    return state.player;

  })

  

  useEffect(() => {

    if (data1.isPlaying) {
      dispatch(setPlayPause(false));
      myRef.current.pause();
    }

  }, [])


  const songUrl = data?.downloadUrl[4]?.link;
  let audio = new Audio(songUrl);
  const myRef = useRef(audio);



  return (
    <motion.div
      className='flex flex-row h-[10vh] w-[100vw] bg-[#1a535e]  rounded-lg   bottom-0 fixed justify-center items-end'>

      <motion.div className='flex flex-row h-full w-[80vw]  rounded-lg' >
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

            dispatch(setCurrentSong(data1.currentSong - 1));

          }}>{previousIcon}</button>



          <div onClick={() => {

            if (data1.isPlaying) {
              dispatch(setPlayPause(false));
              myRef.current.pause();
            }
            else {
              dispatch(setPlayPause(true));
              myRef.current.play();
            }



          }}>

            {
              data1.isPlaying ? pauseIcon : playIcon
            }

          </div>
          <button
            onClick={() => {
              dispatch(setCurrentSong(data1.currentSong + 1));
            }}
          >
            {nextIcon}
          </button>


        </div>

        <button onClick={() => {
          dispatch(setCompletePlayPause(true))
          dispatch(setPlayPause(false));
          myRef.current.pause();
        }}><CancelRoundedIcon /></button>
      </motion.div>
    </motion.div>
  )
}

export default MiniPlayerCard