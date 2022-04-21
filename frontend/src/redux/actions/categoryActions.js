import {GET_CATEGORIES, GET_CATEGORY} from '../constants';
import * as api from '../../api/categoriesApi.js';

export const getCategories = () => async (dispatch) => {
    try {
      const { data } = await api.fetchCategories();
      dispatch({ 
          type: GET_CATEGORIES, 
          payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
};
export const getCategory = (data) => async (dispatch) => {
  dispatch({ 
      type: GET_CATEGORY, 
      payload: data
  });
};
