import {GET_SERIES, GET_SERIE} from '../constants';
import { Action, Dispatch } from 'redux';

export const getSeries = (data: Array<ISerie>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_SERIES, 
      payload: data
  });
};
export const getSerie = (data: ISerie) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_SERIE, 
      payload: data
  });
};
