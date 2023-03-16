import { GET_REVIEWS, GET_REVIEW } from '../constants';

const initialState = {
    reviews: [],
    reviewInfo: {},
}
const ReviewsReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_REVIEWS: 
        return {
            ...state,
            reviews: action.payload
        }
        case GET_REVIEW: 
        return {
            ...state,
            reviewInfo: action.payload
        }
        default: return state
    }
}

export default ReviewsReducer