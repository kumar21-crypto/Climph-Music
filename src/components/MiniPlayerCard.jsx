import React, { useState, useEffect, useContext, useRef } from 'react'
import { playIcon, nextIcon, previousIcon, pauseIcon } from '../components/Constants';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { MiniPlayerContext } from '../AlbumFetch/SongCard';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { setCompletePlayPause, setCurrentSongId, setPlayPause, setCurrentSongRef, setCurrentSong } from '../components/Slices/PlayerSlice';
import { BsPlayCircleFill, BsPauseCircleFill, BsSkipStartFill, BsSkipEndFill, BsRepeat, BsThreeDotsVertical } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { prominent, average } from 'color.js';
import chroma from 'chroma-js';
import { useNavigate } from 'react-router-dom';


const MiniPlayerCard = ({ data, i }) => {


  const dispatch = useDispatch();
  const [bgColor, setbgColor] = useState('#000000');

  const [currentAudio, setcurrentAudio] = useState(null);
  const navigate = useNavigate();
  const [currentSongTime, setcurrentSongTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongTimeInMinSec, setcurrentSongTimeInMinSec] = useState(0);
  const [openMainPlater, setopenMainPlater] = useState(false);
  const [currentPlaylistOrNot, setcurrentPlaylistOrNot] = useState(false);

  const data1 = useSelector((state) => {
    return state.player;

  })


  prominent(data1.songlist[data1.currentSong]?.image[1]?.link, { amount: 1, format: 'hex', sample: 10 }).then(color => {
    const lowVibranceColor = chroma(color).desaturate(2).darken(2);
    setbgColor(lowVibranceColor);
  })

  const nextSong = () => {
    if (data1.currentSong === data1.songlist.length - 1) {
      dispatch(setCurrentSongId(data1.songlist[0].id))
      dispatch(setCurrentSong(0));
    } else {
      dispatch(setCurrentSongId(data1.songlist[data1.currentSong + 1].id));
      dispatch(setCurrentSong(data1.currentSong + 1));
    }
  }

  const previousSong = () => {
    if (data1.currentSong === 0) {
      dispatch(setCurrentSongId(data1.songlist[data1.songlist.length - 1].id))
      dispatch(setCurrentSong(data1.songlist.length - 1));
    } else {
      dispatch(setCurrentSongId(data1.songlist[data1.currentSong - 1].id));
      dispatch(setCurrentSong(data1.currentSong - 1));
    }
  }


  const playAudio = (url) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(url);
    dispatch(setPlayPause(true));
    setcurrentAudio(newAudio);

    newAudio.play();

    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(newAudio.duration));
    })

    newAudio.addEventListener("timeupdate", () => {
      setcurrentSongTime(Math.floor(newAudio.currentTime));
      setcurrentSongTimeInMinSec(` ${Math.floor(currentSongTime / 60)}:${currentSongTime % 60}`)
    })

    newAudio.addEventListener("ended", () => {
      if (data1.autoPlaySwitch === true) {
        nextSong();
      }
      else {
        dispatch(setPlayPause(false));
        currentAudio.pause();
      }
    })

  };


  useEffect(() => {
    if (data1.currentSongId === data1.songlist[data1.currentSong].id) {
      playAudio(data1.songlist[data1.currentSong].downloadUrl[4]?.link);
    }


  }, [data1.songlist[data1.currentSong]])




  const handleOpenMainPlayer = () => {
    if (openMainPlater) {
      setopenMainPlater(false);
      navigate(-1);
    }
    else {
      setopenMainPlater(true);
      navigate('/audioplayer');
    }
  }


  // const setUpMiniPlayer = () => {

  //   const songUrl = data?.downloadUrl[4]?.link;
  //   let audio = new Audio(songUrl);
  //   const myRef = useRef(audio);
  //   dispatch(setCurrentSongRef(myRef));
  //   dispatch(setPlayPause(true));
  //   myRef.current.play();

  // }


  // bg-[#1a535e]

  return (
    <motion.div
      style={{
        backgroundColor: `black`
      }}
      className='flex flex-col h-[8vh]  lg:h-[10vh] w-[100vw]   rounded-lg  bottom-14 md:bottom-0 fixed justify-center items-end'

    >

      <div className='h-1 w-full  ml-2 flex items-center mr-2'>
        <span className='ml-4 text-white text-md'>{Math.floor(currentSongTime / 60)}:{currentSongTime % 60 < 10 ? 0 : ""}{currentSongTime % 60}</span>
        <input className='w-full ml-2 mr-2 h-full outline-none' type='range' min={0} value={currentSongTime} max={duration} />
        <span className='mr-2 text-white text-md'>{Math.floor(duration / 60)}:{duration % 60}</span>
      </div>

      <motion.div className='flex flex-row h-full w-full   rounded-lg' >
        <div className=' h-full w-[12%] m-1 ml-2 flex justify-center items-center'>
          <img
            className='h-[60px] w-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-lg p-1'
            src={data1.songlist[data1.currentSong]?.image[1]?.link}
          />
        </div>

        <div onClick={handleOpenMainPlayer} className='flex flex-col w-[50%] justify-center'>
          <span className='text-md lg:text-lg font-bold truncate  text-white'>{data1.songlist[data1.currentSong]?.name}</span>
          <span className='text-sm truncate  text-white' >{data1.songlist[data1.currentSong]?.primaryArtists}</span>
        </div>


        <div className='w-[40%] h-full flex '>

          <div className='w-full flex items-center justify-around'>
            <button onClick={() => { previousSong() }}><BsSkipStartFill className='text-white  text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]' /> </button>

            <div onClick={() => {

              if (data1.isPlaying) {

                dispatch(setPlayPause(false));
                currentAudio.pause();
              }
              else {
                if (currentAudio === null) {
                  playAudio(data1.songlist[data1.currentSong].downloadUrl[4]?.link);

                }
                else if (currentAudio.currentTime > 0) {
                  dispatch(setPlayPause(true));
                  currentAudio.play();

                }

              }



            }}>

              {
                data1.isPlaying ? <BsPauseCircleFill className='text-white text-[30px] md:text-[32px] lg:text-[35px] xl:text-[37px]' /> : <BsPlayCircleFill className='text-white text-[30px] md:text-[32px] lg:text-[35px] xl:text-[37px]' />
              }

            </div>
            <button
              onClick={() => { nextSong() }}
            >
              <BsSkipEndFill className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]' />
            </button>

            <button
            >
              <BsThreeDotsVertical className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]' />
            </button>

            <button
              onClick={() => {
                dispatch(setCompletePlayPause(true))
                dispatch(setPlayPause(false));
                if (data1.isPlaying) {
                  currentAudio.pause();
                }


              }}
            >
              <GiCancel className='text-white text-[25px] md:text-[27px] xl:text-[31px] lg:text-[29px]' />
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