import {GET_REVIEWS, GET_REVIEW} from '../constants';

export const getReviews = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_REVIEWS, 
      payload: data
  });
};
export const getReview = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_REVIEW, 
      payload: data
  });
};
