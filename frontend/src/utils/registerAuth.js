const baseUrl = "https://api.artem.mesto.nomoredomainsmonster.ru";

function getResponceData(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`${res.status} ${res.statusText}`);
}

export function registration(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => getResponceData(res));
}

export function authorization(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => getResponceData(res));
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponceData(res));
}
