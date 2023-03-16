import { GET_MOVIES, GET_MOVIE } from '../constants';

const initialState = {
    movies: [],
    movieInfo: {}
}
const MoviesReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_MOVIES: 
        return {
            ...state,
            movies: action.payload
        }
        case GET_MOVIE: 
        return {
            ...state,
            movieInfo: action.payload
        }
        default: return state
    }
}

export default MoviesReducer