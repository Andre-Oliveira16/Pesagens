import { createStore, combineReducers, applyMiddleware } from 'redux';
import loginReducer from './reducers/loginReducer';
import profileReducer from './reducers/profileReducer';
import pesagensReducer from './reducers/pesagensReducer';
import favoritosReducer from './reducers/favoritosReducer';
import cargaDescargaProdutosReducer from './reducers/cargaDescargaProdutosReducer';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  pesagens: pesagensReducer,
  favoritos: favoritosReducer,
  cargaDescargaProdutos: cargaDescargaProdutosReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
