import { GET_STAFF } from '../constants';

const initialState = {
    staffInfo: {},
}
const StaffReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case GET_STAFF: 
        return {
            ...state,
            staffInfo: action.payload
        }
        default: return state
    }
}

export default StaffReducer