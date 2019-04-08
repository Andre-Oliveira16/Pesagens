import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { login } from '../../actions/login';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  render() {
    return (
      <View style={styles.loginBackground}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{backgroundColor: 'rgba(255, 255, 255, .1)', padding: 10}}>
            <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Trânsitos Internos Lipor</Text>
          </View>
        </View>
        <View style={{flex: 2, marginTop: 40}}>
          <TextInput
            style={styles.textInput}
            placeholder='Nome de Utilizador'
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Palavra Passe'
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          { this.props.erro && this.props.erro !== 0 ? (
            <Text style={{color: 'red', paddingBottom: 20}}>{this.props.descricao}</Text>
          ) : null }
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={.5}
            onPress={() => { this.props.doLogin(this.state.username, this.state.password) }}
          >
            <Text style={{fontSize: 25, color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 20,
  },

  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0077be',
    marginBottom: 20,
    paddingLeft: 10,
  },

  loginButton: {
    padding: 10,
    backgroundColor: '#0077be',
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return { erro: state.login.erro, descricao: state.login.descricao };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogin: (username, password) => { dispatch(login(username, password)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
