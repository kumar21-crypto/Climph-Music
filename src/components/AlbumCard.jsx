import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const AlbumCard = ({ album }) => {


  const navigate = useNavigate();

  return (


    <div className='flex flex-col justify-center items-center m-2 p-2  '>

      <div style={{
      }}
        className='flex flex-col justify-center items-center'>
        <img
          className='w-32 h-32 rounded-3xl shadow-2xl cursor-pointer hover:-translate-y-1
          hover:scale-110 duration-500 hover:opacity-80 bg-opacity-80  backdrop-blur-sm' 
          src={album?.image}
          loading="lazy"
          onClick={() => {
            navigate('/albumdetail', { state: { data: album } });
          }}
        />




        <p style={{
          fontSize: 15, maxLines: 1, maxWidth: 130,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginTop: 5,
          color:'white'
        }}>
          {album?.title}
        </p>
      </div >

    </div>


  );
}

export default AlbumCard