import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export default class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.classes = props;
  }

  setSearchTrue() {
    this.props.setSearchMode(true)
  }

  setSearchFalse() {
    //clear form state here.
    this.props.setSearchMode(false)
  }

  resetForm() {
    this.props.searchForm
  }

  handleChange = name => (event, checked) => {
    if(event.target.type == 'checkbox') {
      this.props.updateSearchFormState({
        [name]: checked
      });
    } else {
      this.props.updateSearchFormState({
        [name]: event.target.value
      });
    }    
  };

  render() {
    return (
      <div id="searchForm" >
        <form className={this.classes.container} noValidate autoComplete="off">
          <Grid container>
            <Grid item>
              <FormControl className={this.classes.formControl}>
                <TextField
                 id="tradeDateFrom"
                 type="date"
                 label="Trade Date"
                 className={this.classes.textField}
                 value={this.props.searchForm.tradeDateFrom}
                 onChange={this.handleChange('tradeDateFrom')}
                 InputLabelProps={{
                  shrink: true,
                 }}
                />
              </FormControl>
              <div className="inlinBlock leftSpacer rightSpacer">to</div>
              <FormControl className={this.classes.formControl}>
                <TextField
                 id="tradeDateTo"
                 label=""
                 type="date"
                 className={this.classes.textField}
                 value={this.props.searchForm.tradeDateTo}
                 onChange={this.handleChange('tradeDateTo')}                 
                 InputLabelProps={{
                  shrink: true,
                 }}
                />
              </FormControl>
            </Grid>
            <Grid item className="sideContainer">
              <div className="leftSpacer">
                <FormLabel component="label">Side</FormLabel>
                <FormGroup row label="Side">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.searchForm.checkedBuy}
                        onChange={this.handleChange('checkedBuy')}                        
                      />
                    }
                    label="Buy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.props.searchForm.checkedSell}
                        onChange={this.handleChange('checkedSell')}                     
                      />
                    }
                    label="Sell"
                  />
                </FormGroup>
              </div>
            </Grid>
            <Grid item>
              <div className="leftSpacer">
                <FormControl className={this.classes.formControl}>
                <InputLabel htmlFor="commodity-select">Commodity</InputLabel>
                <Select
                  className="dropSelects"
                  value={this.props.searchForm.commodity}
                  onChange={this.handleChange('commodity')}
                  inputProps={{
                    name: 'commodity',
                    id: 'commodity-select',
                  }}
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
              </div>
            </Grid>
            <Grid item>
              <div className="leftSpacer">
                <FormControl className={this.classes.formControl}>
                <InputLabel htmlFor="counterparty-select">Counter Party</InputLabel>
                <Select
                  className="dropSelects"
                  value={this.props.searchForm.counterParty}
                  onChange={this.handleChange('counterParty')}
                  inputProps={{
                    name: 'counterparty',
                    id: 'counterparty-select',
                  }}
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
              </div>
            </Grid>
            <Grid item>
              <div className="leftSpacer">
                <FormControl className={this.classes.formControl}>
                <InputLabel htmlFor="counterparty-select">Location</InputLabel>
                <Select
                  className="dropSelects"
                  value={this.props.searchForm.location}
                  onChange={this.handleChange('location')}
                  inputProps={{
                    name: 'location',
                    id: 'location-select',
                  }}
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
              </div>
            </Grid>            
            <Grid item xs sm>
              <Grid container justify="flex-end" className="topSpacer">
                <Button color="primary" onClick={() => this.setSearchTrue()} className={this.classes.button}>
                  Search
                </Button>
                <Button color="secondary" onClick={() => this.setSearchFalse()} className={this.classes.button}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
