import { GET_SERIES, GET_SERIE } from '../constants';

const initialState = {
    series: [],
    serieInfo: {}
}
const SeriesReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_SERIES: 
        return {
            ...state,
            series: action.payload
        }
        case GET_SERIE: 
        return {
            ...state,
            serieInfo: action.payload
        }
        default: return state
    }
}

export default SeriesReducer