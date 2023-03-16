import {GET_COMMENTS} from '../constants';
import { Action, Dispatch } from 'redux';

export const getComments = (data: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_COMMENTS, 
      payload: data
  });
};

