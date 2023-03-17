import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SongCard from '../AlbumFetch/SongCard';
import { searchByQuery, fetchSongDetailDataByLink } from '../components/Api'
import { BsHeart } from 'react-icons/bs'
import { RxDotsVertical } from 'react-icons/rx'
import { HiPlay } from 'react-icons/hi'
import '../index.css'
import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSongsArray, setCurrentSong } from '../components/Slices/PlayerSlice';

const SearchResult = () => {
  const location = useLocation();
  const searchQuery = location?.state?.data;
  const [searchQueryResults, setsearchQueryResults] = useState("");
  const [loading, setloading] = useState(false);
  const [songData, setsongData] = useState('');
  const dispatch = useDispatch();
  let songs = [];
  const data = useSelector((state) => {
    return state.player;

  })


  useEffect(() => {
    if (searchQuery != null) {
      fetchQuery(searchQuery);
    }

    searchQueryResults?.songs?.results?.map((item) => {
      fetchSongDetailDataByLink(item?.url).then((res) => {
        songs.push(res?.data[0]);
      })
    })
    setsongData(songs);

  }, [])

  const fetchQuery = (query) => {
    searchByQuery(`${query}`).then((res) => {
      setsearchQueryResults(res?.data);
      setloading(true);
    })
  }


  console.log(songData);




  return (
    <div className='mt-14 bg-[black] w-[100vw] h-screen flex items-end flex-row'
    >

      {/* left work */}
      <div className='w-[50vw] h-full  ml-[10vw] flex flex-col items-center'>

        <div className='w-[90%] h-[40vh] bg-[#202026] mt-10 rounded-lg'>

          <span className='text-white pl-7 pt-5 font-bold  w-full flex' >Top result</span>
          <div className='  h-full flex items-center flex-col justify-center w-full'>
            {

              searchQueryResults?.topQuery?.results?.map((item, index) => {

                return (
                  <div className='flex w-full h-full  p-1 '>

                    <div className='w-[35%] h-full flex  items-center justify-center '>
                      {
                        loading ?

                          <img
                            className='w-[250px] h-[250px] rounded-lg hover:opacity-70 '
                            src={item?.image[2]?.link}

                          />

                          :

                          <Skeleton variant='rectangular' height={250} width={250} animation='wave'
                          />

                      }



                    </div>

                    <div className='flex flex-col  h-full justify-center w-[60%] '>
                      <span className='text-white text-2xl font-bold'>{item?.title}</span>
                      <span className='text-white text-lg mt-3'>{item?.description}</span>
                    </div>
                  </div>
                )

              })


            }

          </div>


        </div>

        <div className='w-[90%] h-auto bg-[#202026] mt-10 rounded-lg'>

          <span className='text-white pl-7 pt-5 font-bold  w-full flex' >Related Albums</span>

          <div className='h-full w-full  flex flex-row items-center justify-center'>

            {
              searchQueryResults?.albums?.results?.map((item, index) => {
                return (

                  <div className=' w-full p-1 flex flex-col items-center mb-5'>

                    <img
                      style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                      }}
                      className='w-[250px] h-[250px] rounded-lg  mb-10'
                      src={item?.image[2]?.link}

                    />


                    <span className='text-white text-lg font-bold truncate max-w-[200px]'>{item?.title}</span>


                  </div>
                )
              })
            }

          </div>

        </div>


      </div>


      {/* right work */}
      <div className='w-[40vw] h-full flex justify-center'>


        <div className='w-[90%] h-[40vh] bg-[#202026] mt-10 rounded-lg '>

          <span className='text-white pl-7 pt-5 font-bold  w-full flex' >Related Songs</span>

          <div className='h-full w-full  flex flex-col  items-center mb-3 '>

            {

              songData?.map((item, index) => {

                return (

                  <div className='w-[92%] h-[10vh] bg-[black] rounded-lg mt-2 flex flex-row items-center p-2 cursor-pointer hover:opacity-70 '
                  onClick={()=>{
                    dispatch(setSongsArray(songData));
                    dispatch(setCurrentSong(index));
                  }}
                  >

                    <img
                      className='w-[80px] h-[80px] rounded-lg '
                      src={item?.image[1]?.link}
                    />

                    <div className=' w-[60%] h-full flex flex-col '>
                      <span className='pl-5 font-medium text-white  truncate'>{item?.name}</span>
                      <span className='pl-5 text-sm mt-1 text-white  truncate'>{item?.primaryArtists}</span>
                    </div>

                    <div className='flex flex-row w-[25%] justify-around  '>
                      <BsHeart className='text-white' />
                      <RxDotsVertical className='text-white' />

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

      export default SearchResult

      {/* <div className='w-[92%] h-[10vh] bg-[black] rounded-lg mt-2 flex flex-row items-center p-2 cursor-pointer hover:opacity-70 '
                  onClick={()=> {
                    // dispatch(setSongsArray(searchQueryResults?.songs?.results));
                    // dispatch(setCurrentSong(index));
                    // console.log(data.songlist);
                  }}
                  >

                    <img
                      className='w-[80px] h-[80px] rounded-lg '
                      src={item?.image[1]?.link}
                    />

                    <div className=' w-[60%] h-full flex flex-col '>
                      <span className='pl-5 font-medium text-white  truncate'>{item?.title}</span>
                      <span className='pl-5 text-sm mt-1 text-white  truncate'>{item?.singers}</span>
                    </div>

                    <div className='flex flex-row w-[25%] justify-around  '>
                      <BsHeart className='text-white' />
                      <RxDotsVertical className='text-white' />
                    </div>


                  </div> */}