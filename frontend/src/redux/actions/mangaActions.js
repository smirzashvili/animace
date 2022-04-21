import {GET_MANGAS, GET_MANGA} from '../constants';

export const getMangas = (data) => async (dispatch) => {
    dispatch({ 
        type: GET_MANGAS, 
        payload: data
    });
};
export const getManga = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_MANGA, 
      payload: data
  });
};
