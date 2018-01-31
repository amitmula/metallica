import React, { Component } from "react";
import PropTypes from 'prop-types';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Search from "./Search";
import TradeList from "./TradeList";

import * as actions from "../state/actions";

export default class Trade extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextprops) {
    console.log('-----------------> componentWillReceiveProps ->', nextprops);
  }

  componentDidMount() {
    this.props.actions.fetchTradeDataListAsync();
    this.props.actions.fetchCommodityListAsync();
    this.props.actions.fetchLocationListAsync();
    this.props.actions.fetchCounterpartyListAsync();
    this.props.actions.fetchMarketPriceListAsync();
  }

  showRightPanel(panelName) {
    this.props.actions.showRightPanel(panelName);
  }

  setSelected(tradeObj) {
    this.props.actions.setSelected(tradeObj);
  }

  render() {
    const { rightPanel, selected, trades } = this.props;
    return (
      <div>
        <Row>
          <Search data={{"commodities" : this.props.commodities, "counterParties" : this.props.counterparties, "locations" : this.props.locations}} />
        </Row>
        <Row>
          <TradeList
            rightPanel={this.props.rightPanel}
            selected={this.props.selected}
            setSelected={(tradeObj) => this.setSelected(tradeObj)}
            trades={this.props.trades}
            data={{"commodities" : this.props.commodities, "counterParties" : this.props.counterparties, "locations" : this.props.locations, "prices" : this.props.prices}}
            showRightPanel={(panelName) => this.showRightPanel(panelName)}
          ></TradeList>
        </Row>
      </div>
    );
  }
}

Trade.defaultProps = {
  rightPanel: 'none',
  selected: {},
  trades: [],
  counterparties: [],
  commodities : [],
  locations : [],
  prices : [],
  loading: false,
  error: false,
  errorMessage: ''
}

Trade.propTypes = {

}