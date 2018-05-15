import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  chip: {
    margin: theme.spacing.unit,
  }
});

class MenuAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: props.userProfile };
  }

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout = event => {
    this.props.logout();
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div style={{fontSize:'25px'}} className={classes.flex}><img className="logo" src="static/images/Logo.png" alt="Metallica Logo" />etallica</div>
            <Chip
              avatar={<Avatar src={this.state.user.imageUrl} />}
              label={this.state.user.name}
              className={classes.chip}
            />
            <Button variant="flat" className={classes.button} onClick={(e) => this.handleLogout(e)}>Logout</Button>            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);