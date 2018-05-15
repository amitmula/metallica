import React, { Component } from "react";
import PropTypes from 'prop-types';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/fa/user';
import Trades from "../trade/container/TradeContainer";
import Transfers from "./Transfers";
import Transports from "./Transports";
import grey from 'material-ui/colors/grey';
import orange from 'material-ui/colors/orange';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: orange,
  }
});

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit
  },
});

function TabContainer(props) {
  return <div className="tabContainer">{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: props.tabValue
    }
    this.classes = props;
  }

  handleChange = (event, value) => {
    const tabValue = value;
    this.setState({ tabValue });
  };

  render() {
    const tab = this.state.tabValue;
    return (
      <MuiThemeProvider theme={theme}>        
        <div className={this.classes.root}>
          <AppBar position="static" color="primary">
            <Tabs value={tab} onChange={this.handleChange}>
              <Tab value="trades" label="TRADES" />
              <Tab value="transfers" label="TRANSFERS" />
              <Tab value="transports" label="TRANSPORTS" />
            </Tabs>
          </AppBar>
          {tab === 'trades' && <TabContainer><Trades /></TabContainer>}
          {tab === 'transfers' && <TabContainer><Transfers /></TabContainer>}
          {tab === 'transports' && <TabContainer><Transports /></TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }

}

Home.defaultProps = {
  tabValue: 'trades'
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
