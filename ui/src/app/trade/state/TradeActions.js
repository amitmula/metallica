//const _ = require('lodash');
import * as ActionTypes from "./TradeActionTypes";
import * as service from "../../Services";

export const showRightPanel = (panelName) => {
  return {
    type: ActionTypes.SHOW_RIGHT_PANEL,
    payload: {
      panelName: panelName
    }
  }
}

export const setSelected = (trade) => {
  return {
    type: ActionTypes.SET_SELECTED,
    payload: {
      trade: trade
    }
  }
}

export const updateSearchFormstate = (searchFormState) => {
  return {
    type: ActionTypes.UPDATE_SEARCH_FORM_STATE,
    payload: {
      searchForm: searchFormState
    }
  }
}

export const updateTradeFormstate = (tradeFormState) => {
  return {
    type: ActionTypes.UPDATE_TRADE_FORM_STATE,
    payload: {
      tradeForm: tradeFormState
    }
  }
}

export const updatePrices = (marketData) => {
  return {
    type: ActionTypes.UPDATE_MARKET_DATA,
    payload: {
      prices: marketData
    }
  }
}

export const setSearchMode = (searchMode) => {
  return {
    type: ActionTypes.SET_SEARCH_MODE,
    payload: {
      searchMode: searchMode
    }
  }
}

export const resetSearch = () => {
  return {
    type: ActionTypes.RESET_SEARCH_MODE,
    payload: {}
  }
}

export const createTrade = (trade) => {
  return {
    type: ActionTypes.CREATE_TRADE,
    payload: {
      trade: {
        id: trade.id,
        tradeDate: trade.tradeDate,
        qty: trade.qty,
        price: trade.price,
        side: trade.side,
        commodity: trade.commodity,
        counterParty: trade.counterParty,
        location: trade.location
      }
    }
  }
}

export const deleteTraade = id => {
  return {
    type: ActionTypes.DELETE_TRADE,
    payload: {
      id: id
    }
  }
}

export const editTrade = trade => {
  return {
    type: ActionTypes.EDIT_TRADE,
    payload: {
      trade: trade
    }
  }
}

export function initCommodities(commodities) {
  return {
    type: ActionTypes.INIT_COMMODITIES,
    payload: {
      commodities: commodities
    }
  }
}

export function initCounterParties(counterparties) {
  return {
    type: ActionTypes.INIT_COUNTERPARTIES,
    payload: {
      counterparties: counterparties
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

export function initLocations(locations) {
  return {
    type: ActionTypes.INIT_LOCATIONS,
    payload: {
      locations: locations
    }
  }
}

export function initTrades(trades) {
  return {
    type: ActionTypes.INIT_TRADES,
    payload: {
      trades: trades
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


export function fetchTradesAsync() {
  return async function (dispatch, getState) {
    dispatch(initError(false));
    dispatch(loading(true));
    try {
      let trades = await service.getTradeDataList()
      dispatch(initTrades(trades))
    } catch (error) {
      dispatch(loading(false));
      dispatch(initError(error.toString()));
    }
  }
}

export function fetchRefDataAsync() {
  //thunk shall pass the dispatch
  return async function (dispatch, getState) {
    //no error
    dispatch(initError(false));
    dispatch(loading(true));
    try {
      let commodities = await service.getCommodityList()
      let locations = await service.getLocationList()
      let counterparties = await service.getCounterPartyList()
      dispatch(initCommodities(commodities))
      dispatch(initLocations(locations))
      dispatch(initCounterParties(counterparties))
    } catch (error) {
      dispatch(loading(false));
      dispatch(initError(error.toString()));
    }
  }
}

export function setAsyncFetchComplete() {
  return async function (dispatch, getState) {
    dispatch(loading(false))    //key to start rendering //last call to fetch data from services
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
      dispatch(initPrices(prices))      
    } catch (error) {
      dispatch(loading(false));
      dispatch(initError(error.toString()));
    }
  }
}
