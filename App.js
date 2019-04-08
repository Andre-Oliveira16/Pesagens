import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LoginScreen from './src/screens/login/LoginScreen';
import Base from './src/screens/Base';


class App extends Component {
  render() {
    return (
      <Fragment>
        { this.props.isLoggedIn ? (
          <Base />
        ) : (
          <LoginScreen />
        ) }
      </Fragment>
    );
  }
}

mapStateToProps = state => {
  return { isLoggedIn: state.login.erro === 0 };
};

export default connect(mapStateToProps)(App);
