import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({

    name:'player',
    initialState:{
        songlist:null,
        currentSong:0,
        isPlaying:false,
        comPlayPause:true,
        currentSongRef:null,
        autoPlaySwitch:false,
        currentSongId:null,
       
},
    reducers: {
        setSongsArray(state,action)  {
           
            state.songlist = action.payload;
        },
        setCurrentSong(state,action) {
           
            state.currentSong = action.payload;
            state.comPlayPause = false;
        },
        setPlayPause(state,action) {
            state.isPlaying = action.payload;
        },
        setCompletePlayPause(state,action) {
            state.comPlayPause = action.payload;
        },
        setCurrentSongRef(state,action) {
            state.currentSongRef = action.payload;
        },
        setPlayerAutoPlaySwitch(state,action) {
            state.autoPlaySwitch = action.payload;
        },
        setCurrentSongId(state,action) {
            state.currentSongId = action.payload;
        }
    }

});

export default playerSlice.reducer;

export const {setSongsArray,setCurrentSongId,setCurrentSong,setPlayPause,setCompletePlayPause,setCurrentSongRef,setPlayerAutoPlaySwitch} = playerSlice.actions;