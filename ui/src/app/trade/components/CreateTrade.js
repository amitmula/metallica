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
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';

import config from 'config';
const API_END_POINT = config.apiEndPoint;

export default class CreateTrade extends Component {

  constructor(props) {
    super(props);
    this.classes = props;
  }

  handleChange(name, event) {
    let formData = {}
    if(name === 'commodity' && event.target.value != 'None') {
      let price = this.props.data.prices.filter(p => p.symbol === event.target.value)[0].price;      
      formData = {'price' : price}
    }
    formData = Object.assign({}, formData, {
      [name]: event.target.value
    })    
    this.props.updateTradeFormState(formData);
  };

  componentDidMount() {
    if (this.props.isEdit === 'true') {      
      this.props.updateTradeFormState(this.props.trade)
    }
  }

  confirmDelete(id) {
    var response = confirm('Do you really want to delete trade ' + id + ' ?');
    return response
  }

  deleteTrade(id) {
    if (this.confirmDelete(id)) {
      fetch(API_END_POINT + '/trade-service/trade/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    }
  }

  saveTrade(update = false) {
    let trade = this.props.tradeForm;
    if (!trade.quantity) { alert('Please enter quantity'); return; }

    if (update) {
      fetch(API_END_POINT + '/trade-service/trade/update/' + trade.tradeId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade)
      }).then(response => response.json())
        .catch(error => console.error('error ----->', error))
        .then(resp => console.log('resp ---> ', resp))
    } else {
      console.log('creating new trade')
      fetch(API_END_POINT + '/trade-service/trade/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade)
      }).then(response => response.json())
        .catch(error => console.error('error ----->', error))
        .then(resp => {
          trade.tradeId = resp.id
          console.log('resp ---> ', resp)
        })
      this.props.setSelected(trade)
    }
    this.props.showRightPanel('showTrade');
  }

  closePanel() {
    this.props.updateTradeFormState(this.props.trade)
    if (this.props.isEdit === 'true') {
      this.props.showRightPanel('showTrade')
    } else {
      this.props.showRightPanel('none')      
    }
  }

  render() {
    return (      
      <Paper className={this.classes.root}>
        <AppBar position="static">
          <Toolbar className="sideHeader">
            <Typography type="Subheading" color="textSecondary">
              {this.props.isEdit == 'true' ? 'Trade ID: ' + this.props.trade.tradeId : 'Create Trade'}
            </Typography>
              {this.props.isEdit == 'true' ? <div className="stickRight"><Icon icon={bin} onClick={() => this.deleteTrade(this.props.trade.tradeId)} /></div> : ''}
          </Toolbar>
        </AppBar>
        <div className="topSpacer leftSpacer">
          <table className="rightPanel">
            <tbody>
              <tr>
                <td>Trade Date</td>
                <td>
                  <TextField
                    id="tradeDate"
                    type="date"
                    defaultValue={this.props.tradeForm.tradeDate}
                    onChange={(e) => this.handleChange('tradeDate', e)}
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
                    <Select
                      className="dropSelects"
                      value={this.props.tradeForm.commodity}
                      onChange={(e) => this.handleChange('commodity', e)}
                      inputProps={{
                        name: 'commodity',
                        id: 'commodity-select',
                      }}
                      style={{maxWidth:'215px', fontSize:'14px'}}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {
                        this.props.data.commodities.map((commodity,index) => {
                          return(<MenuItem value={commodity.symbol} key={index}>{commodity.name}</MenuItem>);
                        })
                      }
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>Side</td>
                <td>
                  <Radio
                    ref="sideCT"
                    id="sideCT"
                    checked={this.props.tradeForm.side === 'Buy'}
                    onClick={(e) => this.handleChange('side', e)}
                    value="Buy"
                    name="side"
                    aria-label="Buy"
                    label="Buy"
                  /> Buy
                  <Radio
                    id="sideCT"
                    ref="sideCT"
                    checked={this.props.tradeForm.side === 'Sell'}
                    onClick={(e) => this.handleChange('side', e)}
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
                    defaultValue={this.props.tradeForm.quantity.toString()}
                    onChange={(e) => this.handleChange('quantity', e)}
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
                    <Select
                      className="dropSelects"
                      value={this.props.tradeForm.counterParty}
                      onChange={(e) => this.handleChange('counterParty', e)}
                      inputProps={{
                        name: 'counterParty',
                        id: 'counterParty-select',
                      }}
                      style={{maxWidth:'215px', fontSize:'14px'}}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {
                        this.props.data.counterParties.map((counterParty,index) => {
                          return(<MenuItem value={counterParty.symbol} key={index}>{counterParty.name}</MenuItem>);
                        })
                      }
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <span id="tradePrice" style={{ "fontSize": "14px" }}> {this.props.tradeForm.price} </span>
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td>
                  <FormControl className={this.classes.formControl}>
                    <Select
                      className="dropSelects"
                      value={this.props.tradeForm.location}
                      onChange={(e) => this.handleChange('location', e)}
                      inputProps={{
                        name: 'location',
                        id: 'location-select',
                      }}
                      style={{maxWidth:'215px', fontSize:'14px'}}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {
                        this.props.data.locations.map((location,index) => {
                          return(<MenuItem value={location.symbol} key={index}>{location.name}</MenuItem>);
                        })
                      }
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>
                  {
                    // if (this.props.validation.errors) {

                    // }
                  }
                  Errors : 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="formButtons">
          {this.props.isEdit == 'true' ?
            <Button color="primary" className={this.classes.button} onClick={() => this.saveTrade(true)}>Update</Button>
            :
            <Button color="primary" className={this.classes.button} onClick={() => this.saveTrade()}>Save</Button>
          }
          <Button color="secondary" style={{ 'margin': '0 0 0 10px' }} className={this.classes.button} onClick={() => this.closePanel()}>Cancel</Button>
        </div>
      </Paper>
    )
  }
}