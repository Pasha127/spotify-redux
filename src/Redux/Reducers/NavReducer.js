import {SEARCH} from "../Actions/navActions"
import { initialState } from "../Store/store"

const navReducer = (state=initialState, action) =>{
    switch(action.type){
        case SEARCH:
            return{
                ...state,
                query: action.payload
            }
        default:
            return state
    }
}
export default navReducer