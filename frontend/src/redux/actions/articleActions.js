import {GET_ARTICLES, GET_ARTICLE} from '../constants';

export const getArticles = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_ARTICLES, 
      payload: data
  });
};
export const getArticle = (data) => async (dispatch) => {
  return dispatch({ 
      type: GET_ARTICLE, 
      payload: data
  });
};
