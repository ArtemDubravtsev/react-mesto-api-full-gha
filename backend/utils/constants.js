/* eslint-disable */

const urlValidation =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const MONGO_DEV_URL = "mongodb://127.0.0.1:27017/mestodb";

const DEV_PORT = 3000;

module.exports = {
  urlValidation,
  DEV_PORT,
  MONGO_DEV_URL,
};
