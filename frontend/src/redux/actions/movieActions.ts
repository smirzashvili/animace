import {GET_MOVIES, GET_MOVIE} from '../constants';
import { Action, Dispatch } from 'redux';

export const getMovies = (data: Array<IMovie>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_MOVIES, 
      payload: data
  });
};
export const getMovie = (data: IMovie) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_MOVIE, 
      payload: data
  });
};
