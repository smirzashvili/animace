import { GET_MANGAS, GET_MANGA } from '../constants';

const initialState = {
    mangas: [],
    mangaInfo: {}
}
const MangasReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_MANGAS: 
        return {
            ...state,
            mangas: action.payload
        }
        case GET_MANGA: 
        return {
            ...state,
            mangaInfo: action.payload
        }
        default: return state
    }
}

export default MangasReducer