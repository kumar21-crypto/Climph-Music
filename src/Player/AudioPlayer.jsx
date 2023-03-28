import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompletePlayPause,setPlayerAutoPlaySwitch, setPlayPause, setCurrentSongRef, setCurrentSong, setCurrentSongId } from '../components/Slices/PlayerSlice';
import { MdPlaylistAdd } from 'react-icons/md';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { IoRadio } from 'react-icons/io5';
import Chip from '@mui/material/Chip';
import { Switch } from '@mui/material';
import { RxDotsVertical } from 'react-icons/rx';
import AppBar from '@mui/material/AppBar';
import { FaPlay } from 'react-icons/fa';

const AudioPlayer = () => {

  const dispatch = useDispatch();
  const [showPlay, setshowPlay] = useState(false);
  const [hoveredItem, sethoveredItem] = useState(null);
  const [autoPlaySwitch, setautoPlaySwitch] = useState(false);
  const [selectedSong, setselectedSong] = useState("");

  const data = useSelector((state) => {
    return state.player;

  })

  const autoPlayHandle = (event) => {
    if(event.target.checked){
      dispatch(setPlayerAutoPlaySwitch(true));
    }
    else{
      dispatch(setPlayerAutoPlaySwitch(false));
    }
    
  }


  return (
    <div className=' w-[85vw] h-[85vh] mt-[5vh] flex items-center justify-center'>
      <div className='w-[90%] h-[80%] flex flex-row'>

        {/* left work */}
        <div className='h-full w-[45%]  flex flex-col justify-center items-center'>
          <img
            src={data.songlist[data.currentSong].image[2].link}
            className='w-[81%] h-[84%] rounded-xl'
          />


          <div className='w-[80%] h-[16%] text-white flex justify-evenly items-center '>
            <Chip label="Start Radio" clickable variant='outlined' sx={{ color: 'white', padding: 1 }} icon={<IoRadio size={16} />} />
            <Chip label="Add Playlist" clickable variant='outlined' sx={{ color: 'white', padding: 1 }} icon={<MdPlaylistAdd size={16} />} />
            <Chip label="Add to Libaray" clickable variant='outlined' sx={{ color: 'white', padding: 1 }} icon={<HiOutlineFolderAdd size={16} />} />

          </div>

    
          {/* <div className='w-[50px] h-[50px]'>
          <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_fmFSzb.json"  background="transparent"  speed="1"    loop  autoplay></lottie-player>
          </div> */}

        </div>


        {/* right work */}
        <div className='h-auto w-[55%] overflow-y-scroll  scroll-smooth overflow-hidden'>

          <div className='w-[42.1vw] h-[3vh] z-0 bg-[black] sticky overflow-hidden overflow-y-scroll flex justify-center items-center'>
            <span className='text-white text-md font-bold'>AutoPlay</span>
            <div className='w-[80%]'></div>
            <Switch onChange={autoPlayHandle} />
          </div>


          <div className='w-full h-auto flex overflow-hidden  items-center mt-4 pb-4 pt-2 bg-[#202026] flex-col'>

            {
              data?.songlist?.map((item, index) => {

                return (

                  < div className={`w-[92%] h-[10vh] bg-[black] rounded-lg mt-2 flex flex-row items-center p-2 cursor-move `
                }
                onClick={()=>{
                  dispatch(setCurrentSongId(item?.id));
                }}
                  >

                    <div className='relative'>
                     
                     <div className='top-7 left-7  absolute'>
                      {
                        data.isPlaying ? 
                        <div className={`w-[30px] h-[30px] ${data.currentSongId === item?.id ? `flex` : `hidden`}`}>
                        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_fmFSzb.json"  background="transparent"  speed="1"    loop  autoplay></lottie-player>
                        </div>
                        :
                    <FaPlay className={` ${hoveredItem===index ? "flex opacity-100 text-[white]" : "hidden"}`} onClick={()=>{dispatch(setCurrentSong(index));}} />
                      }
                    </div>
                      <img
                        className={`w-[80px] h-[80px] hover:opacity-30  rounded-lg cursor-pointer ${data.currentSongId === item?.id ? `opacity-30` : ``} `}
                        src={item?.image[1]?.link}
                        loading='lazy'
                        onClick={() => {
                          dispatch(setCurrentSong(index));
                        }}
                        onMouseEnter={()=>{sethoveredItem(index)}}
                        onMouseLeave={()=>{sethoveredItem(null)}}
                       
                      />

                    </div>

                    <div className=' w-[80%] h-full flex flex-col '>
                      <span className='pl-5 font-medium text-white  truncate'>{item?.name}</span>
                      <span className='pl-5 text-sm mt-1 text-white  truncate'>{item?.primaryArtists}</span>
                    </div>

                    <div className='flex flex-row w-[5%] justify-around  '>

                      <RxDotsVertical className='text-white cursor-pointer' />

                    </div>
                  </div>

                )

              })

            }



          </div>

        </div>
      </div>
    </div>
  )
}

export default AudioPlayer