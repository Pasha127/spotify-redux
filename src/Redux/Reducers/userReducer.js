import {LOG_IN, LOG_OUT, SIGN_UP} from "../Actions"

const initialState = {
    activeUser:{
        id: "",
        password:""
    },
    users: [],    
};

const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case LOG_IN:
            return{
                ...state,
                activeUser: action.payload
            }
        case LOG_OUT:
            return{
                ...state,
                activeUser:""
            }
        case SIGN_UP:
            return{
                ...state,
                users:[...state.users, action.payload]
            }        
        default:
            return state
    }
}
export default userReducer