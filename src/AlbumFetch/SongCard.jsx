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
    const { setshowMiniPlayer } = useState('');

    const data = useSelector((state) => {
        return state.player;

    })




    return (



        <div className={' flex bg-[black] h-[10vh] w-[90%] items-center justify-center rounded-xl cursor-pointer hover:opacity-70 '}

        >

            <div className='h-full  flex items-center justify-center'>
                <img
                    src={image}
                    className='w-[60px] h-[60px] rounded-lg ml-2 '
                />
            </div>


            <div className=' w-[60%] h-full flex flex-col justify-center '>
                <span className='pl-5  text-white  truncate'>{name}</span>
                <span className='pl-5 font-thin text-sm mt-1 text-white  truncate'>{artists}</span>
            </div>

            <div className='flex flex-row w-[25%] justify-around '>

                <div className=' w-[10%] flex items-center justify-center '>
                    <BsHeart   className='cursor-pointer text-white text-[24px]' />
                </div>
                <div className='  w-[8%] flex items-center justify-center'>
                    <RxDotsHorizontal className='cursor-pointer text-white' />
                </div>

                <div className=' w-[8%] justify-center hidden'>
                    <span className='text-sm text-white'>{minute}:{second}</span>
                </div>

            </div>


        </div>





    )

}

export default SongCard