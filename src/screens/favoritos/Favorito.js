import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyle from '../globalStyle';
import { produtos } from '../../actions/cargaDescargaProdutos';
import { createFavorito, updateFavorito, deleteFavorito } from '../../actions/favoritos';

class Favorito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circuito: this.props.favoritoAtualData.loc_id_carga,
      fluxo: this.props.favoritoAtualData.pro_id,
      localDescarga: this.props.favoritoAtualData.loc_id_descarga,
    };
  }

  componentWillMount() {
    if (this.props.favoritoAtual !== null) {
      this.props.getProdutos(this.props.favoritoAtualData.loc_id_carga);
    }
  }

  createUpdateFavorito(create = true) {
    const data = {
      vtr_nr: this.props.viaturaNr,
      cli_id: this.props.clienteId,
      loc_id_carga: this.state.circuito,
      pro_id: this.state.fluxo,
      loc_id_descarga: this.state.localDescarga,
      chave: 'mobile123',
    };
    if (create) {
      this.props.createNewFavorito(data);
    } else {
      data['favorito_nr'] = this.props.favoritoAtualData.favorito_id;
      this.props.updateCurrentFavorito(data);
    }
    this.props.goToFavoritos();
  }

  deleteFavorito() {
    const data = {
      favorito_nr: this.props.favoritoAtualData.favorito_id,
      chave: 'mobile123',
    };
    this.props.deleteCurrentFavorito(data, this.props.viaturaNr);
    this.props.goToFavoritos();
  }

  render() {
    const produtos = this.props.favoritoAtual || this.state.circuito ? this.props.produtos : [];
    return (
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text>Circuito</Text>
          <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}>
            <Picker
              selectedValue={this.state.circuito}
              onValueChange={(circuito) => { this.setState({circuito}); this.props.getProdutos(circuito) }}
            >
              <Picker.Item label="- Selecionar Circuito -" value={null} />
              { this.props.locaisCarga.map(({ loc_local, loc_id }) => (
                <Picker.Item key={loc_id} label={loc_local} value={loc_id} />
              )) }
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text>Fluxo</Text>
          <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}>
            <Picker
              selectedValue={this.state.fluxo}
              onValueChange={fluxo => this.setState({fluxo})}
            >
              <Picker.Item label="- Selecionar Fluxo -" value={null} />
              { produtos.map(({ pro_nome, pro_id }) => (
                <Picker.Item key={pro_id} label={pro_nome} value={pro_id} />
              )) }
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text>Local Descarga</Text>
          <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}>
            <Picker
              selectedValue={this.state.localDescarga}
              onValueChange={localDescarga => this.setState({localDescarga})}
            >
              <Picker.Item label="- Selecionar Local Descarga -" value={null} />
              { this.props.locaisCarga.map(({ loc_local, loc_id }) => (
                <Picker.Item key={loc_id} label={loc_local} value={loc_id} />
              )) }
            </Picker>
          </View>
        </View>

        { this.props.favoritoAtual !== null ? (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              icon={
                <Icon name='trash-o' color='#fff' size={25} />
              }
              buttonStyle={{backgroundColor: 'red', width: 120}}
              title="  Eliminar"
              onPress={() => this.deleteFavorito()}
            />
            <Button
              icon={
                <Icon name='save' color='#fff' size={25} />
              }
              buttonStyle={{backgroundColor: globalStyle.primaryColour, width: 120}}
              title="  Guardar"
              onPress={() => this.createUpdateFavorito(false)}
            />
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              icon={
                <Icon name='star' color='#fff' size={25} />
              }
              buttonStyle={{backgroundColor: globalStyle.primaryColour, width: 170}}
              title="  Criar Favorito"
              onPress={() => this.createUpdateFavorito()}
            />
          </View>
        ) }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, { favoritoAtual }) => {
  const { favoritos } = state.favoritos;
  const favoritoAtualData = favoritoAtual !== null ? { ...favoritos[favoritoAtual]} : {}
  const { locaisCarga, produtos, locaisDescarga } = state.cargaDescargaProdutos;
  const { viaturaNr, clienteId } = state.profile;
  return {
    favoritoAtual,
    favoritoAtualData,
    locaisCarga,
    produtos,
    locaisDescarga,
    viaturaNr,
    clienteId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getProdutos: localCarga => { dispatch(produtos(localCarga)) },
    createNewFavorito: (data) => { dispatch(createFavorito(data)) },
    updateCurrentFavorito: (data) => { dispatch(updateFavorito(data)) },
    deleteCurrentFavorito: (data, viaturaNr) => { dispatch(deleteFavorito(data, viaturaNr)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorito);
