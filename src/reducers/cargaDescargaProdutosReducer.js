import { GET_LOCAL_CARGA, GET_PRODUTO, GET_LOCAL_DESCARGA, GET_FAVORITOS } from '../actions/types';

const initialState = {
  locaisCarga: [],
  produtos: [],
  locaisDescarga: [],
};

const cargaDescargaProdutosReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LOCAL_CARGA:
      return {
        ...state,
        locaisCarga: action.data,
      };
    case GET_PRODUTO:
      return {
        ...state,
        produtos: action.data,
      };
    case GET_LOCAL_DESCARGA:
      return {
        ...state,
        locaisDescarga: action.data,
      };
    case GET_FAVORITOS:
      return {
        ...state,
        produtos: [],
      };
    default:
      return state;
  }
};

export default cargaDescargaProdutosReducer;
