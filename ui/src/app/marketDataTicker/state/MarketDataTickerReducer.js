import * as ActionTypes from './MarketDataTickerActionTypes';

const INITIAL_STATE = {  
  prices: [],
  loading: false,
  error: false,
};

export default function marketDataTickerReduer(state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case ActionTypes.LOADING: {
      return Object.assign({}, state, { loading: action.payload.loading })
    }

    case ActionTypes.INIT_ERROR: {
      return Object.assign({}, state, { error: action.payload.error })
    }

    case ActionTypes.INIT_PRICES: {
      console.log('market data init prices action triggered -> ', action)
      let prices = action.payload.prices;
      return Object.assign({}, state, { prices })
    }

    case ActionTypes.UPDATE_PRICES: {
      let currentPrices = state.prices
      let marketDataUpdate = action.payload.prices
      currentPrices = Object.assign({}, currentPrices, { ...marketDataUpdate })      
      return Object.assign({}, state, { prices: currentPrices })
    }

    default:
      return state;
  }
}