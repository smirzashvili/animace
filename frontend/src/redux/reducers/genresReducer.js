import { GET_GENRES, GET_GENRE } from '../constants';

const initialState = {
    genres: [],
    genreInfo: {}
}
const GenresReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_GENRES: 
        return {
            ...state,
            genres: action.payload
        }
        case GET_GENRE: 
        return {
            ...state,
            genreInfo: action.payload
        }
        default: return state
    }
}

export default GenresReducer