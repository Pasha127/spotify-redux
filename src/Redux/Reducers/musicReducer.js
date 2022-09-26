import {PLAY_PAUSE, NEXT_BACK, REPEAT, SONG_DATA, FETCH_MUSIC} from "../Actions/musicActions"
import { initialState } from "../Store/store"


const musicReducer = (state=initialState, action) =>{
    switch(action.type){
        case PLAY_PAUSE:
            return{
                ...state,
                isPlaying: action.payload,
                songProg: ""
            }
        
        case NEXT_BACK:
            return{
                ...state,
                currentSong:action.payload.curentSong,
                playingSong: action.payload.playingSong,
                songProg: 0,

            }            
        case REPEAT:
            return{
                ...state,
                users:[...state.users, action.payload]
            }        
        case SONG_DATA:
            return{
                ...state,
                currentSong : action.payload
            }        
        case FETCH_MUSIC:
            return{
                ...state,
                response: action.payload
            }
        default:
            return state
    }
}
export default musicReducer