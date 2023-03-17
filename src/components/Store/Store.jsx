import { configureStore } from "@reduxjs/toolkit";
import  playerSlice from "../Slices/PlayerSlice";

const store = configureStore({

    reducer : {
        player : playerSlice,
    },
})

export default store;