import { GET_PROFILE, GET_VIATURAS, GET_CLIENTES, UPDATE_PROFILE } from '../actions/types';

const initialState = {
  //viatura: '',
  //nr: null,
};

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PROFILE:
      return {
        ...state,
        utilizador: action.data.utilizador,
        viatura: action.data.viatura,
        viaturaNr: action.data.vtr_nr,
        cliente: action.data.cliente,
        clienteId: action.data.cli_id,
      };
    case GET_VIATURAS:
      return {
        ...state,
        viaturas: action.data,
      };
    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.data,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        viaturaNr: action.viaturaNr,
      };
    default:
      return state;
  }
};

export default profileReducer;
