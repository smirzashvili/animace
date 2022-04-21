import {GET_AUTHOR} from '../constants';

export const getAuthor = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_AUTHOR, 
      payload: data
  });
};