import React, { useContext } from 'react'
import { Context } from '../components/ContextApi'
import AlbumCard from '../components/AlbumCard';
import { FitScreen, Repeat } from '@mui/icons-material';
import { Skeleton } from '@mui/material';

const TopPicks = ({pick}) => {

    const {searchResults } = useContext(Context);
    const {loading} = useContext(Context);
    
  return (
    <div className=''>
     
        <h3 className='font-bold  text-xl ml-[4%] text-white'>Top Picks</h3>
     
   
         <div  className='grid  w-[90vw] grid-cols-autofill p-5'>
          {
            searchResults?.new_albums?.map((item) => {
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

export default TopPicks