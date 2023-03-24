import React, { useContext } from 'react'
import { Context } from '../components/ContextApi'
import AlbumCard from '../components/AlbumCard';

const Browse = ({pick}) => {

    const {searchResults } = useContext(Context);
  return (
    <div className='bg-[black] h-auto  box-border w-[100vw] flex flex-col items-center
    md:w-[85vw]'>
      
      <span className='text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex' >Top Picks</span>
      
        
         <div className='grid md:w-[85vw] w-[100vw] lg:w-[90vw] grid-cols-2 sm:grid-cols-autofill  p-5'>
          {
            searchResults?.browse_discover?.map((item) => {
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

export default Browse