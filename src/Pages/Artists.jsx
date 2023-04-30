import React, { useContext } from "react";
import { Context } from "../components/ContextApi";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

const Artists = ({ pick }) => {
  const { searchResults } = useContext(Context);

  return (
    <div className="bg-[#0a0a0b] w-[100vw] h-full flex flex-col  md:w-[85vw] items-center">
      <span className="text-white pl-7 pt-5 font-bold md:ml-[3rem] w-full flex">
        Top Artists
      </span>
      {/* <div className='grid grid-cols-8 xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3'> */}
      <div className="grid md:w-[85vw] w-[100vw] lg:w-[90vw] grid-cols-2 sm:grid-cols-autofill  p-5">
        {searchResults?.artist_recos?.map((item,index) => {

          const url = item?.perma_url;
          const token = url.split("/").pop();
          // "uGdfg6zGf4s_"

          return <ArtistCard key={index} album={item} token={token} />;
        })}
      </div>
    </div>
  );
};

export default Artists;
