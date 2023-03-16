import {SEARCH, FILTER} from '../constants';
import { Action, Dispatch } from 'redux';

export const search = (data: Array<IMovie | IManga | ISerie | IArticle | IReview>) => async (dispatch: Dispatch<Action>) => {
  dispatch({ 
      type: SEARCH, 
      payload: data
  });
};

// export const filter = (data) => async (dispatch, getState) => {
//   dispatch({ 
//       type: FILTER, 
//       payload: data
//   });
// };


