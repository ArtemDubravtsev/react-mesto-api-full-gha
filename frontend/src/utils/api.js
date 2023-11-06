class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject;
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }

  setProfilInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._getResponse);
  }

  setProfilAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponse);
  }

  addNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    let method = "DELETE";
    if (isLiked) {
      method = "PUT";
    }
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.artem.mesto.nomoredomainsmonster.ru",
});

export default api;
