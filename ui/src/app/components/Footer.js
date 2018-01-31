import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const pjson = require('../../../package.json');

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
});

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.classes = props;
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <p>Metallica ver. {pjson.version}</p>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);