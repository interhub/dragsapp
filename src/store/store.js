import { createStore } from 'redux';
import { SET_SCREEN } from './actionNames';
import initialState from './state';

const reducer = ( state, action ) => {
  switch (action.type) {
    case SET_SCREEN:
      return {
        ...state, screen: action.screen
      };

    default:
      return {...state}
  }
};

export default createStore(reducer, initialState);
