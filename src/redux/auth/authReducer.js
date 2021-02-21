import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './authAction';

const tokenReducer = createReducer(null, {
  [actions.loginSuccess]: (_, actions) => {
    console.log(actions.payload.access_token);
    return actions.payload.access_token;
  },
  [actions.logoutSuccess]: (_, __) => null,
});

export default combineReducers({
  token: tokenReducer,
});
