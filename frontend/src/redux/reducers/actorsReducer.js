import { GET_ACTORS, GET_ACTOR, FILTER_ACTORS } from '../constants';

const initialState = {
    actors: [],
    actorInfo: {},
    filteredAlphabet: []
}
const ActorsReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_ACTORS: 
        return {
            ...state,
            actors: action.payload
        }
        case GET_ACTOR: 
        return {
            ...state,
            actorInfo: action.payload
        }
        case FILTER_ACTORS: 
            let filtered
            if(action.payload.letter === "#") {
                filtered = action.payload.alphabetArray
            } else {
                filtered = action.payload.alphabetArray.filter(item => item === action.payload.letter)
            }
        return {     
            ...state,
            filteredAlphabet: filtered        
        }
        default: return state
    }
}

export default ActorsReducer