import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';

import CreateTrade from "./CreateTrade";
import ShowTrade from "./ShowTrade";

import io from 'socket.io-client';
import config from 'config';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class TradeList extends Component {

  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      socket: null
    }
  }

  displayAlert(message) {
    
  }

  loadShowPanel(event, trade) {
    this.props.setSelected(trade);
    this.props.showRightPanel('showTrade');
    this.props.updateTradeFormState(trade)
  }

  loadEditPanel() {
    this.props.showRightPanel('editTrade');
  }

  isSelected = (id) => {
    if (this.props.selected !== undefined && this.props.selected != {} && this.props.selected.tradeId === id)
      return true;
    else
      return false;
  }

  createTrade() {
    this.props.updateTradeFormState({
      commodity: 'None', 
      location: 'None', 
      counterParty: 'None', 
      tradeDate: '', 
      price: '', 
      quantity: '0', 
      side: 'Buy', 
      status: 'Open'
    })    
    this.props.showRightPanel('createTrade')
  }

  deleteTrade(id) {

  }

  filterTrades() {
    return this.props.trades.filter(
      trade => {
        if(this.props.searchForm.commodity) {          
          trade.commodity === this.props.searchForm.commodity
        }
      }
    )
  }

  showDialog() {

  }

  componentDidMount() {
    this.state.socket = io.connect(config.nsEndPoint);

    // listen to messages on socket
    // built-in message
    this.state.socket.on('connect', () => {
      this.state.socket.emit('join channel', 'tradeDataModified', function (confirmation) {
        console.log(confirmation);
      });
    });

    this.state.socket.on('connect', () => {
      this.state.socket.emit('join channel', 'marketDataModified', function (confirmation) {
        console.log(confirmation);
      });
    });

    this.state.socket.on('connect_error', () => {
      console.error('Error connecting to notification service.')
      //alert( "There seems to be an issue with Data Notification Service !!" );
    });
    this.state.socket.on('trade data modified', (socketData) => {
      var respData = JSON.parse(socketData);
      if (respData.action == 'add') {
        delete respData.action;
        delete respData._id;
        this.props.trades.push(respData)
        this.forceUpdate()
      }

      if (respData.action == 'update') {
        delete respData.action;
        delete respData._id;
        let index = this.props.trades.findIndex(trade => trade.tradeId==respData.tradeId);        
        let filtered_trades = this.props.trades.filter(trade => trade.tradeId !== respData.tradeId)
        filtered_trades.splice(index, 0, respData);        
        this.props.trades.length = 0
        this.props.trades.push(...filtered_trades)
        let selected_trade = this.props.selected
        if(selected_trade.tradeId==respData.tradeId) {
          this.props.setSelected(respData);
        }
        this.forceUpdate()
      }

      if (respData.action == 'remove') {
        let filtered_trades = this.props.trades.filter(trade => trade.tradeId !== respData.tradeId)
        this.props.trades.length = 0
        this.props.trades.push(...filtered_trades)
        this.props.showRightPanel('')
        this.forceUpdate()
      }

    });
    this.state.socket.on('market data modified', (socketData) => {
      var respData = JSON.parse(socketData);
      if (respData.length > 0) {
        this.props.setPrice(respData)
      }
    });
  }

  render() {

    if (this.props.loading) {
      return (
        <h2>Trades loading ...</h2>
      );
    }

    if (this.props.error) {
      return (
        <h2> Error loading trades {this.props.errorMessage} </h2>
      )
    }

    const showRightPanel = this.props.rightPanel;
    const tableColSize = () => {
      if (showRightPanel === 'showTrade' || showRightPanel === 'createTrade' || showRightPanel === 'editTrade')
        return 8;
      else
        return 12;
    }
    return (
      <div>
        <Row>
          <Col md={tableColSize()} xs={12}>
            <Paper className={this.classes.root}>
              <Table className={this.classes.table} className="tradeList">
                <TableHead>
                  <TableRow>
                    <TableCell>Trade Date</TableCell>
                    <TableCell>Commodity</TableCell>
                    <TableCell>Side</TableCell>
                    <TableCell>Qty (MT)</TableCell>
                    <TableCell>Price (/MT)</TableCell>
                    <TableCell>Counterparty</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.trades.length ? 
                  this.props.trades.map((n, index) => {
                    const isSelected = this.isSelected(n.tradeId);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.loadShowPanel(event, n)}
                        tabIndex={-1}
                        selected={isSelected}
                        key={index}>
                        <TableCell>
                          {
                            n.tradeDate
                          }
                        </TableCell>
                        <TableCell>
                          {
                            this.props.data.commodities.map((commodity, index) => {
                              if (commodity.symbol == n.commodity) return commodity.name
                            })
                          }
                        </TableCell>
                        <TableCell>{n.side}</TableCell>
                        <TableCell>{n.quantity}</TableCell>
                        <TableCell>{n.price}</TableCell>
                        <TableCell>
                          {
                            this.props.data.counterParties.map((counterParty, index) => {
                              if (counterParty.symbol == n.counterParty) return counterParty.name
                            })
                          }
                        </TableCell>
                        <TableCell>
                          {
                            //n.location
                            this.props.data.locations.map((location, index) => {
                              if (location.symbol == n.location) return location.name
                            })
                          }
                        </TableCell>
                      </TableRow>
                    );
                  }):<TableRow><TableCell colSpan="7" className="noResults">No trades found</TableCell></TableRow>}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan="7" variant="footer"></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <div className="fallRight">
                <Button variant="fab" color="primary" aria-label="add" onClick={() => this.props.showRightPanel('createTrade')}>
                  <AddIcon />
                </Button>
              </div>
            </Paper>
          </Col>
          <Col md={4} xs={12}>
            {showRightPanel === 'showTrade' && 
              <ShowTrade 
                trade={this.props.selected} 
              data={this.props.data} 
              editAction={() => this.loadEditPanel()}
              showRightPanel={(panelName) => this.props.showRightPanel(panelName)}
                />
              }
            {showRightPanel === 'createTrade' && 
              <CreateTrade 
                isEdit='false' 
                tradeForm={this.props.tradeForm}    
                data={this.props.data} 
                showRightPanel={(panelName) => this.props.showRightPanel(panelName)} 
                updateTradeFormState={(tradeForm) => this.props.updateTradeFormState(tradeForm)}
                setSelected={(trade) => this.props.setSelected(trade)}
              />
            }
            {showRightPanel === 'editTrade' && 
              <CreateTrade 
                isEdit='true' 
                tradeForm={this.props.tradeForm} 
                data={this.props.data} 
                trade={this.props.selected} 
                showRightPanel={(panelName) => this.props.showRightPanel(panelName)}
                updateTradeFormState={(tradeForm) => this.props.updateTradeFormState(tradeForm)}
              />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(TradeList);