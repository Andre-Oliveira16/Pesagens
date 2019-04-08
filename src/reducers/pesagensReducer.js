import { GET_PESAGENS, GET_PESAGEM_EM_CURSO } from '../actions/types';

const initialState = {
  pesagens: [],
  pesagensEmCurso: null,
};

const pesagensReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PESAGENS:
      return {
        ...state,
        pesagens: action.data,
      };
    case GET_PESAGEM_EM_CURSO:
      return {
        ...state,
        pesagensEmCurso: action.data.length > 0 ? action.data : null,
      };
    default:
      return state;
  }
};

export default pesagensReducer;
