import React, { useState, useEffect,useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Context } from '../../components/ContextApi';
import { useNavigate } from "react-router-dom";


const SearchSugesstion = ({ items }) => {
 
  const navigate = useNavigate();

  const data = useSelector((state) => {
    return state.suggestion;
  });

  const [suggestionArray1, setsuggestionArray1] = useState("");

  const handleClick = (query) => {
    navigate("/searchresult", { state: { data: query } });
  }



  return (
    <div
      className={`w-full h-auto ${
        data.suggestionOpenOrNot ? "flex" : "hidden"
      } absolute mt-[5vh] p-2 flex justify-center`}
    >
      <div className="w-[49%] h-full relative bg-[#202026] rounded-xl z-[999] ml-[9vw] ">
        <ul className="">
          {
           
            
          //  data?.suggestionArray?.map((item,index) =>{
          //       return (
          //           <li onClick={handleClick(item?.title)} className="flex text-white cursor-pointer">
          //               <SearchIcon />
          //               <span>{item?.title}</span>
          //           </li>
          //           )
          //   })
            
          }
        </ul>
      </div>
    </div>
  );
};

export default SearchSugesstion;
