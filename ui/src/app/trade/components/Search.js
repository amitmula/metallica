import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
});

function clear() {
  console.log("clear method");
}

function search() {
  console.log("search method");
}

function handleSideChange(e, state) {
  //Todo
  const index = state.side.indexOf(e.target.value);
  console.log('state.side ---> ', state.side)
  if(index > -1) {
    console.log('index found --->', index)
    if(!e.target.checked) {
      state.side.splice(index, 1)
    }
  } else {
    console.log('index not found --> ', index)
    if(e.target.checked) {
      state.side.push(e.target.value)
    }
    console.log('state.side ---> ', state.side)
  }

  // e.target.checked ? state.side = e.target.value : state.side = '' 
  // state.side
  // console.log('isChecked ------------> ', e.target.checked)
  // console.log('------------> handleSideChange -> ', e.target.value)
}

function Search(props) {
  const { classes } = props;
  console.log('Search constructor -------------> ' + JSON.stringify(props))
  const { commodities } = props.data;

  const {counterParties} = props.data;
  const {locations} = props.data;

  const priceData = []

  const state = {
    "priceData": priceData,
    "counterPartyData": counterParties,
    "locationData": locations,
    "commodityData": commodities,
    "side": []
  };

  

  return (
    <Paper style={{padding:'10px', marginBottom:'20px'}}>
    <form className={classes.container} noValidate>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <span>Trade Date</span><br />
          <TextField
            id="tradeDateSearch"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          /> TO
            <TextField
            id="toTradeDateSearch"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="commoditySearch">Commodity</InputLabel>
            <Select native defaultValue={0} input={<Input id="commoditySearch" />}>
              <option value="0" />
              {
                state.commodityData.map(n => {
                  console.log('setting option value ->> ', JSON.stringify(n))
                  return (
                    <option value={n.symbol}>{n.name}</option>
                  );
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <span>Side</span><br />
          <FormGroup row>
            {/* <InputLabel htmlFor="sideSearch">Side</InputLabel> */}
            <FormControlLabel
              control={
                <Checkbox checked={state.side.indexOf('Buy') > -1} onChange={(e) => {handleSideChange(e, state)}} value="Buy" />
              }
              label="Buy"
            />
            <FormControlLabel
              control={
                <Checkbox checked={state.side.indexOf('Sell') > -1} onChange={(e) => {handleSideChange(e, state)}} value="Sell" />
              }
              label="Sell"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={1} >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="counterpartySearch">Counterparty</InputLabel>
            <Select native defaultValue={0} input={<Input id="counterpartySearch" />}>
              <option value="0" />
              {
                state.counterPartyData.map(n => {
                  return (
                    <option value={n.symbol}>{n.name}</option>
                  );
                })
              }
            </Select>
            {/* <FormHelperText>Uncontrolled</FormHelperText> */}
          </FormControl>

        </Grid>

        <Grid item xs={1}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="locationSearch">Location</InputLabel>
            <Select native defaultValue={0} input={<Input id="locationSearch" />}>
              <option value="0" />
              {
                state.locationData.map(n => {
                  return (
                    <option value={n.symbol}>{n.name}</option>
                  );
                })
              }
            </Select>
          </FormControl>

        </Grid>

        <Grid item xs={3} className="seachAction">
          <Button className={classes.button} className="floatRight" onClick={clear}>clear</Button>
          <Button className={classes.button} className="floatRight" onClick={search}>Search</Button>
        </Grid>
      </Grid>
    </form>
    </Paper>
  );
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);