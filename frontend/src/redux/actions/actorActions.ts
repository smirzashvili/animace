import {GET_ACTORS, GET_ACTOR, FILTER_ACTORS} from '../constants';
import * as api from '../../api/actorsApi';
import { Action, Dispatch } from 'redux';

export const getActors = () => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchActors();
      console.log(data)
      dispatch({ 
          type: GET_ACTORS, 
          payload: data
      });
    } catch (error) {
    }
};
export const getActor = (data: IActor) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_ACTOR, 
      payload: data
  });
};
export const filterActors = (data: Array<IActor>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: FILTER_ACTORS, 
      payload: data
  });
};