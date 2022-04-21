import { GET_COMMENTS } from '../constants';

const initialState = {
    comments: [],
}
const CommentsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_COMMENTS: 
        return {
            ...state,
            categories: action.payload
        }
        default: return state
    }
}

export default CommentsReducer