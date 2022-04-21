import {GET_MOVIES, GET_MOVIE} from '../constants';

export const getMovies = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_MOVIES, 
      payload: data
  });
};
export const getMovie = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_MOVIE, 
      payload: data
  });
};
