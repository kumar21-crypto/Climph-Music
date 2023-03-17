import React, { useState, createContext, useEffect, Component, useContext, useReducer } from 'react'
import { BsHeart } from 'react-icons/bs'
import { RxDotsHorizontal } from 'react-icons/rx'
import { useSelector } from 'react-redux';


export const MiniPlayerContext = createContext();

const SongCard = ({ song, i }) => {

    const image = song?.image[1]?.link;
    const name = song?.name;
    const artists = song?.primaryArtists;
    const duration = (song?.duration);
    const minute = Math.floor(duration / 60);
    const second = duration - minute * 60;
    const [selectSong, setselectSong] = useState(false);
    const {setshowMiniPlayer} = useState('');

    const data = useSelector((state) => {
        return state.player;
    
      })

     
      

    return (



        <div className={'songcard flex bg-[black] h-[10vh] w-[90%] items-center rounded-xl cursor-pointer hover:opacity-70 ' }
    
        >

            <div className='h-full w-[10%] flex items-center justify-center'>
                <img
                    src={image}
                    className='w-[78%] h-[80%] rounded-lg '
                />
            </div>


            <div className=' h-full w-[60%] flex flex-col'>
                <span className='text-lg text-white truncate font-bold pt-2 pl-1'>{name}</span>
                <span className='truncate text-white text-sm pt-1 pl-1 '>{artists}</span>
            </div>

            <div className='w-[30%] flex items-end f-full justify-evenly'>

            <div className='ml-[8%]  w-[10%] flex items-center justify-center '>
                <BsHeart className='cursor-pointer text-white' />
            </div>
            <div className='  w-[8%] flex items-center justify-center'>
                <RxDotsHorizontal className='cursor-pointer text-white' />
            </div>

            <div className=' w-[8%] flex justify-center'>
                <span className='text-sm text-white'>{minute}:{second}</span>
            </div>

            </div>


        </div>





    )

}

export default SongCard