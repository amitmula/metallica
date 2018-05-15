import React, { Component } from "react";
import PropTypes from "prop-types";

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Icon from 'react-icons-kit';
import { bin } from 'react-icons-kit/icomoon/bin';
import { pencil } from 'react-icons-kit/icomoon/pencil';
import { cancelCircle } from 'react-icons-kit/icomoon/cancelCircle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class ShowTrade extends Component {

  constructor(props) {
    super(props);
    this.classes = props;
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
      this.props.showRightPanel('none')
    }
  }

  render() {
    return (
      <Paper className={this.classes.root}>
        <AppBar position="static">
          <Toolbar className="sideHeader">
            <Typography type="Subheading" color="default">
              Trade ID: {this.props.trade.tradeId}
            </Typography>
            <div className="stickRight">
              <Icon icon={pencil} onClick={() => this.props.editAction()} />
              <Icon icon={bin} onClick={() => this.deleteTrade(this.props.trade.tradeId)} />
              <Icon icon={cancelCircle} onClick={() => this.props.showRightPanel('none')} />
            </div >
          </Toolbar>
        </AppBar>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Trade Date</TableCell>
              <TableCell>{this.props.trade.tradeDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Commodity</TableCell>
              <TableCell>
                {
                  this.props.data.commodities.map((commodity, index) => {
                    if (commodity.symbol == this.props.trade.commodity) return commodity.name
                  })
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Side</TableCell>
              <TableCell>{this.props.trade.side}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Counterparty</TableCell>
              <TableCell>
                {
                  this.props.data.counterParties.map((cp, index) => {
                    if (cp.symbol == this.props.trade.counterParty) return cp.name
                  })
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>{this.props.trade.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell>{this.props.trade.quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>
                {
                  this.props.data.locations.map((location, index) => {
                    if (location.symbol == this.props.trade.location) return location.name
                  })
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

ShowTrade.PropTypes = {
  classes: PropTypes.object.isRequired,
}