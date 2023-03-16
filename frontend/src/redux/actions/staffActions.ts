import { Action, Dispatch } from 'redux';
import {GET_STAFF} from '../constants';

export const getStaff = (data: IStaff) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_STAFF, 
      payload: data
  });
};
