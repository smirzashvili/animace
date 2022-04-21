import { GET_CATEGORIES, GET_CATEGORY } from '../constants';

const initialState = {
    categories: [],
    categoryInfo: {}
}
const CategoriesReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_CATEGORIES: 
        return {
            ...state,
            categories: action.payload
        }
        case GET_CATEGORY: 
        return {
            ...state,
            categoryInfo: action.payload
        }
        default: return state
    }
}

export default CategoriesReducer