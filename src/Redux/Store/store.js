import {configureStore,combineReducers} from "@reduxjs/toolkit";
import navReducer from "../Reducers/NavReducer";
import userReducer from "../Reducers/userReducer";
import musicReducer from "../Reducers/musicReducer";
const bigReducer= combineReducers({
    nav: navReducer,
    user: userReducer,
    music: musicReducer,
    
});