import {SEARCH, FILTER} from '../constants';

export const search = (data) => async (dispatch) => {
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


