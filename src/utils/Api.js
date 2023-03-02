const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '4f5c1ea4-b5a2-4f77-88d2-569b5dbe0c66',
    'Content-Type': 'application/json',
  },
};

class Api {
  constructor(params) {
    this._baseUrl = params.baseUrl;
    this._headers = params.headers;
    this._params = params;
  }

  createQueueFetch() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return this._createFetch(url, 'GET');
  }

  setUserAvatar(dataAvatar) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return this._createFetch(url, 'PATCH', dataAvatar);
  }

  setUserInfo(dataUser) {
    const url = `${this._baseUrl}/users/me`;

    return this._createFetch(url, 'PATCH', dataUser);
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return this._createFetch(url, 'GET');
  }

  addPlace(dataCards) {
    const url = `${this._baseUrl}/cards`;

    return this._createFetch(url, 'POST', dataCards);
  }

  deleteCard(dataCardId) {
    const url = `${this._baseUrl}/cards/${dataCardId}`;

    return this._createFetch(url, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const typeMethod = isLiked ? 'DELETE' : 'PUT';

    return this._createFetch(url, typeMethod);
  }

  _createFetch(url, typeMethod, dataBody) {
    return fetch(url, {
      method: typeMethod,
      headers: this._headers,
      body: dataBody ? JSON.stringify(dataBody) : dataBody,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export const api = new Api(apiSettings);
