import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { Button } from 'react-native-elements';

import { favoritos } from '../../actions/favoritos';

import globalStyle from '../globalStyle';

class FavoritosScreen extends Component {
  componentWillMount() {
    this.props.getFavoritos(this.props.viaturaNr, 'mobile123');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 15, padding: 20}}>Favoritos</Text>
        <Button
          buttonStyle={{backgroundColor: globalStyle.primaryColour, marginLeft: 20, marginBottom: 20, width: 180}}
          title="NOVO FAVORITO"
          onPress={() => this.props.goToFavorito(null) }
        />
        <FlatList
          data={this.props.favoritos}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}
              activeOpacity={.5}
              onPress={() => this.props.goToFavorito(index)}
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
    );
  }
}

const mapStateToProps = state => {
  const { favoritos } = state.favoritos;
  const { viaturaNr } = state.profile;
  return { favoritos, viaturaNr };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavoritos: (viaturanr, chave) => { dispatch(favoritos(viaturanr, chave)) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritosScreen);
