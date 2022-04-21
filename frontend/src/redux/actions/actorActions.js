import {GET_ACTORS, GET_ACTOR, FILTER_ACTORS} from '../constants';
import * as api from '../../api/actorsApi.js';

export const getActors = () => async (dispatch) => {
    try {
      const { data } = await api.fetchActors();
      console.log(data)
      dispatch({ 
          type: GET_ACTORS, 
          payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
};
export const getActor = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_ACTOR, 
      payload: data
  });
};
export const filterActors = (data) => async (dispatch) => {
  console.log(data.letter, data.alphabetArray)
  dispatch({ 
      type: FILTER_ACTORS, 
      payload: data
  });
};