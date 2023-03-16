import {GET_MANGAS, GET_MANGA} from '../constants';
import { Action, Dispatch } from 'redux';

export const getMangas = (data: Array<IManga>) => async (dispatch: Dispatch<Action>) => {
    dispatch({ 
        type: GET_MANGAS, 
        payload: data
    });
};
export const getManga = (data: IManga) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_MANGA, 
      payload: data
  });
};
