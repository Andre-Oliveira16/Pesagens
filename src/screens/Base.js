import React, { Component, Fragment } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import globalStyle from './globalStyle';
import PesagensScreen from './pesagens/PesagensScreen';
import Pesagem from './pesagens/Pesagem';
import PerfilScreen from './perfil/PerfilScreen';
import FavoritosScreen from './favoritos/FavoritosScreen';
import Favorito from './favoritos/Favorito';

import { getProfile, getViaturas, getClientes } from '../actions/profile';
import { logout } from '../actions/login';
import { locaisCarga, locaisDescarga } from '../actions/cargaDescargaProdutos';


class NavigationButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.navigationElem}
        activeOpacity={.5}
        onPress={this.props.onPress}
      >
        <Icon name={this.props.icon} color='#fff' size={25} style={{textAlign: 'center'}} />
        <Text style={{ color: '#fff', paddingTop: 5 }}>{ this.props.text }</Text>
      </TouchableOpacity>
    );
  }
}


class Base extends Component {
  constructor(props) {
    super(props);
    this.pages = {
        PESAGEM_EM_CURSO: 'PESAGEM_EM_CURSO',
        PESAGENS: 'PESAGENS',
        PESAGEM: 'PESAGEM',
        PERFIL: 'PERFIL',
        FAVORITOS: 'FAVORITOS',
        FAVORITO: 'FAVORITO',
      };
    this.state = { currentPage: this.pages.PESAGENS, favorito: null, pesagem: null };
  }

  componentWillMount() {
    this.props.getUserProfile(this.props.username);
    this.props.getUserViaturas(this.props.username);
    this.props.getUserClientes(this.props.username);
    this.props.getLocaisCarga();
    this.props.getLocaisDescarga();
  }

  logoutButton() {
    return (
      <Button
        icon={
          <Icon name='power' color='#fff' size={25} style={{paddingBottom: 24}} />
        }
        buttonStyle={{backgroundColor: 'transparent'}}
        onPress={() => this.props.doLogout()}
      />
    );
  }

  changePage(currentPage) {
    this.setState({ currentPage });
  }

  goToFavorito(favorito) {
    this.setState({ currentPage: this.pages.FAVORITO, favorito });
  }

  goToPesagem(pesagem) {
    this.setState({ currentPage: this.pages.PESAGEM, pesagem });
  }

  showPage() {
    switch (this.state.currentPage) {
      case this.pages.PESAGENS:
        return <PesagensScreen goToPesagem={(pesagem) => this.goToPesagem(pesagem)} />;
      case this.pages.PESAGEM:
        return <Pesagem pesagemEmCurso={this.state.pesagem} goToPesagens={() => this.changePage(this.pages.PESAGENS)} />;
      case this.pages.PERFIL:
        return <PerfilScreen goToPesagens={() => this.changePage(this.pages.PESAGENS)} />;
      case this.pages.FAVORITOS:
        return <FavoritosScreen goToFavorito={(favorito) => this.goToFavorito(favorito)} />;
      case this.pages.FAVORITO:
        return <Favorito favoritoAtual={this.state.favorito} goToFavoritos={() => this.changePage(this.pages.FAVORITOS)} />;
      default:
        return null;
    }
  }

  centreHeader() {
    switch (this.state.currentPage) {
      case this.pages.PESAGENS:
        return (
          <Fragment>
            <Text style={styles.headerTitleDoubleLine}>{this.props.viatura}</Text>
            <Text numberOfLines={1} style={styles.headerTitle}>{this.props.cliente}</Text>
          </Fragment>
        );
      case this.pages.PESAGEM:
        if (this.state.pesagem === null) {
          return <Text style={styles.headerTitle}>NOVA PESAGEM</Text>;
        }
        return <Text style={styles.headerTitle}>2ª PESAGEM</Text>;
      case this.pages.PERFIL:
        return <Text style={styles.headerTitle}>PERFIL</Text>;
      case this.pages.FAVORITOS:
        return <Text style={styles.headerTitle}>FAVORITOS</Text>;
      case this.pages.FAVORITO:
        if (this.state.favorito) {
          return <Text style={styles.headerTitle}>EDITAR FAVORITO</Text>;
        }
        return <Text style={styles.headerTitle}>NOVO FAVORITO</Text>;
      default:
        return null;
    }
  }

  render() {
    return (
      <Fragment>
        { this.props.viatura ? (
          <View style={{flex: 1}}>
            <StatusBar backgroundColor={globalStyle.secondaryColour} />
            <Header
              centerComponent={this.centreHeader()}
              rightComponent={this.logoutButton()}
              containerStyle={styles.header}
            />
            { this.showPage() }
            <View style={{backgroundColor: globalStyle.primaryColour, justifyContent: 'flex-end', height: 65, flexDirection: 'row'}}>
              <NavigationButton icon="user" text="PERFIL" onPress={() => this.changePage(this.pages.PERFIL)} />
              <NavigationButton icon="truck" text="PESAGENS" onPress={() => this.changePage(this.pages.PESAGENS)} />
              <NavigationButton icon="star" text="FAVORITOS" onPress={() => this.changePage(this.pages.FAVORITOS)} />
            </View>
          </View>
        ) : null }
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 70 - 15 : 70,
    backgroundColor: globalStyle.primaryColour,
  },

  headerTitle: {
    color: '#fff',
    paddingBottom: 24,
    fontWeight: 'bold',
  },

  headerTitleDoubleLine: {
    color: '#fff',
    fontWeight: 'bold',
  },

  navigationElem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  const { viatura, cliente } = state.profile;
  const { username } = state.login;
  return { viatura, cliente, username };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: username => { dispatch(getProfile(username)) },
    getUserViaturas: username => { dispatch(getViaturas(username)) },
    getUserClientes: username => { dispatch(getClientes(username)) },
    doLogout: () => { dispatch(logout()) },
    //getFavoritoAtual: favoritoIndex => { dispatch(favoritoAtual(favoritoIndex)) },
    getLocaisCarga: () => { dispatch(locaisCarga()) },
    getLocaisDescarga: () => { dispatch(locaisDescarga()) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
