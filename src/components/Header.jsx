import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useSelector,useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import { BsPersonCircle } from "react-icons/bs";
import { MdPersonAddAlt1, MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { searchByQuerySaavn } from "../components/Api";
import { setSuggestionArray, setSuggestionOpenorNot, setSuggestionLoader } from '../components/Slices/SuggestionSlice';


const Header = () => {
  const [open, setopen] = useState(true);
  const dispatch = useDispatch();
  const [searchQuery, setsearchQuery] = useState(null);
  const navigate = useNavigate();
  const [IsFocus, setIsFocus] = useState(false);
  const [searchSuggestionResults, setsearchSuggestionResults] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const data = useSelector((state) => {
    return state.player;

  })

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setsearchQuery(event.target.value);
  };

  const handleOnSearchFocus = (event) = {
    
  }

  // useEffect(() => {
  //   if (searchQuery != null) {
  //     // jio saavn
      
  //     searchByQuerySaavn(`${searchQuery}`).then((res) => {
  //       dispatch(setSuggestionArray(res?.results));
  //       dispatch(setSuggestionLoader(true));
  //     });
  //   }
  // }, [searchQuery]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter") {
      if (searchQuery === "") {
        alert("please enter something .....");
      } else {
        navigate("/searchresult", { state: { data: searchQuery } });
      }
    }
  };

  const searchClickHandler = () => {
    if (searchQuery === "") {
      alert("please enter something .....");
    } else {
      navigate("/searchresult", { state: { data: searchQuery } });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="fixed">
        <div className=" h-[8vh] bg-[black] w-full flex flex-grow">
          <div className="w-[30%] h-full flex justify-start pl-3 items-center ">
            <span className="text-white text-md font-bold sm:text-lg md:text-xl">
              Climph Music
            </span>
          </div>

          <div className="w-[60%] md:w-[70%]  flex items-center justify-end h-full ml-[15vw] md:ml-0">
            <div className="flex flex-col justify-center  rounded-xl mr-4 md:w-[70%]">
              <div className="flex bg-[#212121]  rounded-xl mr-4 md:w-full">
                {open ? (
                  <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="search songs , albums or artists"
                    className="p-2 duration-500 bg-[#212121] translate-y-0 rounded-xl outline-none text-white pl-3 w-[40vw] truncate "
                    onChange={handleChange}
                    onKeyDown={searchQueryHandler}
                    onFocus={()=>{
                      // dispatch(setSuggestionOpenorNot(true));
                    }}
                    onBlur={()=>{
                      // dispatch(setSuggestionOpenorNot(false));
                    }}
                  />
                ) : (
                  ""
                )}
                <Divider />

                <button
                  className="flex  md:ml-[5vw]  lg:ml-[5vw] xl:ml-[5vw] 2xl:ml-[8vw] justify-center items-center"
                  onClick={() => {
                    searchClickHandler();
                  }}
                >
                  <SearchIcon
                    sx={{ fontSize: 30, color: "white" }}
                    className=" text-[#0a0a0b] p-1  "
                  />
                </button>
              </div>
              
            </div>

            <div className="mr-4 md:w-[30%]  md:justify-end items-center md:pr-8 flex h-full  md:mr-0">
              <button onClick={handleClick}>
                <MenuIcon />
              </button>
            </div>

            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <BsPersonCircle />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <MdPersonAddAlt1 />
                </ListItemIcon>
                <ListItemText>Add another account</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <IoMdSettings />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <MdLogout />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
    </Box>
  );
};

export default Header;
