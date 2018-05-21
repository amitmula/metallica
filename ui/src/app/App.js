import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/footer";

import { GoogleLogin } from 'react-google-login';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  logout = () => {
    this.setState({isAuthenticated: false, user: null, token: ''})
  };

  googleResponse = (response) => {
    console.log("googleResponse -> ", response.profileObj);
    this.setState({isAuthenticated: true, user: response.profileObj, token: response.accessToken});
  };
  
  onFailure = (error) => {
    alert(error);
  }

  render() {
    console.log("this.state.isAuthenticated -> ", this.state.isAuthenticated);
    let content = !!this.state.isAuthenticated ?
    (
      <Grid>
        <Row><Header userProfile={this.state.user} logout={this.logout}/></Row>
        <Row><Home /></Row>
        <Row><Footer /></Row>
      </Grid>        
    ) :
    (
        <div className="centeredLogin">
            <p>Welcome to Metallica App, please login to continue.</p>
            <GoogleLogin
                clientId="241833752836-3sj5qj33bgsij77384q33t57c6j5nfqk.apps.googleusercontent.com"
                buttonText="Login using Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
            />
        </div>
    );
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

App.defaultProps = {

}

App.propTypes = {

}