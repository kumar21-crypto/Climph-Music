import { useLocation } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react';
import { fetchDetailDataFromApi, fetchArtistDetailById, fetchPlaylistByID, fetchSongDetailDataByLink } from '../components/Api';
import SongCard from '../AlbumFetch/SongCard';
import MiniPlayerCard from '../components/MiniPlayerCard';
import { Skeleton } from '@mui/material';

export const AlbumDetailContext = createContext();

const AlbumDetail = (props) => {

  const location = useLocation();
  const type = location?.state?.data?.type;
  const url = location?.state?.data?.perma_url;
  const [detailresult, setdetailresult] = useState();
  const [artistDetail, setartistDetail] = useState()
  var image = detailresult?.data?.image[2]?.link;
  const artistID = detailresult?.data?.primaryArtistsId;
  const songUrl = detailresult?.data?.songs[0]?.downloadUrl[3]?.link;
  const playlistID = location?.state?.data?.id;

  const [selectSong, setselectSong] = useState();
  const [showMiniPlayer, setshowMiniPlayer] = useState(false);
  const [playlistDetail, setplaylistDetail] = useState('');
  const [albumType, setalbumType] = useState('');
  const playlistImage = playlistDetail?.data?.image[2]?.link;
  const [songDetailData, setsongDetailData] = useState('');
  const [loading, setloading] = useState(false);
  var artists = '';

  if (typeof artistID != undefined) {
    var artists = artistID?.split(",");
  }

  useEffect(() => {
    if (type === 'album') {
      fetchSongData(url);
      setalbumType(true);
      image = detailresult?.data?.image[2]?.link;
      setloading(true);
    }
    else if (type === 'playlist') {
      fetchPlaylistDetail(playlistID);
      setalbumType(false);
      image = playlistDetail?.data?.image[2]?.link;
      setloading(true);
    }
    else if (type === 'song') {
      fetchSongDetailData(url);
      setalbumType('song');
      image = songDetailData?.image[2]?.link;
      setloading(true);
    }


  }, [showMiniPlayer])

  const fetchSongData = (link) => {
    fetchDetailDataFromApi(`${link}`).then((res) => {
      setdetailresult(res);
    })
  }

  const fetchArtistDetail = (id) => {
    fetchArtistDetailById(`${id}`).then((res) => {
      setartistDetail(res);
    })
  }

  const fetchPlaylistDetail = (id) => {
    fetchPlaylistByID(`${id}`).then((res) => {
      setplaylistDetail(res);
    })
  }

  const fetchSongDetailData = (link) => {
    fetchSongDetailDataByLink(`${link}`).then((res) => {
      setsongDetailData(res?.data);
    })
  }


  return (


//     <div>
//       {
//     <AlbumDetailContext.Provider value={{
//       showMiniPlayer,
//       setshowMiniPlayer,
//       selectSong,
//       setselectSong
//     }} >
//       {props.children}

//     </AlbumDetailContext.Provider>
// }
//     </div>


    <div className='w-[100vw] mt-16 flex flex-col bg-[black] h-full items-center  overflow-hidden justify-center '>
      <div className='w-[100vw] flex flex-row bg-[black] h-full overflow-hidden justify-end'>

        {/* left work */}
        <div className='w-[60vw] h-full  flex flex-col items-center '>

          {/* album work */}
          <div className='w-[90%] h-[40vh] bg-[#202026] mt-10 rounded-lg flex flex-col'>
            <span className='text-white pl-7 pt-5 font-bold  w-full flex' >{albumType ? "Album" : "Playlist"}</span>
            <div className='flex w-full p-1 items-center h-full '>

              <div className='w-[28%] h-full  flex items-center justify-center '>
                <img
                  className='w-[250px] h-[250px] rounded-lg hover:opacity-70 '
                  src={
                    image
                  }

                />


              </div>


              <div className='flex flex-col ml-10  w-[72%%] h-full justify-center pl-2'>
                <span className='text-white text-2xl font-bold'>{detailresult?.data?.name}</span>
                <span className='text-white text-lg mt-3'>Description</span>
              </div>
            </div>

          </div>

          {/* songs work  */}
          <div className='w-[90%] h-auto bg-[#202026] mt-10 rounded-lg flex flex-col items-center pb-5 '>
            <span className='text-white pl-7 pt-5  font-bold  w-full flex' >Songs</span>

            {

              albumType ?

                detailresult?.data?.songs?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center ' onClick={() => {
                      setselectSong(item);
                      setshowMiniPlayer(true)
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

                playlistDetail?.data?.songs?.map((item, index) => {

                  return (
                    <div className='mt-4 w-full flex flex-col items-center' onClick={() => {
                      setselectSong(item);
                      setshowMiniPlayer(true)
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
        <div className='w-[30vw] h-full bg-[green] '>

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





    //     <div className='w-[100vw] mt-14 flex flex-row   items-end justify-end'>

    //       <div className='bg-[green] w-[60vw] h-full flex flex-col'>

    //         {/* for album image */}
    //         <div className=' w-full h-[35vh] bg-[red]'>
    //           <span className='mt-2 text-xl font-bold place-self-start ml-[4%]'>
    //             {albumType ? "Album" : "Playlist"}
    //           </span>
    //           <img
    //             className='w-[250px] h-[250px] rounded-xl mt-5 hover:-translate-y-1
    //               hover:scale-90 duration-500 ml-24'
    //             src={albumType ? albumImage : playlistImage}
    //           />
    //         </div>

    //         {/* for album songs */}
    //         <div className=' w-full flex flex-col items-center h-auto' onClick={() => {

    //         }}>
    //           <span className='mt-0 text-xl font-bold place-self-start ml-[4%]'>
    //             Songs
    //           </span>


    //           {

    //             albumType ?

    //               detailresult?.data?.songs?.map((item, index) => {

    //                 return (
    //                   <div className='mt-4 ' onClick={() => {
    //                     setselectSong(item);
    //                     setshowMiniPlayer(true)
    //                   }}>
    //                     <SongCard
    //                       key={index}
    //                       song={item}
    //                       i={index}
    //                     />
    //                   </div>

    //                 )
    //               })

    //               :

    //               playlistDetail?.data?.songs?.map((item, index) => {

    //                 return (
    //                   <div className='mt-4 ' onClick={() => {
    //                     setselectSong(item);
    //                     setshowMiniPlayer(true)
    //                   }}>
    //                     <SongCard
    //                       key={index}
    //                       song={item}
    //                       i={index}
    //                     />
    //                   </div>

    //                 )
    //               })

    //           }

    //         </div>

    //         <div >

    //         </div>

    //         {/* <div className='sticky w-full h-[10vh]   bottom-1'>
    // {showMiniPlayer ? <MiniPlayerCard
    //   data={selectSong}
    // />
    //   : ""

    // }
    // </div> */}

    //       </div>


    //       <div className='w-[30vw] h-full bg-[yellow] flex flex-col'>

    //       </div>

    //        {/* floating mini player */}



    //     </div>


   
    



    )

}

export default AlbumDetail