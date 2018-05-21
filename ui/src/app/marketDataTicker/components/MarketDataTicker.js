import React, { Component } from "react";
import Paper from 'material-ui/Paper';
import config from 'config';

export default class MarketDataTicker extends Component {
  constructor(props) {
    super(props)
    this.classes = props;
    this.state = {
      socket: null
    }
  }

  componentDidMount() {    
    this.props.actions.fetchMarketDataAsync();    
  }

  getPriceTicker() {
    let prices = this.props.prices;
    console.log('this.props.prices in getPriceTicker -> ', prices)
    return (
      <div className="tickerContainer">
        <marquee>
        {
          prices.map((marketData, index) => { return(<div className="ticker" key={index}><span className="symbol">{marketData.symbol}</span><span className="price">{marketData.price}</span></div>)})
        }
        </marquee>
      </div>    
    );
  }

  render() {
    console.log('this.props.loading -> ', this.props.loading)
    return(
      this.props.loading?'loading...': this.getPriceTicker()
    );
  }
}