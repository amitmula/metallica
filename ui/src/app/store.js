import { createStore, createReducer, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import tradeReducer from './trade/state/reducer';

let rootReducer = combineReducers({
  tradeState: tradeReducer
})

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log("Old state: ", store.getState());
      console.log("Dispatching action ->", action);
      let result = next(action);
      console.log('Action result ->', result)
      console.log("New state: ", store.getState());
      return result;
    }
  }
}

let store = createStore(rootReducer, applyMiddleware(loggerMiddleware, thunkMiddleware));

export default store;