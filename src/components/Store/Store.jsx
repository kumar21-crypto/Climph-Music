import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  playerSlice from "../Slices/PlayerSlice";
import SuggestionSlice from "../Slices/SuggestionSlice";

// middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),

const store = configureStore({

    reducer : {
        player : playerSlice,
        suggestion : SuggestionSlice,
    },
    middleware : getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck:false,
    })
})

export default store;