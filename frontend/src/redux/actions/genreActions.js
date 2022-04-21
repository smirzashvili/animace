import {GET_GENRES, GET_GENRE} from '../constants';
import * as api from '../../api/genresApi';

export const getGenres = () => async (dispatch) => {
    try {
      const { data } = await api.fetchGenres();
      dispatch({ 
          type: GET_GENRES, 
          payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
};
export const getGenre = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_GENRE, 
      payload: data
  });
};
