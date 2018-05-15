import React, { Component } from "react";
import PropTypes from 'prop-types';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import SearchForm from "./SearchForm";
import TradeList from "./TradeList";

import * as actions from "../state/TradeActions";

export default class Trade extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.searchMode) {
      this.props.actions.fetchTradesAsync()
      this.props.actions.fetchRefDataAsync()
      this.props.actions.fetchMarketDataAsync()
      this.props.actions.setAsyncFetchComplete()
    }
  }

  setSearchMode(searchMode) {
    this.props.actions.setSearchMode(searchMode)
    if(!searchMode) {
      this.props.actions.resetSearch()
      this.props.actions.fetchTradesAsync()
      this.props.actions.setAsyncFetchComplete()
    }
  }

  showRightPanel(panelName) {
    this.props.actions.showRightPanel(panelName);
  }

  setSelected(tradeObj) {
    this.props.actions.setSelected(tradeObj);
  }

  updateSearchFormState(searchFormstate) {
    this.props.actions.updateSearchFormstate(searchFormstate)
  }

  updateTradeFormState(tradeFormstate) {
    this.props.actions.updateTradeFormstate(tradeFormstate)
  }

  updatePrices(marketData) {
    this.props.actions.updatePrices(marketData)
    this.props.actions.fetchMarketDataAsync()
    this.props.actions.setAsyncFetchComplete()
  }

  render() {
    return (this.props.loading ? <div>data loading...</div> : 
      <div>
        <Row>
          <SearchForm 
            updateSearchFormState={(searchForm) => this.updateSearchFormState(searchForm)}
            searchForm={this.props.searchForm}            
            data={{ 
              "commodities": this.props.commodities, 
              "counterParties": this.props.counterparties, 
              "locations": this.props.locations
            }}
            setSearchMode={(searchMode) => this.setSearchMode(searchMode)}
          />
        </Row>
        <Row>
          <TradeList
            rightPanel={this.props.rightPanel}
            selected={this.props.selected}
            trades={this.props.searchMode ? this.props.filteredTrades : this.props.trades}
            updateTradeFormState={(tradeForm) => this.updateTradeFormState(tradeForm)}
            tradeForm={this.props.tradeForm}
            setSelected={(tradeObj) => this.setSelected(tradeObj)}
            setPrice={(marketData) => this.updatePrices(marketData)}
            showRightPanel={(panelName) => this.showRightPanel(panelName)}
            data={{
              "commodities": this.props.commodities, 
              "counterParties": this.props.counterparties, 
              "locations": this.props.locations, 
              "prices": this.props.prices 
            }}
          ></TradeList>
        </Row>
      </div>
    );
  }
}
