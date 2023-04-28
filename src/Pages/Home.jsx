import React, { useContext, useEffect, useState,useRef } from 'react'
import { Context } from '../components/ContextApi';
import AlbumCard from '../components/AlbumCard';
import TopPicks from '../AlbumFetch/TopPicks';
import ArtistCard from '../components/ArtistCard';
import { useDispatch,useSelector } from 'react-redux';
import HomeCarousel from '../components/HomePart/HomeCarousel';

const Home = ({ children }) => {

    const { searchResults } = useContext(Context);
    const { loading } = useContext(Context);
    const [bgcolor, setbgcolor] = useState('');
    const data  = useSelector((state) =>{
        return state.player;
       
      })

      useEffect(() => {

        
        
      }, [])



    return (
        <div
            className='w-[100vw] mt-[1vh] h-auto flex flex-col md:w-[85vw]
             '>


            <HomeCarousel />
            <TopPicks />

            {/* top artists */}

            <div className='mt-[1%] w-full'>
            <span className='text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex' >Top Picks</span>
                <div className='grid  w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-autofill  p-5'>
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

            <div className='mt-[1%] w-full'>
            <span className='text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex' >City Mood</span>
                <div className='grid  w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-autofill  p-5'>
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

            <div className='mt-[1%] w-full'>
            <span className='text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex' >Devotional world</span>
                <div className='grid  w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-autofill  p-5'>
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

            {/* mini player card */}

            {/* <div className='fixed w-[90vw] h-[10vh] flex  flex-col items-end   justify-center  bottom-1 '>
        {data.comPlayPause ? " "
          :
          <MiniPlayerCard
          data={data.songlist[data.currentSong]}
        />

        }
      </div> */}

        </div>
    );
}

export default Home