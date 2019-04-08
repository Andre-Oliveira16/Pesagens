import { GET_PESAGENS, GET_PESAGEM_EM_CURSO, CREATE_PESAGEM, UPDATE_PESAGEM } from './types';

export const getPesagens = viaturanr => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_ultimaspesagens/${viaturanr}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_PESAGENS, data: json.items });
    })
  };
};

export const pesagensEmCurso = viaturanr => {
  return dispatch => {
    return fetch(`https://portal.lipor.pt/pls/apex/psg/app_mobile/lista_pesagenscurso/${viaturanr}`)
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_PESAGEM_EM_CURSO, data: json.items });
    })
  };
};

export const createPesagem = data => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/psg_ins/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => {
      dispatch(getPesagens(data.vtr_nr));
      dispatch(pesagensEmCurso(data.vtr_nr));
    })
  };
};

export const updatePesagem = (data, viaturaNr) => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/psg_upd/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
    .then(() => {
      dispatch(getPesagens(viaturaNr));
      dispatch(pesagensEmCurso(viaturaNr));
    })
  };
};
