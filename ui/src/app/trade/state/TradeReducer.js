import * as ActionTypes from './TradeActionTypes';

const INITIAL_SEARCH_FORM = {
  tradeDateFrom : '',
  tradeDateTo: '',
  commodity: 'None',
  counterParty: 'None',
  location: 'None',
  checkedBuy: false,
  checkedSell: false
}

const INITIAL_TRADE_FORM = {
  commodity: 'None', 
    location: 'None', 
    counterParty: 'None', 
    tradeDate: '', 
    price: '', 
    quantity: '0', 
    side: 'Buy', 
    status: 'Open'
}

const INITIAL_STATE = {
  rightPanel: 'none',
  selected: {},
  commodities: [],
  locations: [],
  counterparties: [],
  prices: [],
  trades: [],
  searchMode : false,
  tradeFilter : {},
  filteredTrades : [],
  searchForm : INITIAL_SEARCH_FORM,
  tradeForm: INITIAL_TRADE_FORM,
  loading: false,
  error: false,
  errorMessage: ''
};

export default function tradeReducer(state = INITIAL_STATE, action) {
  
  switch (action.type) {

    case ActionTypes.LOADING: {
      return Object.assign({}, state, { loading: action.payload.loading })
    }

    case ActionTypes.INIT_ERROR: {
      return Object.assign({}, state, { error: action.payload.error })
    }

    case ActionTypes.INIT_TRADES: {
      let trades = action.payload.trades;
      return Object.assign({}, state, { trades })
    }

    case ActionTypes.INIT_COMMODITIES: {
      let commodities = action.payload.commodities;
      return Object.assign({}, state, { commodities })
    }

    case ActionTypes.INIT_LOCATIONS: {
      let locations = action.payload.locations;
      return Object.assign({}, state, { locations })
    }

    case ActionTypes.INIT_COUNTERPARTIES: {
      let counterparties = action.payload.counterparties;
      return Object.assign({}, state, { counterparties })
    }

    case ActionTypes.INIT_PRICES: {
      let prices = action.payload.prices;
      return Object.assign({}, state, { prices })
    }

    case ActionTypes.SHOW_RIGHT_PANEL: {
      return Object.assign({}, state, { rightPanel: action.payload.panelName })
    }

    case ActionTypes.SET_SELECTED: {
      return Object.assign({}, state, { selected: action.payload.trade })
    }

    case ActionTypes.CREATE_TRADE: {
      let trade = state.find(trade => trade.id == action.payload.trade.id);
      if (!trade)
        return [...state, action.payload.trade]
    }

    case ActionTypes.EDIT_TRADE: {
      return state.map(trade => {
        if (trade.id != action.payload.trade.id)
          return trade;

        return Object.assign({}, trade,
          {
            qty: action.payload.trade.qty,
            price: action.payload.trade.price,
            commodity: action.payload.trade.commodity,
            side: action.payload.trade.side,
            tradeDate: action.payload.trade.tradeDate,
            counterParty: action.payload.trade.counterParty,
            location: action.payload.trade.location
          });
      })
    }

    case ActionTypes.DELETE_TRADE: {
      return state.filter(trade => trade.id != action.payload.id)
    }

    case ActionTypes.SET_SEARCH_MODE: {
      if(action.payload.searchMode) {        
        let tradeFilter = state.tradeFilter
        if(state.searchForm.tradeDateFrom.length > 0)
          tradeFilter = Object.assign({}, tradeFilter, {tradeDateFrom: state.searchForm.tradeDateFrom})
        if(state.searchForm.tradeDateTo.length > 0)
          tradeFilter = Object.assign({}, tradeFilter, {tradeDateTo: state.searchForm.tradeDateTo})
        
        if(state.searchForm.checkedBuy) {          
          if(!tradeFilter.side) {
            tradeFilter.side = []            
          } 
          if(tradeFilter.side.indexOf('buy') < 0) {                        
            tradeFilter.side.push('buy')
          }
        } else {
          if(tradeFilter.side) {
            let index = tradeFilter.side.indexOf('buy');
            if(index > -1) {              
              tradeFilter.side.splice(index, 1);
            }
          }
        }
        
        if(state.searchForm.checkedSell) {
          if(!tradeFilter.side) {
            tradeFilter.side = []
          }
          if(tradeFilter.side.indexOf('sell') < 0) {            
            tradeFilter.side.push('sell')
          }          
        } else {
          if(tradeFilter.side) {
            let index = tradeFilter.side.indexOf('sell');
            if(index > -1) {              
              tradeFilter.side.splice(index, 1);
            }
          }
        }

        if(state.searchForm.commodity != 'None')
          tradeFilter = Object.assign({}, tradeFilter, {commodity: state.searchForm.commodity})
        if(state.searchForm.counterParty != 'None')
          tradeFilter = Object.assign({}, tradeFilter, {counterParty: state.searchForm.counterParty})
        if(state.searchForm.location != 'None')
          tradeFilter = Object.assign({}, tradeFilter, {location: state.searchForm.location})

        let filteredTrades = state.trades;

        //filteredTrades = state.trades.filter(trade => trade.tradeDate === '2018-01-10')
        
        Object.keys(tradeFilter).forEach(function(key,index) {
          if(key === 'tradeDateFrom') {
            filteredTrades = filteredTrades.filter(trade => {
              let fromDate = new Date(tradeFilter[key]);
              let tradeDate = new Date(trade.tradeDate);
              return tradeDate >= fromDate
            })
          } else if(key === 'tradeDateTo') {
            filteredTrades = filteredTrades.filter(trade => {
              let toDate = new Date(tradeFilter[key]);
              let tradeDate = new Date(trade.tradeDate);
              return tradeDate <= toDate
            })
          } else if (key === 'side') {
            let sides = tradeFilter[key]
            if(sides.length > 0) {
              filteredTrades = filteredTrades.filter(trade => sides.indexOf(trade.side.toLowerCase()) > -1)
            }
          } else {
            filteredTrades = filteredTrades.filter(trade => trade[key] === tradeFilter[key])
          }
        });
        state = Object.assign({}, state, {tradeFilter: tradeFilter, filteredTrades: filteredTrades})
      }
      return Object.assign({}, state, { searchMode: action.payload.searchMode, rightPanel: 'none'})
    }

    case ActionTypes.RESET_SEARCH_MODE: {
      return Object.assign({}, state, { 
          searchForm: INITIAL_SEARCH_FORM, 
          tradeFilter : {},
          filteredTrades : []
        })
    }
    
    case ActionTypes.UPDATE_SEARCH_FORM_STATE: {
      let currentSearchFormState = state.searchForm
      let currentTradeFilter = state.tradeFilter
      let searchFormStateChange = action.payload.searchForm
      currentSearchFormState = Object.assign({}, currentSearchFormState, { ...searchFormStateChange })
      Object.keys(currentSearchFormState).forEach(function(key,index) {
        if (currentTradeFilter.hasOwnProperty('key')) {
          currentTradeFilter = Object.assign({}, currentTradeFilter, {[key] : currentSearchFormState[key]})
        }
      });      
      return Object.assign({}, state, { searchForm: currentSearchFormState, tradeFilter: currentTradeFilter})
    }

    case ActionTypes.UPDATE_TRADE_FORM_STATE: {
      let currentTradeFormState = state.tradeForm
      let tradeFormStateChange = action.payload.tradeForm
      currentTradeFormState = Object.assign({}, currentTradeFormState, { ...tradeFormStateChange })      
      return Object.assign({}, state, { tradeForm: currentTradeFormState })
    }
    
    case ActionTypes.UPDATE_MARKET_DATA: {
      let currentPrices = state.prices
      let marketDataUpdate = action.payload.prices
      currentPrices = Object.assign({}, currentPrices, { ...marketDataUpdate })      
      return Object.assign({}, state, { prices: currentPrices })
    }

    default:
      return state;
  }
}