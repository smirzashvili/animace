import {GET_STAFF} from '../constants';

export const getStaff = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_STAFF, 
      payload: data
  });
};
