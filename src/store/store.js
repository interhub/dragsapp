import { createStore } from 'redux';
import {SET_COUNTER, SET_NAME, SET_SETTING, SET_THEME} from './actionNames';
import initialState from './state';

const reducer = ( state, action ) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state, name: action.name
      };
    case SET_THEME:
      return {
        ...state, theme: action.theme
      };
    case SET_SETTING:
      return {
        ...state, openSetting: action.openSetting
      };
    case SET_COUNTER:
      return {
        ...state, counter: action.counter
      };
    default:
      return {...state}
  }
};

export default createStore(reducer, initialState);
