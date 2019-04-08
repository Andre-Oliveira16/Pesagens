import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
  erro: null,
  descricao: '',
  username: '',
};

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        erro: action.data.Erro,
        descricao: action.data.Descricao,
        username: action.username,
      };
    case LOGOUT:
      return {
        ...state,
        erro: null,
        descricao: '',
        username: '',
        //...initialState,
      };
    default:
      return state;
  }
};

export default loginReducer;
