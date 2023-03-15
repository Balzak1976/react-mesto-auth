export const register = (email, password) => {
  return request('signup', { email, password });
};

export const authorize = (email, password) => {
  return request('signin', { email, password });
};

export const checkToken = (token) => {
  return request('users/me', { token });
};

// ============================ FUNCTION =======================================

function request(url, { token, ...options }) {
  return fetch(`https://auth.nomoreparties.co/${url}`, {
    method: token ? 'GET' : 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
    },
    body: !token ? JSON.stringify(options) : null,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
