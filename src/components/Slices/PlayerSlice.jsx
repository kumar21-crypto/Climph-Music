import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({

    name:'player',
    initialState:{
        songlist:null,
        currentSong:0,
        isPlaying:false,
        comPlayPause:true,
        currentSongRef:null,
       
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
        }
    }

});

export default playerSlice.reducer;

export const {setSongsArray,setCurrentSong,setPlayPause,setCompletePlayPause,setCurrentSongRef} = playerSlice.actions;