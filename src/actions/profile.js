import { GET_PROFILE, GET_VIATURAS, GET_CLIENTES, UPDATE_PROFILE } from './types';

import { getPesagens, pesagensEmCurso } from './pesagens';

export const getProfile = username => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_viatcliente/${username}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_PROFILE, data: json });
    })
  };
};

export const getViaturas = username => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_viatura/${username}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_VIATURAS, data: json.items });
    })
  };
};

export const getClientes = username => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_cliente/${username}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_CLIENTES, data: json.items });
    })
  };
};

export const updateProfile = data => {
  return dispatch => {
    dispatch({ type: UPDATE_PROFILE, viaturaNr: data.viaturanr })
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/viatcliente_upd/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => {
      dispatch(getProfile(data.utilizador)),
      dispatch(getPesagens(data.viaturanr));
      dispatch(pesagensEmCurso(data.viaturanr));
    })
  };
};
