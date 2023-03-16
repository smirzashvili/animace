import {GET_AUTHOR} from '../constants';
import { Action, Dispatch } from 'redux';

export const getAuthor = (data: IAuthor) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_AUTHOR, 
      payload: data
  });
};