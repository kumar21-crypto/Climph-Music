import React, { useState, useEffect, useContext, useRef } from 'react'
import { playIcon, nextIcon, previousIcon, pauseIcon } from '../components/Constants';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { MiniPlayerContext } from '../AlbumFetch/SongCard';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { setCompletePlayPause, setPlayPause, setCurrentSongRef, setCurrentSong } from '../components/Slices/PlayerSlice';
import {BsPlayCircleFill,BsPauseCircleFill,BsSkipStartFill,BsSkipEndFill,BsRepeat,BsThreeDotsVertical} from 'react-icons/bs';
import {GiCancel} from 'react-icons/gi';

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
      className='flex flex-row h-[8vh] lg:h-[10vh] w-[100vw] bg-[#1a535e]  rounded-lg  bottom-14 md:bottom-0 fixed justify-center items-end'>

      <motion.div className='flex flex-row h-full w-full  rounded-lg' >
        <div className=' h-full w-[12%] m-1 ml-2 flex justify-center items-center'>
          <img
            className='h-[60px] w-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-lg p-1'
            src={data?.image[2]?.link}
          />
        </div>

        <div className='flex flex-col w-[50%] justify-center'>
          <span className='text-md lg:text-lg font-bold truncate  text-white'>{data?.name}</span>
          <span className='text-sm truncate  text-white' >{data?.primaryArtists}</span>
        </div>


        <div className='w-[40%] h-full flex '>

        <div className='w-full flex items-center justify-around'>
          <button onClick={() => {

            dispatch(setCurrentSong(data1.currentSong - 1));

          }}><BsSkipStartFill className='text-white  text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]'/> </button>



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
              data1.isPlaying ? <BsPauseCircleFill className='text-white text-[30px] md:text-[32px] lg:text-[35px] xl:text-[37px]'/> : <BsPlayCircleFill  className='text-white text-[30px] md:text-[32px] lg:text-[35px] xl:text-[37px]'/>
            }

          </div>
          <button
            onClick={() => {
              dispatch(setCurrentSong(data1.currentSong + 1));
            }}
          >
            <BsSkipEndFill className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]'/>
          </button>

          <button
          >
            <BsThreeDotsVertical className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]'/>
          </button>

           <button
           onClick={()=>{
            dispatch(setCompletePlayPause(true))
            dispatch(setPlayPause(false));
            myRef.current.pause();
           }}
          >
            <BsRepeat className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]'/>
          </button>
{/*
          <button onClick={() => {
          dispatch(setCompletePlayPause(true))
          dispatch(setPlayPause(false));
          myRef.current.pause();
        }}><GiCancel className='text-white hidden text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]'/></button> */}


        </div>
        </div>

        
      </motion.div>
    </motion.div>
  )
}

export default MiniPlayerCard