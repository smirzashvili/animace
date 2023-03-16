import {GET_CATEGORIES, GET_CATEGORY} from '../constants';
import * as api from '../../api/categoriesApi';
import { Action, Dispatch } from 'redux';

export const getCategories = () => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.fetchCategories();
      dispatch({ 
          type: GET_CATEGORIES, 
          payload: data
      });
    } catch (error) {
    }
};
export const getCategory = (data: ICategory) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: GET_CATEGORY, 
      payload: data
  });
};
