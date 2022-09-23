import {SEARCH} from "../Actions/navActions"

const initialState = {
    query:"",
    loading: false
};

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