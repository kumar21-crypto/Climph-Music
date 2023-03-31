import React, { useContext } from 'react'
import { Context } from '../components/ContextApi'
import AlbumCard from '../components/AlbumCard';
import { FitScreen, Repeat } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';

const TopPicks = ({ pick }) => {

  const { searchResults } = useContext(Context);
  const { loading } = useContext(Context);

  return (
    <div className='flex flex-col mt-2 overflow-hidden w-full '>

      <span className='text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex' >Top Picks</span>


      <div className='grid  w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-autofill  p-5'>
        {
          searchResults?.new_albums?.map((item) => {
            return (
              loading ?
                <AlbumCard
                  key={item?.id}
                  album={item}
                />
                :
                <div className='flex flex-col items-center'>
                  <Skeleton sx={{ bgcolor: '#ABB2B9', marginRight: 2, marginTop: 2, marginLeft: 2, borderRadius: 5 }} variant="rectangular" width={128} height={128} />
                  <Skeleton sx={{ bgcolor: '#ABB2B9', marginTop: 1, borderRadius: 5 }} variant="text" width={100} height={18} />
                </div>


            );
          })
        }
      </div>
    </div>
  );
}

export default TopPicks