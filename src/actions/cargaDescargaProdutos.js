import { GET_LOCAL_CARGA, GET_PRODUTO, GET_LOCAL_DESCARGA } from './types';

export const locaisCarga = () => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_localcarga/')
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_LOCAL_CARGA, data: json.items });
    });
  };
};

export const produtos = (localCarga) => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_produtos/${localCarga}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_PRODUTO, data: json.items });
    });
  };
};

export const locaisDescarga = () => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_localdescarga/')
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_LOCAL_DESCARGA, data: json.items });
    });
  };
};
