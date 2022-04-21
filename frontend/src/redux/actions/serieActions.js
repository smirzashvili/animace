import {GET_SERIES, GET_SERIE} from '../constants';

export const getSeries = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_SERIES, 
      payload: data
  });
};
export const getSerie = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_SERIE, 
      payload: data
  });
};
