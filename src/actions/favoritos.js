import { GET_FAVORITOS, CREATE_FAVORITO } from './types';

export const favoritos = (viaturanr, chave) => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/favorito_lista/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ viaturanr, chave }),
    })
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_FAVORITOS, data: json.items });
    })
  };
};

export const createFavorito = data => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/favorito_ins/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => dispatch(favoritos(data.vtr_nr, data.chave)))
  };
}

export const updateFavorito = data => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/favorito_upd/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => dispatch(favoritos(data.vtr_nr, data.chave)))
  };
}

export const deleteFavorito = (data, viaturaNr) => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/favorito_del/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => dispatch(favoritos(viaturaNr, data.chave)))
  };
}
