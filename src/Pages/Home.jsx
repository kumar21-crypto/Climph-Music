import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/ContextApi'
import AlbumCard from '../components/AlbumCard';
import TopPicks from '../AlbumFetch/TopPicks';
import { motion } from 'framer-motion'
import ArtistCard from '../components/ArtistCard';
import { AlbumDetailContext } from './AlbumDetail';


// const globalSong = () => {

//     const {searchResults } = useContext(Context);

//     <div  className='grid w-[90vw] grid-cols-autofill p-5'>
//           {
//             searchResults?.artist_recos?.map((item) => {
//               return (
//                 <AlbumCard
//                   key={item?.id}
//                   album={item}
//                 />
//               );
//             })
//           }
//         </div>
// }


const Home = ({ children }) => {

    const { searchResults } = useContext(Context);
    const { loading } = useContext(Context);
    const { showMiniPlayer} = useContext(AlbumDetailContext);


    return (
        <div
            className='w-[100vw] mt-[60px] bg-[#0a0a0b] flex flex-col justify-center items-end'>

            <TopPicks />

            {/* top artists */}

            <div className='mt-[1%]'>
                <span className='ml-[2%] text-xl font-bold text-white'>Top Artists</span>
                <div className='grid w-[90vw] grid-cols-autofill p-5'>
                    {
                        searchResults?.artist_recos?.map((item) => {
                            return (
                                <ArtistCard
                                    key={item?.id}
                                    album={item}
                                />
                            );
                        })
                    }
                </div>
            </div>

            {/* city mood */}

            <div className='mt-[1%]'>
                <span className='ml-[4%] text-xl font-bold text-white'>City Mod</span>
                <div className='grid w-[90vw] grid-cols-autofill p-5'>
                    {
                        searchResults?.city_mod?.map((item) => {
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

            {/* promo data 70 */}

            <div className='mt-[1%]'>
                <span className='ml-[2%] text-xl font-bold text-white'>Devotional world</span>
                <div className='grid w-[90vw] grid-cols-autofill1 p-5'>
                    {
                        searchResults['promo:vx:data:107']?.map((item) => {
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

            <div className='fixed w-[90vw] h-[10vh] flex  flex-col items-end   justify-end  bottom-1'>
                {showMiniPlayer ? <MiniPlayerCard
                    data={selectSong}
                />
                    : ""

                }

            </div>

        </div>
    );
}

export default Home