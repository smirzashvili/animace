import {GET_GENRES, GET_GENRE} from '../constants';
import * as api from '../../api/genresApi';
import { Action, Dispatch } from 'redux';

export const getGenres = () => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchGenres();
      dispatch({ 
          type: GET_GENRES, 
          payload: data
      });
    } catch (error) {
    }
};
export const getGenre = (data: IGenre) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_GENRE, 
      payload: data
  });
};
