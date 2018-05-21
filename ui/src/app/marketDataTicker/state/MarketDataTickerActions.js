import * as ActionTypes from "./MarketDataTickerActionTypes";
import * as service from "../../Services";


export function updatePrices(marketData) {
  return {
    type: ActionTypes.UPDATE_PRICES,
    payload: {
      prices: marketData
    }
  }
}

export function initPrices(prices) {
  return {
    type: ActionTypes.INIT_PRICES,
    payload: {
      prices: prices
    }
  }
}

export function loading(status) {
  return {
    type: ActionTypes.LOADING,
    payload: {
      loading: status
    }
  }
}

export function initError(error) {
  return {
    type: ActionTypes.INIT_ERROR,
    payload: {
      error: error
    }
  }
}

export function updateMarketDataAsync(prices) {
  return async function (dispatch, getState) {
    dispatch(initError(false));
    dispatch(loading(true));
    try {      
      console.log('prices obtained from notification -> ', prices)
      dispatch(updatePrices(prices))      
    } catch (error) {
      dispatch(loading(false));
      dispatch(initError(error.toString()));
    }
    dispatch(loading(false));
  }
}

export function fetchMarketDataAsync() {
  //thunk shall pass the dispatch
  return async function (dispatch, getState) {
    //no error
    dispatch(initError(false));
    dispatch(loading(true));
    try {
      let prices = await service.getCommodityPriceList()
      console.log('prices obtained from service -> ', prices)
      dispatch(initPrices(prices))      
    } catch (error) {
      dispatch(loading(false));
      dispatch(initError(error.toString()));
    }
    dispatch(loading(false));
  }
}
