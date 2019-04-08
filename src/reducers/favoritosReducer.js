import { GET_FAVORITOS } from '../actions/types';

const initialState = {
  favoritos: [],
};

const favoritosReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_FAVORITOS:
      return {
        ...state,
        favoritos: action.data,
      };
    default:
      return state;
  }
};

export default favoritosReducer;
