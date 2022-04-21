import { GET_AUTHOR } from '../constants';

const initialState = {
    authorInfo: {}
}
const AuthorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_AUTHOR: 
        return {
            ...state,
            authorInfo: action.payload
        }
        default: return state
    }
}

export default AuthorsReducer