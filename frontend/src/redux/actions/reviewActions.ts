import {GET_REVIEWS, GET_REVIEW} from '../constants';
import { Action, Dispatch } from 'redux';

export const getReviews = (data: Array<IReview>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_REVIEWS, 
      payload: data
  });
};
export const getReview = (data: IReview) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_REVIEW, 
      payload: data
  });
};
