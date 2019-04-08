import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Picker, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import globalStyle from '../globalStyle';
import { produtos } from '../../actions/cargaDescargaProdutos';
import { createPesagem, updatePesagem } from '../../actions/pesagens';
import { favoritos } from '../../actions/favoritos';

class Pesagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circuito: null,
      fluxo: null,
      localDescarga: null,
      peso: '',
      peso2: '',
      selectFavorito: false,
    };
  }

  componentWillMount() {
    this.props.getFavoritos(this.props.viaturaNr, 'mobile123');
  }

  getDateFormat() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  createPesagem() {
    const data = {
      vtr_nr: this.props.viaturaNr,
      pro_id: this.state.fluxo,
      cli_id: this.props.clienteId,
      loc_id_carga: this.state.circuito,
      loc_id_descarga: this.state.localDescarga,
      pes_peso_1: parseInt(this.state.peso, 10),
      pes_data_1: this.getDateFormat(),
      bas_id_1: 3,
    };
    this.props.createPrimeiraPesagem(data);
    this.props.goToPesagens();
  }

  updatePesagem() {
    const data = {
      pes_id: this.props.pesagemEmCursoData.pes_id,
      pes_peso_2: parseInt(this.state.peso2, 10),
      pes_data_2: this.getDateFormat(),
      bas_id_2: 3,
      chave: 'mobile123',
    };
    this.props.updateSegundaPesagem(data, this.props.viaturaNr);
    this.props.goToPesagens();
  }

  listOfFavoritos() {
    return (
      <View style={styles.favoritosList}>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomColor: '#F0F0F0', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Selecionar Favorito</Text>
            <Button
              title="x"
              buttonStyle={{ backgroundColor: '#F0F0F0', borderRadius: 15, width: 30, height: 30 }}
              titleStyle={{ color: 'rgba(0, 0, 0, .8)', fontSize: 18, paddingBottom: 6 }}
              onPress={() => this.setState({ selectFavorito: false })}
            />
          </View>
          <FlatList
            style={{ padding: 20, marginBottom: 60 }}
            data={this.props.favoritos}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{paddingBottom: 40}}
                activeOpacity={.5}
                onPress={() => {
                  this.props.getProdutos(item.loc_id_carga);
                  this.setState({
                    circuito: item.loc_id_carga,
                    fluxo: parseInt(item.pro_id, 10),
                    localDescarga: item.loc_id_descarga,
                    selectFavorito: false,
                  });
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>{ item.produto }</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={{ opacity: .8 }}>{ item.local_carga }</Text>
                  <Icon name='arrow-right' size={15} style={{ marginLeft: 5, marginRight: 5, paddingTop: 2 }} />
                  <Text style={{ opacity: .8 }}>{ item.local_descarga }</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Fragment>
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.viatura}</Text>
          <Text style={{ marginTop: 20, marginBottom: 10 }}>Cliente</Text>
          <Text style={{ fontWeight: 'bold' }}>{this.props.cliente}</Text>
          { this.props.pesagemEmCurso !== null ? (
            <Fragment>
              <View style={{ marginBottom: 20, marginTop: 40 }}>
                <Text>Peso (kg)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}
                  onChangeText={peso2 => this.setState({ peso2 })}
                  value={this.state.peso2}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 60 }}>
                <Button
                  icon={
                    <Icon name='save' color='#fff' size={25} />
                  }
                  buttonStyle={{backgroundColor: globalStyle.primaryColour, width: 120}}
                  title="  Guardar"
                  onPress={() => this.updatePesagem()}
                />
              </View>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                icon={
                  <Icon name='star' color='#fff' size={25} />
                }
                buttonStyle={{backgroundColor: globalStyle.primaryColour, marginTop: 20, marginBottom: 20}}
                title="  Favoritos"
                onPress={() => this.setState({ selectFavorito: true })}
              />
              <View style={{ marginBottom: 20 }}>
                <Text>Circuito</Text>
                <View style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}>
                  <Picker
                    selectedValue={this.state.circuito}
                    onValueChange={(circuito) => { this.setState({ circuito }); this.props.getProdutos(circuito); }}
                  >
                    <Picker.Item label='- Selecionar Circuito -' value={null} />
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
                    onValueChange={fluxo => this.setState({ fluxo })}
                  >
                    <Picker.Item label='- Selecionar Fluxo -' value={null} />
                    { this.props.produtos.map(({ pro_nome, pro_id }) => (
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
                    onValueChange={localDescarga => this.setState({ localDescarga })}
                  >
                    <Picker.Item label='- Selecionar Local Descarga -' value={null} />
                    { this.props.locaisDescarga.map(({ loc_local, loc_id }) => (
                      <Picker.Item key={loc_id} label={loc_local} value={loc_id} />
                    )) }
                  </Picker>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text>Peso (kg)</Text>
                <TextInput
                  keyboardType="numeric"
                  style={{ borderColor: globalStyle.primaryColour, borderWidth: 1, marginTop: 10 }}
                  onChangeText={peso => this.setState({ peso })}
                  value={this.state.peso}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 60 }}>
                <Button
                  icon={
                    <Icon name='save' color='#fff' size={25} />
                  }
                  buttonStyle={{backgroundColor: globalStyle.primaryColour, width: 120}}
                  title="  Guardar"
                  onPress={() => this.createPesagem()}
                />
              </View>
            </Fragment>
          ) }
        </ScrollView>
        { this.state.selectFavorito ? (
          <Fragment>{ this.listOfFavoritos() }</Fragment>
        ) : null }
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  favoritosList: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state, { pesagemEmCurso }) => {
  const { viatura, viaturaNr, cliente, clienteId } = state.profile;
  const { locaisCarga, produtos, locaisDescarga } = state.cargaDescargaProdutos;
  const { favoritos } = state.favoritos;
  const { pesagensEmCurso } = state.pesagens;
  return {
    viatura,
    viaturaNr,
    cliente,
    clienteId,
    locaisCarga,
    produtos,
    locaisDescarga,
    favoritos,
    pesagemEmCursoData: pesagemEmCurso !== null ? pesagensEmCurso[pesagemEmCurso] : {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProdutos: localCarga => { dispatch(produtos(localCarga)) },
    createPrimeiraPesagem: data => { dispatch(createPesagem(data)) },
    updateSegundaPesagem: (data, viaturaNr) => { dispatch(updatePesagem(data, viaturaNr)) },
    getFavoritos: (viaturanr, chave) => { dispatch(favoritos(viaturanr, chave)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pesagem);
