import React, { useContext } from 'react'
import { Context } from '../components/ContextApi'
import AlbumCard from '../components/AlbumCard';

const Artists = ({pick}) => {

    const {searchResults } = useContext(Context);
    
  return (
    <div className='mt-14 bg-[#0a0a0b] w-[100vw] h-full flex flex-col  items-end'>
     <span className='pl-[56px] mt-9  text-xl font-bold text-white flex w-[90vw]'>Top Artists</span>
        {/* <div className='grid grid-cols-8 xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'> */}
         <div className='grid w-[90vw] grid-cols-autofill p-5'>
          {
            searchResults?.artist_recos?.map((item) => {
              return (
                <AlbumCard
                  key={item?.id}
                  album={item}
                />
              );
            })
          }
        </div>
      </div>
  );
}

export default Artists