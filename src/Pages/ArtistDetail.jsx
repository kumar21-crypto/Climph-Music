import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setSongsArray,
  setCurrentSong,
  setCurrentSongId,
} from "../components/Slices/PlayerSlice";



const ArtistDetail = () => {
  const location = useLocation();
  const data = location?.state?.data;

  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[100vw] h-auto mt-16 md:mt-6 flex flex-col items-center  overflow-hidden  md:w-[85vw] xl:w-[82vw]">
      <div className="w-[90%] h-[30vh] bg-[#161616] flex mt-16">
        <div className="w-[30%]  h-full flex justify-center items-center">
          <img
            src={data?.image}
            alt=""
            className="rounded-full w-[200px] h-[200px]"
          />
        </div>

        <div className="w-[50%] justify-center flex flex-col text-white ">
          <span className=" font-semibold text-4xl">{data?.name}</span>
          <span className="mt-3 text-md">{data?.subtitle}</span>
          <span className="mt-1 text-md">
            followers : {data?.follower_count}
          </span>

          <div className="w-[30%] mt-4 flex  justify-around items-center">
            <div className="bg-[#57b9fa] pt-2 pb-2 pl-5 pr-5 outline-none rounded-3xl">
              <span className="font-semibold text-xl">Play</span>
            </div>
            <span>
              <BsHeart size={30} />
            </span>
            <span>
              <HiDotsHorizontal size={30} />
            </span>
          </div>
        </div>
      </div>

      <div className="w-[90%] h-auto  mt-4  flex flex-col">
        <div className="flex  w-[27%] justify-around mt-3">
          <div
            className={` ${
              activeTab === "tab1" && `bg-[#57b9fa]`
            } cursor-pointer bg-[white] pt-2 pb-2 pl-5 pr-5 outline-none rounded-3xl `}
            onClick={() => handleTabClick("tab1")}
          >
            <span className=" font-medium text-sm">Top Songs</span>
          </div>
          <div
            className={` ${
              activeTab === "tab2" && `bg-[#57b9fa]`
            } cursor-pointer bg-[white] pt-2 pb-2 pl-5 pr-5 outline-none rounded-3xl `}
            onClick={() => handleTabClick("tab2")}
          >
            <span className="font-medium text-sm">Top Albums</span>
          </div>
          <div
            className={` ${
              activeTab === "tab3" && `bg-[#57b9fa]`
            } cursor-pointer bg-[white] pt-2 pb-2 pl-5 pr-5 outline-none rounded-3xl `}
            onClick={() => handleTabClick("tab3")}
          >
            <span className="font-medium text-sm">Top Playlists</span>
          </div>
        </div>

        <div className="mt-4 text-white font-bold">
          {activeTab === "tab1" && "Top Songs"}
          {activeTab === "tab2" && "Top Albums"}
          {activeTab === "tab3" && "Top Playlists"}
        </div>

        <div className="w-full">
          {activeTab === "tab1" && <Tab1 />}
          {activeTab === "tab2" && <Tab2 />}
          {activeTab === "tab3" && <Tab3 />}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;

const Tab1 = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    
    
  }, [])
  

  return (
    <div className="mt-4 w-full  h-auto">
      {data?.topSongs?.map((item, index) => {
        return (
          <div
            onClick={() => {
              dispatch(setCurrentSongId(item?.id));
              dispatch(setSongsArray(data?.topSongs));

              dispatch(setCurrentSong(index));
            }}
            className="w-full h-[8vh] bg-[#161616] hover:opacity-70 cursor-pointer text-white items-center flex mt-1"
          >
            <span className="w-[5%]  justify-center flex">{index + 1}</span>

            <div className="w-[5%]">
              <div className="w-[50px] h-[50px] rounded-md cursor-pointer  relative overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:opacity-50  "
                  src={item?.image}
                  alt="image"
                />
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
                  <FaPlay />
                </div>
              </div>
            </div>

            <span className="w-[15vw] font-bold truncate mr-4 flex">
              {item?.title}
            </span>

            <div className="w-[25%] pr-4 flex">
              {item?.more_info?.artistMap?.primary_artists?.map((res) => {
                return (
                  <span className=" truncate flex">
                    {" "}
                    {res?.name}
                    {},{" "}
                  </span>
                );
              })}
            </div>

            <span className="w-[25%] truncate flex">
              {item?.more_info?.album}
            </span>
            <span className=" w-[11%] flex justify-center">
              <BsHeart />
            </span>
            <span className=" w-[3%]">
              {Math.floor(item?.more_info?.duration / 60)}:
              {item?.more_info?.duration % 60}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Tab2 = () => {
  const location = useLocation();
  const data = location?.state?.data;
  return (
    <div className=" w-full  h-auto">
      <div className="grid grid-cols-autofill  p-5">
        {data?.topAlbums?.map((item, index) => {
          return <AlbumCard key={index} album={item} />;
        })}
      </div>
    </div>
  );
};

const Tab3 = () => {
  const location = useLocation();
  const data = location?.state?.data;
  return (
    <div className=" w-full  h-auto">
      <div className="grid grid-cols-autofill  p-5">
        {data?.dedicated_artist_playlist?.map((item, index) => {
          return <AlbumCard key={index} album={item} />;
        })}
      </div>
    </div>
  );
};
