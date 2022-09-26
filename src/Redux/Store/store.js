import {configureStore,combineReducers} from "@reduxjs/toolkit";
import navReducer from "../Reducers/NavReducer";
import userReducer from "../Reducers/userReducer";
import musicReducer from "../Reducers/musicReducer";


export const initialState = {
    user:{activeUser:{
        id: "",
        password:""
    },
    users: []},
    nav:{query:"linkin park",
    loading: false},
    music: 
    {isPlaying:false,
    songProg:0,
    currentSong:{},
    favs:[],
    currentAlbum:{},
    response:{}
 }     
};
const bigReducer= combineReducers({
    nav: navReducer,
    user: userReducer,
    music: musicReducer,
    
});
export const store = configureStore({    
    reducer:bigReducer,
  });
