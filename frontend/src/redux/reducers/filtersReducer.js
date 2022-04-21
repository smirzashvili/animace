import { FILTER, SEARCH } from '../constants';

const initialState = {
    data: [],
}
const FiltersReducer = (state=initialState, action) => {
    switch(action.type) {
        case SEARCH: 
        return {
            ...state,
            data: action.payload
        }
        case FILTER: 
        return {
            ...state,
            data: action.payload
        }
        default: return state
    }
}

export default FiltersReducer