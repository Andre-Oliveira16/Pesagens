import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { Button } from 'react-native-elements';

import globalStyle from '../globalStyle';
import { getPesagens, pesagensEmCurso } from '../../actions/pesagens';

class PesagensScreen extends Component {
  componentWillMount() {
    this.props.getUserPesagens(this.props.viaturaNr);
    this.props.getPesagensEmCurso(this.props.viaturaNr);
  }

  listOfPesagens() {
    return (
      <Fragment>
        <Text style={{fontWeight: 'bold', fontSize: 15, padding: 20}}>Listagem Pesagens (últimas 10)</Text>
        <Button
          buttonStyle={{backgroundColor: globalStyle.primaryColour, marginLeft: 20, marginBottom: 20, width: 180}}
          title="NOVA PESAGEM"
          onPress={() => this.props.goToPesagem(null) }
        />
        <FlatList
          data={this.props.pesagens}
          renderItem={({item}) => (
            <View style={{padding: 20, paddingTop: 0}}>
              <Text style={{ fontWeight: 'bold' }}>{ item.pes_id }</Text>
              <Text>{ item.data_2_peso }</Text>
              <Text>{ item.produto }</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text>{ item.local_carga }</Text>
                <Icon name='arrow-right' size={15} style={{ marginLeft: 5, marginRight: 5, paddingTop: 2 }} />
                <Text>{ item.local_descarga }</Text>
              </View>
              <Text>Peso: { item.peso_liquido } kg</Text>
            </View>
          )}
        />
      </Fragment>
    );
  }

  pesagensEmCurso() {
    return (
      <Fragment>
        <Text style={{fontWeight: 'bold', fontSize: 15, padding: 20}}>Pesagens em curso</Text>
        <FlatList
          data={this.props.pesagensEmCurso}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}
              activeOpacity={.5}
              onPress={() => this.props.goToPesagem(index) }
            >
              <Text style={{ fontWeight: 'bold' }}>{ item.pes_id }</Text>
              <Text style={{ fontWeight: 'bold' }}>{ item.cliente }</Text>
              <Text>{ item.data_1_peso }</Text>
              <Text>{ item.produto }</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text>{ item.local_carga }</Text>
                <Icon name='arrow-right' size={15} style={{ marginLeft: 5, marginRight: 5, paddingTop: 2 }} />
                <Text>{ item.local_descarga }</Text>
              </View>
              <Text>Peso: { item['1_peso'] } kg</Text>
            </TouchableOpacity>
          )}
        />
      </Fragment>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.props.pesagensEmCurso === null ? (
          <Fragment>{ this.listOfPesagens() }</Fragment>
        ) : (
          <Fragment>{ this.pesagensEmCurso() }</Fragment>
        ) }
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { pesagens, pesagensEmCurso } = state.pesagens;
  const { viaturaNr } = state.profile;
  return { pesagens, pesagensEmCurso, viaturaNr };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserPesagens: (viaturaNr, chave) => { dispatch(getPesagens(viaturaNr, chave)) },
    getPesagensEmCurso: viaturaNr => { dispatch(pesagensEmCurso(viaturaNr)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PesagensScreen);
