import { useLocation } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react';
import { fetchDetailDataFromApi, fetchArtistDetailById, fetchPlaylistByID, fetchSongDetailDataByLink,fetchAlbumData,fetchPlaylistData } from '../components/Api';
import SongCard from '../AlbumFetch/SongCard';
import MiniPlayerCard from '../components/MiniPlayerCard';
import { Skeleton } from '@mui/material';
import '../../src/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSongsArray, setCurrentSong } from '../components/Slices/PlayerSlice';


export const AlbumDetailContext = createContext();

const AlbumDetail = (props) => {

  const location = useLocation();
  const type = location?.state?.data?.type;
  const id = location?.state?.data?.id;
  const url  = location?.state?.data?.perma_url;


  // const artistID = detailresult?.data?.primaryArtistsId;
  // const songUrl = detailresult?.data?.songs[0]?.downloadUrl[3]?.link;
  // const playlistID = location?.state?.data?.id;
  // const albumID = location?.state?.data?.id;

  // const [playlistDetail, setplaylistDetail] = useState('');
  const [albumType, setalbumType] = useState('');
  // const playlistImage = playlistDetail?.data?.image[2]?.link;
  // const [songDetailData, setsongDetailData] = useState('');
  // const [loading, setloading] = useState(false);
  const [playlistData, setplaylistData] = useState('');
  const [albumData, setalbumData] = useState('');
  const [playlistData1, setplaylistData1] = useState('');
  const [albumData1, setalbumData1] = useState('');
  const [bgcolor, setbgcolor] = useState('')

  var image = albumData?.image;
  var color1 = "#000000";
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    return state.player;

  })




  useEffect(() => {
    if (type === 'album') {

      fetchDetailDataFromApi(`${url}`).then((res) =>{
        setalbumData1(res);
        dispatch(setSongsArray(res?.data?.songs));
      })

      fetchAlbumData(`${id}`).then((res) => {
        setalbumData(res);
      })
     
      setalbumType(true);
      image = albumData1?.data?.image[2].link;
      
    }
    else if (type === 'playlist') {
      
      fetchPlaylistByID(`${id}`).then((res) =>{
        setplaylistData1(res);
        dispatch(setSongsArray(res?.data?.songs));
      })

      image = playlistData1?.data?.image[2]?.link;

      fetchPlaylistData(`${id}`).then((res) => {
        setplaylistData(res);
      })
     
      setalbumType(false);
      
    }
    else if (type === 'song') {
      
    }




  }, [])

  
 
  colorjs.prominent(image,{amount:1,format:'hex'}).then((color) =>{
    console.log(color);
    setbgcolor(color);
  })

  const setCurrent = (index) => {
    dispatch(setCurrentSong(index));
  }



  return (


    <div className='w-[100vw] mt-16 flex flex-col bg-[black] h-full items-center  overflow-hidden justify-center '>
      <div className='w-[100vw] flex flex-row bg-[black] h-full overflow-hidden justify-end'>

        {/* left work */}
        <div 
             className='w-[60vw] h-full  flex flex-col items-center '>

          {/* album work */}
          <div 
          style={{
            backgroundColor:`${bgcolor}`
          }}
          className={`w-[90%] h-[40vh] mt-10 rounded-lg flex flex-col`}>
            <span className='text-white pl-7 pt-5 font-bold  w-full flex' >{albumType ? "Album" : "Playlist"}</span>
            <div className='flex w-full p-1 items-center h-full '>

              <div className='w-[30%] h-full  flex items-center justify-center '>
                <img
                  className='w-[250px] h-[250px] rounded-lg hover:opacity-70 '
                  src={
                    image
                  }

                />


              </div>


              <div className='flex flex-col ml-10  w-[72%%] h-full justify-center pl-2'>
                <span className='text-black text-2xl font-bold'>{albumType ? albumData?.title : playlistData?.title}</span>
                <span className='text-black text-lg mt-3'>{albumType ? albumData?.header_desc : playlistData?.header_desc}</span>
                <span className='text-black text-md mt-3'>{albumType ? "" : playlistData?.more_info?.subtitle_desc[1]}</span>
                <span className='text-black text-md mt-3'>{albumType ? "" : playlistData?.more_info?.subtitle_desc[0]}</span>
              </div>


            </div>

          </div>

          {/* songs work  */}
          <div className='w-[90%] h-auto bg-[#202026] mt-10 rounded-lg flex flex-col pb-5'>
            <span className='text-white pl-7 pt-5  font-bold  w-full flex' >Songs</span>

            {

              albumType ?

              data?.songlist?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center  selected' onClick={() => {
                      setCurrent(index);
          
                    }}>
                      <SongCard
                        key={index}
                        song={item}
                        i={index}
                      />
                    </div>

                  )
                })

                :

                data?.songlist?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center  ' onClick={() => {
                      setCurrent(index);
              
                      
                    }}>
                      <SongCard
                        key={index}
                        song={item}
                        i={index}
                      />
                    </div>

                  )
                })

            }
          </div>

        </div>

        {/* right work */}
        <div className='w-[30vw] h-full  flex justify-center '>

        <div className='w-[90%] h-auto bg-[#202026] mt-10 rounded-lg flex flex-col items-center'>
        <span className='text-white pl-7 pt-5  font-bold  w-full flex' >Related Artists</span>

        {

          albumType ?
          albumData?.more_info?.artistMap?.artists?.map((item) => {

            return (
              <div className='mt-4  w-[90%] flex bg-[black] h-[13vh] flex-row items-center rounded-lg'>
                <div className='w-[100px] h-[100px] flex items-center ml-4'>
                  <img
                  className='p-1 w-full h-full rounded-lg'
                  src={item?.image}
                  />
                </div>

                <div className='ml-10'>
                  <span className='text-white'>{item?.name}</span>
                </div>
                </div>
            );
          })

          :

          playlistData?.more_info?.artists?.map((item) => {

            return (
              <div className='mt-4  w-[90%] flex bg-[black] h-[13vh] flex-row items-center rounded-lg'>
                <div className='w-[100px] h-[100px] flex items-center ml-4'>
                  <img
                  className='p-1 w-full h-full rounded-lg'
                  src={item?.image}
                  />
                </div>

                <div className='ml-10'>
                  <span className='text-white'>{item?.name}</span>
                </div>
                </div>
            );
          })


        }
          </div>

        </div>

      </div>



    </div>


  )

}

export default AlbumDetail