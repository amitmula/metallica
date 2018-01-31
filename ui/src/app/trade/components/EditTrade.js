import React, {Component} from "react";
import PropTypes from "prop-types";

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'react-icons-kit';
import { bin } from 'react-icons-kit/icomoon/bin';

import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';

export default class EditTrade extends Component{
    constructor(props){
        super(props);
        this.classes = props;

        const commodityData = [
            {
                "commodityId": 1,
                "commodity": "AL",
            },
            {
                "commodityId": 2,
                "commodity": "ZN",
            },
            {
                "commodityId": 3,
                "commodity": "CU",
            },
            {
                "commodityId": 4,
                "commodity": "AU",
            },
            {
                "commodityId": 5,
                "commodity": "AG",
            }
        ]

        const locationData = [
            {
                "locationId": 10,
                "location": "SG"
            },
            {
                "locationId": 20,
                "location": "LN"
            },
            {
                "locationId": 30,
                "location": "NY"
            },
            {
                "locationId": 40,
                "location": "DN"
            }
        ]

        const counterPartyData = [
            {
                "counterPartyId": 101,
                "counterParty": "Lorem"
            },
            {
                "counterPartyId": 102,
                "counterParty": "Dolor"
            },
            {
                "counterPartyId": 103,
                "counterParty": "Ipsum"
            },
            {
                "counterPartyId": 104,
                "counterParty": "Amet",
            }
        ]

        const priceData  = [
            {
                "commodityId": 1,
                "locationId": 10,
                "price": 1234.45
            },
            {
                "commodityId": 2,
                "locationId": 10,
                "price": 4321.45
            },
            {
                "commodityId": 3,
                "locationId": 10,
                "price": 5678.45
            },
            {
                "commodityId": 4,
                "locationId": 10,
                "price": 8755.45
            },
            {
                "commodityId": 5,
                "locationId": 10,
                "price": 5863.45
            }
        ]

        this.state ={
            "priceData": priceData,
            "counterPartyData": counterPartyData,
            "locationData": locationData,
            "commodityData": commodityData,
            "side": "Buy"

        }
    }

    updateTrade() {

    }
    
    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="Subheading" color="secondary">
                        Trade ID: {this.props.trade.tradeId}
                        <Icon icon={bin} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <table>
                    <body>
                        <tr>
                            <td>Trade Date</td>
                            <td>
                                <TextField
                                    id="tradeDateET"
                                    label=""
                                    type="date"
                                    defaultValue={this.props.trade.tradeDate}
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
                                    {/* <InputLabel htmlFor="uncontrolled-native">Commodity</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.commodityId} input={<Input id="commodityET" />}>
                                        {
                                            this.state.commodityData.map( n => {
                                            return (
                                                <option value={n.commodityId}>{n.commodity}</option>
                                            );
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
                                    checked= {this.props.trade.side === 'Buy'}
                                    onChange={this.handleChange}
                                    value="Buy"
                                    name="side"
                                    id="sideET"
                                    aria-label="Buy"
                                    label="Buy"
                                /> Buy
                                <Radio
                                    checked={this.props.trade.side === 'Sell'}
                                    onChange={this.handleChange}
                                    value="Sell"
                                    name="side"
                                    id="sideET"
                                    aria-label="B"
                                    label="Sell"
                                /> Sell
                            </td>
                        </tr>
                        <tr>
                            <td>Counterparty</td>
                            <td>
                                <FormControl className={this.classes.formControl}>
                                    {/* <InputLabel htmlFor="uncontrolled-native">Counterparty</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.counterPartyId} input={<Input id="counterPartyET" />}>
                                        {
                                            this.state.counterPartyData.map( n => {
                                                return (
                                                    <option value={n.counterPartyId}>{n.counterParty}</option>
                                                );
                                            })
                                        }
                                    </Select>
                                    {/* <FormHelperText>Uncontrolled</FormHelperText> */}
                                    </FormControl>

                            </td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>
                                <div id="priceET" ref="priceET"> {'$1234.45 USD'}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>
                                <FormControl className={this.classes.formControl}>
                                    {/* <InputLabel htmlFor="uncontrolled-native">Location</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.locationId} input={<Input id="locationET" />}>
                                        {
                                            this.state.locationData.map( n => {
                                                return (
                                                    <option value={n.locationId}>{n.location}</option>
                                                );
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </td>
                        </tr>
                    </body>
                </table>
                <Button raised  className={this.classes.button} onClick = {() => this.props.showRightPanel('none')}>Cancel</Button>&emsp;
                <Button raised  className={this.classes.button} onClick = {() => this.updateTrade()}>Update</Button>
            </div>
        )
    }
}