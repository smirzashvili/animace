import {GET_USERS, CREATE_USER, LOGIN_USER, EDIT_USER, RESET_PASSWORD, FORGET_PASSWORD, LOGOUT_USER, GET_USER} from '../constants';
import * as api from '../../api/usersApi.js';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    console.log(data)
    dispatch({ 
        type: GET_USERS, 
        payload: data 
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addUser = (data) => async (dispatch) => {
  dispatch({ 
    type: CREATE_USER, 
    payload: data
  })
};

export const logInUser = (data) => async (dispatch) => {
  dispatch({ 
    type: LOGIN_USER, 
    payload: data
  })
};

export const logOutUser = (data) => async (dispatch) => {
  dispatch({ 
    type: LOGOUT_USER, 
    payload: data
  })
};

export const forgetPasswordUser = (data) => async (dispatch) => {
  dispatch({ 
    type: FORGET_PASSWORD, 
    payload: data
  })
};

export const resetPasswordUser = (data) => async (dispatch) => {
  dispatch({ 
    type: RESET_PASSWORD, 
    payload: data
  })
};

export const editUser = (data) => async (dispatch) => {
    dispatch({ 
      type: EDIT_USER, 
      payload: data
    });
};

export const getUser = (data) => async (dispatch) => {
  dispatch({ 
    type: GET_USER, 
    payload: data
  });
};


