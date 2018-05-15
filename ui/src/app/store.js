import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import tradeReducer from './trade/state/TradeReducer';

const metallicaReducer = combineReducers({
  tradeState: tradeReducer,
})

const logger = (store) => (next) => (action) => {
  console.log("Old state: ", store.getState());
  console.log("Dispatching action ->", action);
  let result = next(action);
  console.log('Action result ->', result)
  console.log("New state: ", store.getState());
  return result;
}

const middleware = applyMiddleware(logger, thunkMiddleware)

let store = createStore(metallicaReducer, {}, middleware);
 
export default store;
