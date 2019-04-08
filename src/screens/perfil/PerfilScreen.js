import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { updateProfile } from '../../actions/profile';

import globalStyle from '../globalStyle';

class PerfilScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { viatura: this.props.viaturaNr, cliente: this.props.clienteId };
  }

  updateProfile() {
    const data = {
      chave: 'mobile123',
      viaturanr: this.state.viatura,
      cli_id: this.state.cliente,
      utilizador: this.props.utilizador,
    };
    this.props.updateUserProfile(data);
    this.props.goToPesagens();
  }

  render() {
    return (
      <View style={{ padding: 20, flex: 1 }}>
        <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginBottom: 20 }}>
          <Picker
            selectedValue={this.state.viatura}
            onValueChange={viatura => this.setState({ viatura })}
          >
            { this.props.viaturas.map(({ viatura, nr }) => (
              <Picker.Item key={nr} label={viatura} value={nr} />
            )) }
          </Picker>
        </View>

        <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginBottom: 20 }}>
          <Picker
            selectedValue={this.state.cliente}
            onValueChange={cliente => this.setState({ cliente })}
          >
            { this.props.clientes.map(({ nome, cli_id }) => (
              <Picker.Item key={cli_id} label={nome} value={cli_id} />
            )) }
          </Picker>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button
            icon={
              <Icon name='arrow-right-circle-outline' color='#fff' size={25} />
            }
            buttonStyle={{backgroundColor: globalStyle.primaryColour, width: 140}}
            title="Continuar  "
            iconRight
            onPress={() => this.updateProfile()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { viaturaNr, clienteId, viaturas, clientes, utilizador } = state.profile;
  return { viaturas, clientes, viaturaNr, clienteId, utilizador };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: data => { dispatch(updateProfile(data)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen);
