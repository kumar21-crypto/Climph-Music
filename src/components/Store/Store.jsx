import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  playerSlice from "../Slices/PlayerSlice";

// middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),

const store = configureStore({

    reducer : {
        player : playerSlice,
    },
    middleware : getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck:false,
    })
})

export default store;