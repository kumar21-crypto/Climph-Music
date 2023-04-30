import { useLocation } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { fetchDetailDataFromApi, fetchArtistDetailById, fetchPlaylistByID, fetchSongDetailDataByLink,fetchAlbumData,fetchPlaylistData } from '../components/Api';
import SongCard from '../AlbumFetch/SongCard';
import '../../src/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSongsArray, setCurrentSong, setCurrentSongId } from '../components/Slices/PlayerSlice';


export const AlbumDetailContext = createContext();

const AlbumDetail = (props) => {

  const location = useLocation();
  const type = location?.state?.data?.type;
  const id = location?.state?.data?.id;
  const url  = location?.state?.data?.perma_url;

  const [albumType, setalbumType] = useState('');
  const [playlistData, setplaylistData] = useState('');
  const [albumData, setalbumData] = useState('');
  const [playlistData1, setplaylistData1] = useState('');
  const [albumData1, setalbumData1] = useState('');
  const [bgcolor, setbgcolor] = useState('');
  const [ArrayOnce, setArrayOnce] = useState(false);

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
       
      })

      

      fetchPlaylistData(`${id}`).then((res) => {
        setplaylistData(res);
      })
     
      setalbumType(false);
      image = playlistData1?.data?.image[2].link;
      
    }
    else if (type === 'song') {
      
    }

  }, [])


  const setCurrent = (index) => {
    dispatch(setCurrentSong(index));
    
  }



  return (


    <div className='w-[100vw] mt-16  md:mt-6 flex flex-col bg-[black] h-auto  items-center  overflow-hidden justify-center md:w-[85vw] xl:w-[82vw]'>
      <div className='w-full flex  mb-20 flex-col xl:flex-row bg-[black] h-auto  overflow-hidden items-center'>

        {/* left work */}
        <div 
             className='w-[90%] h-full flex flex-col items-center '>

          {/* album work */}
          <div 
          style={{
            backgroundColor:'#202026'
          }}
          className={`w-full h-auto mt-10 rounded-lg flex flex-col`}>
            <span className='text-white pl-7 pt-5 font-bold  w-full flex' >{albumType ? "Album" : "Playlist"}</span>
            <div className='flex w-full p-1 items-center h-full '>

              <div className=' h-full w-[40%] sm:w-[20%] sm:p-2 flex items-center justify-center '>
                <img
                  className='w-[100px] h-[100px] rounded-lg hover:opacity-70 '
                  src={
                    albumType ? albumData1?.data?.image[2].link : playlistData1?.data?.image[2].link
                  }

                />


              </div>


              <div className='flex flex-col ml-10 text-white h-full justify-center w-[60%] pl-2'>
                <span className=' text-sm font-bold'>{albumType ? albumData?.title : playlistData?.title}</span>
                <span className=' text-sm mt-3 '>{albumType ? albumData?.header_desc : playlistData?.header_desc}</span>
                <span className=' text-sm mt-3 '>{albumType ? "" : playlistData?.more_info?.subtitle_desc[1]}</span>
                <span className=' text-sm mt-3 '>{albumType ? "" : playlistData?.more_info?.subtitle_desc[0]}</span>
              </div>


            </div>

          </div>

          {/* songs work  */}
          <div className='w-full h-auto bg-[#202026] mt-10 rounded-lg flex flex-col pb-5'>
            <span className='text-white pl-7 pt-5  font-bold  w-full flex' >Songs</span>

            {

              albumType ?

              albumData1?.data?.songs?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center' onClick={() => {
                      dispatch(setCurrentSongId(item?.id));
                      {
                        ArrayOnce ? ""
                        :
                        dispatch(setSongsArray(albumData1?.data?.songs));
                        setArrayOnce(true);
                      }
                      
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

                playlistData1?.data?.songs?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center  ' onClick={() => {
                      dispatch(setCurrentSongId(item?.id));
                      dispatch(setSongsArray(playlistData1?.data?.songs));
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
        <div className='w-full h-auto  flex justify-center  xl:h-full '>

        <div className='w-[90%] h-auto pb-4 bg-[#202026] mt-10  rounded-lg flex flex-col items-center'>
        <span className='text-white pl-7 pt-5  font-bold  w-full flex' >Related Artists</span>

        {

          albumType ?
          albumData?.more_info?.artistMap?.artists?.map((item) => {

            return (
              <div className='mt-4  w-[90%] flex bg-[black] h-[13vh] flex-row items-center rounded-lg'>
                <div className='w-[80px] h-[80px] flex items-center ml-4'>
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
                <div className='w-[80px] h-[80px] flex items-center ml-4'>
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