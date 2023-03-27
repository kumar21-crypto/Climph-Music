import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SongCard from '../AlbumFetch/SongCard';
import { searchByQuery, searchByQuerySaavn, fetchSongDetailDataByLink } from '../components/Api'
import { BsHeart, BsShareFill } from 'react-icons/bs'
import { RxDotsVertical } from 'react-icons/rx'
import { HiPlay } from 'react-icons/hi'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSongsArray, setCurrentSong } from '../components/Slices/PlayerSlice';
import Skeleton from '@mui/material/Skeleton';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SongMenu from '../components/SongMenu';
import Menu from "@mui/material/Menu";
import { MdPlaylistAdd } from 'react-icons/md';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { IoRadio } from 'react-icons/io5';

const SearchResult = () => {
  const location = useLocation();
  const searchQuery = location?.state?.data;
  const [searchQueryResults, setsearchQueryResults] = useState("");
  const [searchQuerySaavn, setsearchQuerySaavn] = useState("");
  const [loading, setloading] = useState(false);
  const [arrayOnce, setarrayOnce] = useState(false);
  const [songData, setsongData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let songs = [];
  const data = useSelector((state) => {
    return state.player;

  })

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  useEffect(() => {
    if (searchQuery != null) {
      fetchQuery(searchQuery);
    }

  }, [])


  // fetch query 
  const fetchQuery = (query) => {

    // docs saavn
    searchByQuery(`${query}`).then((res) => {
      setsearchQueryResults(res?.data);
      setloading(true);
    })

    // jio saavn
    searchByQuerySaavn(`${query}`).then((res) => {
      setsearchQuerySaavn(res);
    })

  }

  // fetch query songs and push in a array
  const fetchSongDetails = (link) => {
    fetchSongDetailDataByLink(link).then((res) => {
      songs.push(res?.data[0]);
    })

  }




  return (
    <div className='mt-14 bg-[black] w-[100vw] h-auto flex items-center  flex-col md:w-[85vw] lg:flex-row '
    >

      <Skeleton variant='rectangular' width={50} height={50}
      />

      {/* left work */}
      <div className='w-[90%] h-full flex flex-col'>

        <div className='w-full h-auto  pt-1 pb-2 bg-[#202026] mt-3 rounded-lg'>

          <span className='text-white pl-7 pt-1 font-bold text-sm w-full flex' >Top Result</span>
          <div className=' mt-2 h-full flex items-center bg-[#202026]  flex-col justify-center w-full'>
            {

              searchQueryResults?.topQuery?.results?.map((item, index) => {

                return (
                  <div className='flex w-full h-full '>

                    <div className='w-[30%] h-full flex  items-center justify-center '>
                      {
                        loading ?

                          <img
                            className='w-[60px] h-[60px] cursor-pointer rounded-lg hover:opacity-70 '
                            src={item?.image[2]?.link}
                            loading='lazy'
                            onClick={() => {
                              navigate('/albumdetail', { state: { data: item } });
                            }}

                          />

                          :

                          <Skeleton variant='rectangular' height={250} width={250} animation='wave'
                          />

                      }



                    </div>

                    <div className='flex flex-col  h-full justify-center w-[60%] '>
                      <span className='text-white text-md font-bold cursor-pointer truncate'>{item?.title}</span>
                      <span className='text-white text-sm'>{item?.description}</span>
                    </div>
                  </div>
                )

              })


            }

          </div>


        </div>

        <div className='w-full h-auto bg-[#202026] mt-10 rounded-lg pt-1 pb-2'>

          <span className='text-white pl-7 pt-1 font-bold text-sm w-full flex' >Related Albums</span>

          <div className='h-full w-full mt-2 sm:mt-4 flex flex-col items-center justify-center sm:flex-row'>

            {
              searchQueryResults?.albums?.results?.map((item, index) => {
                return (

                  <div className=' w-full p-1 flex flex-col items-center justify-center mb-5'>

                    <img
                      style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                      }}
                      className='w-[150px] h-[150px] cursor-pointer sm:w-[120px] sm:h-[120px] rounded-lg  mb-10'
                      src={item?.image[2]?.link}
                      loading='lazy'
                      onClick={() => {
                        navigate('/albumdetail', { state: { data: item } });
                      }}

                    />


                    <span className='text-white bg-[#104440] text-lg flex justify-center items-center font-bold truncate w-[200px] sm:w-[150px]'>{item?.title}</span>


                  </div>
                )
              })
            }

          </div>

        </div>


      </div>


      {/* right work */}
      <div className='w-full h-auto mb-28 flex justify-center'>


        <div className='w-[90%] h-full bg-[#202026] mt-10 lg:mt-3 mb-5 rounded-lg '>

          <span className='text-white pl-7 pt-5 font-bold  w-full flex' >Related Songs</span>

          <div className='h-full w-full  flex flex-col  items-center mb-3'>

            {

              searchQuerySaavn?.results?.map((item, index) => {

                fetchSongDetails(item?.perma_url);

                return (

                  <div className='w-[92%] h-[10vh] bg-[black] rounded-lg mt-2 flex flex-row items-center p-2 cursor-move hover:opacity-70 '
                  >

                    <img
                      className='w-[80px] h-[80px] rounded-lg cursor-pointer '
                      src={item?.image}
                      loading='lazy'
                      onClick={() => {
                        
                        {
                          arrayOnce ?
                            dispatch(setCurrentSong(index))
                            :
                            dispatch(setSongsArray(songs));
                            dispatch(setCurrentSong(index));
                        }

                        setarrayOnce(true);

                      }}
                    />

                    <div className=' w-[60%] h-full flex flex-col '>
                      <span className='pl-5 font-medium text-white  truncate'>{item?.title}</span>
                      <span className='pl-5 text-sm mt-1 text-white  truncate'>{item?.subtitle}</span>
                    </div>

                    <div className='flex flex-row w-[25%] justify-around  '>
                      <BsHeart className='text-white' />
                      <RxDotsVertical className='text-white cursor-pointer' onClick={handleClick} />

                    </div>

                    <Menu
                      keepMounted
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      open={Boolean(anchorEl)}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon><IoRadio/></ListItemIcon>
                        <ListItemText>Start radio</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon><HiOutlineFolderAdd/></ListItemIcon>
                        <ListItemText>Add to library</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon><MdPlaylistAdd/></ListItemIcon>
                        <ListItemText>Add to playlist</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon><BsShareFill/></ListItemIcon>
                        <ListItemText>Share</ListItemText>
                      </MenuItem>
                    </Menu>

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