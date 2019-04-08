import { LOGIN, LOGOUT } from './types';

export const login = (username, password) => {
  return dispatch => {
    return fetch('https://portal.lipor.pt/pls/apex/psg/app_mobile/login_mobile/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: username,
        password: password,
      }),
    })
    .then(res => res.json())
    .then(json => {
      dispatch({ type: LOGIN, data: json.items[0], username });
    })
  };
}

export const logout = () => {
  return { type: LOGOUT };
};
