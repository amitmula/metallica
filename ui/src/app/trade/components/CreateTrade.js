import React, { Component } from "react";
import PropTypes from "prop-types";

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import io from 'socket.io-client';
import Icon from 'react-icons-kit';
import { bin } from 'react-icons-kit/icomoon/bin';

import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';


export default class CreateTrade extends Component {

  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      id: '',
      commodities: [],
      locations: [],
      counterParties: [],
      price: '',
      side: 'Buy',
      elements: {},
      trade: { commodity: '', location: '', counterParty: '', tradeDate: '', price: '', quantity: '', side: 'Buy', status: '' }
    }
  }

  componentDidMount() {
    fetch("http://localhost:8079/api/ref-data-service/ref/locations")
      .then(response => {
        response.json().then(data => {
          this.setState({ locations: data });
        });
      });
    fetch("http://localhost:8079/api/ref-data-service/ref/counterparties")
      .then(response => {
        response.json().then(data => {
          this.setState({ counterParties: data });
        });
      });
    fetch("http://localhost:8079/api/ref-data-service/ref/commodities")
      .then(response => {
        response.json().then(data => {
          this.setState({ commodities: data });
          fetch("http://localhost:8079/api/market-data-service/price/all")
            .then(response => {
              response.json().then(data => {
                var elements = {};
                data.forEach(item => {
                  elements[item.symbol] = item.price;
                })
                let trade = this.state.trade
                let price = elements[this.state.commodities[0].symbol]
                trade.price = price
                this.setState({ elements: elements, price: elements[this.state.commodities[0].symbol], trade: trade });
              });
            });
        });
      });

    if (this.props.isEditable == 'true') {
      this.setState({ trade: this.props.trade })
    }
  }

  confirmDelete(id) {
    var response = confirm('Do you really want to delete trade ' + id + ' ?');
    return response
  }

  deleteTrade(id) {
    if (this.confirmDelete(id)) {
      fetch('http://localhost:8079/api/trade-service/trade/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    }
  }

  saveTrade(update = false) {
    let trade = this.state.trade
    trade.status = 'open'
    console.log('-----------> find element to save -> ', trade)
    if (!trade.quantity) { alert('Please enter quantity'); return; }

    if (update) {
      // console.log('----> making a rest call to ',
      //   'http://localhost:8079/api/trade-service/trade/update/%s with payload %s',
      //   trade.tradeId,
      //   JSON.stringify(trade)
      // )
      fetch('http://localhost:8079/api/trade-service/trade/update/' + trade.tradeId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade)
      }).then((response) => {
        console.log('respones ----->', JSON.stringify(response))
      }).catch((err) => {
        console.error('error ----->', JSON.stringify(err))
      })
    } else {
      fetch('http://localhost:8079/api/trade-service/trade/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade)
      }).then((response) => {
        console.log('respones ----->', JSON.stringify(response))
      }).catch((err) => {
        console.error('error ----->', JSON.stringify(err))
      })
    }
    this.props.showRightPanel('none');
  }

  handleChange(event) {
    let tradeState = this.state.trade
    tradeState.side = event.target.value
    console.log('------>current tradeState -> ', tradeState, 'going to do a setState')
    this.setState({
      side: event.target.value,
      trade: tradeState
    });
  }

  setPriceValue(event) {
    let commodity = event.target.value
    let price = this.state.elements[event.target.value]
    console.log('Setting commodity to ----> ', commodity)
    this.setTradeState('commodity', commodity)
    console.log('Setting price to ----> ', price)
    this.setTradeState('price', price)
    let tradeState = this.state.trade
    this.setState({
      side: tradeState.side,
      trade: tradeState,
      price: tradeState.price
    });
  }

  setDate(event) {
    this.setTradeState('tradeDate', event.target.value)
  }

  setQuantity(event) {
    let quantity = event.target.value
    if (isNaN(quantity)) {
      alert('Quantity should be a numeric value')
    } else {
      this.setTradeState('quantity', parseInt(quantity))
    }
  }

  setCounterparty(event) {
    console.log('Setting counterParty to ----> ', event.target.value)
    this.setTradeState('counterParty', event.target.value)
  }

  setLocation(event) {
    console.log('Setting location to ----> ', event.target.value)
    this.setTradeState('location', event.target.value)
  }

  setTradeState(key, value) {
    let trade = this.state.trade
    if (trade.status === '') {
      console.log('-----> setting status to constructing')
      trade.status = 'constructing'
    }
    trade[key] = value
    console.log("------------> this.state -> ", this.state)
  }

  getTradeDate() {
    //"2017-05-24"
    if (this.props.trade) {
      this.state.trade.tradeDate = this.props.trade.tradeDate
    }
    let currentDateStr = this.state.trade.tradeDate
    console.log(' currentDateStr ------->', currentDateStr)
    if (currentDateStr) {
      return currentDateStr
    } else {
      let date = new Date()
      let tradeDateStr = date.getFullYear() + '-' + ("0" + date.getMonth() + 1).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
      this.state.trade.tradeDate = tradeDateStr
      return tradeDateStr
    }
  }

  getQuantityValue() {
    if (this.props.trade) {
      this.state.trade.quantity = this.props.trade.quantity
    }
    let currentQuantity = this.state.trade.quantity
    if (currentQuantity) return currentQuantity
    else {
      return ''
    }
  }

  render() {
    return (
      <Paper className={this.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="Subheading" color="default">
              {this.props.isEditable == 'true'
                ?
                <div>
                  Trade ID: {this.props.trade.tradeId}
                </div>
                :
                <div>
                  Create Trade
              </div>
              }
            </Typography>
            {this.props.isEditable == 'true' ? <div class="stickRight"><Icon icon={bin} onClick={() => this.deleteTrade(this.props.trade.tradeId)} /></div> : ''}
          </Toolbar>
        </AppBar>
        <table className="rightPanel">
          <body>
            <tr>
              <td>Trade Date</td>
              <td>
                <TextField
                  id="tradeDate"
                  type="date"
                  defaultValue={this.getTradeDate()}
                  onChange={this.setDate.bind(this)}
                  className={this.classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Commodity</td>
              <td>
                <FormControl className={this.classes.formControl}>
                  {this.state.commodities.length > 0 ?
                    <Select native defaultValue={this.state.trade.commodity}
                      input={<Input id="commodityCT" />} onChange={this.setPriceValue.bind(this)} >
                      {
                        this.state.commodities.map((n, key) => {
                          if (key == 0 && this.state.trade.commodity === '') {
                            let commodityprice = this.state.elements[n.symbol]
                            console.log('Setting trade price ->', commodityprice)
                            this.setTradeState('commodity', n.symbol)
                            this.setTradeState('price', commodityprice)
                          }
                          return (<option value={n.symbol}>{n.name}</option>);
                        })
                      }
                    </Select>
                    :
                    null
                  }
                </FormControl>
              </td>
            </tr>
            <tr>
              <td>Side</td>
              <td>
                <Radio
                  ref="sideCT"
                  id="sideCT"
                  checked={this.state.side === 'Buy'}
                  onChange={(e) => this.handleChange(e)}
                  value="Buy"
                  name="side"
                  aria-label="Buy"
                  label="Buy"
                /> Buy
                                <Radio
                  id="sideCT"
                  ref="sideCT"
                  checked={this.state.side === 'Sell'}
                  onChange={(e) => this.handleChange(e)}
                  value="Sell"
                  name="side"
                  aria-label="Sell"
                  label="Sell"
                /> Sell
                          </td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>
                <TextField
                  required
                  id="tradeQuantity"
                  type="text"
                  defaultValue={this.getQuantityValue()}
                  onChange={this.setQuantity.bind(this)}
                  className={this.classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Counterparty</td>
              <td>
                <FormControl className={this.classes.formControl}>
                  {/* <InputLabel htmlFor="uncontrolled-native">Counterparty</InputLabel> */}
                  {this.state.counterParties.length > 0 ?
                    <Select native defaultValue={this.state.trade.counterParty}
                      input={<Input id="counterPartyCT" />} onChange={this.setCounterparty.bind(this)}>
                      {
                        this.state.counterParties.map((n, key) => {
                          if (key == 0 && this.state.trade.counterParty === '') {
                            console.log('Setting trade counterParty ->', n.symbol)
                            this.setTradeState('counterParty', n.symbol)
                          }
                          return (<option value={n.symbol}>{n.name}</option>);
                        })
                      }
                    </Select>
                    :
                    null
                  }
                  {/* <FormHelperText>Uncontrolled</FormHelperText> */}
                </FormControl>

              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <span id="tradePrice" style={{ "fontSize": "14px" }}> {this.state.price} </span>
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>
                <FormControl className={this.classes.formControl}>
                  {/* <InputLabel htmlFor="uncontrolled-native">Location</InputLabel> */}
                  {this.state.locations.length > 0 ?
                    <Select native defaultValue={this.state.trade.location}
                      input={<Input id="locationCT" />} onChange={this.setLocation.bind(this)}>
                      {
                        this.state.locations.map((n, key) => {
                          if (key == 0 && this.state.trade.location === '') {
                            console.log('Setting trade location ->', n.symbol)
                            this.setTradeState('location', n.symbol)
                          }
                          return (<option value={n.symbol}>{n.name}</option>);
                        })
                      }
                    </Select>
                    :
                    null
                  }
                </FormControl>
              </td>
            </tr>
          </body>
        </table>
        <div style={{ padding: '10px 0px 10px 10px' }}>
          {this.props.isEditable == 'true' ?
            <Button raised className={this.classes.button} onClick={() => this.saveTrade(true)}>Update</Button>
            :
            <Button raised className={this.classes.button} onClick={() => this.saveTrade()}>Save</Button>
          }
          <Button raised style={{ 'margin': '0 0 0 10px' }} className={this.classes.button} onClick={() => this.props.showRightPanel('none')}>Cancel</Button>
        </div>
      </Paper>
    )
  }
}