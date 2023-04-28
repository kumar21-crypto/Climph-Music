import { createSlice } from "@reduxjs/toolkit";


const suggestionSlice = createSlice({
  
   
  name: "suggestion",
  initialState: {
    suggestionArray: "",
    suggestionOpenOrNot: false,
    suggestionLoader:false,
  },
  reducers: {
    setSuggestionArray(state, action) {
        state.suggestionArray = action.payload;
    },
    setSuggestionOpenorNot(state,action){
        state.suggestionOpenOrNot = action.payload;
    },
    setSuggestionLoader(state,action) {
      state.suggestionLoader = action.payload;
    },
  }
});

export default suggestionSlice.reducer;

export const { setSuggestionLoader ,setSuggestionArray, setSuggestionOpenorNot } = suggestionSlice.actions;
