import {GET_COMMENTS} from '../constants';

export const getComments = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_COMMENTS, 
      payload: data
  });
};

