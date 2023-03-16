import {GET_ARTICLES, GET_ARTICLE} from '../constants';
import { Action, Dispatch } from 'redux';

export const getArticles = (data: Array<IArticle>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_ARTICLES, 
      payload: data
  });
};
export const getArticle = (data: IArticle) => async (dispatch: Dispatch<Action>) => {
  return dispatch({ 
      type: GET_ARTICLE, 
      payload: data
  });
};
