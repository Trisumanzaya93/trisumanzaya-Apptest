import axios from 'axios';

export const getContact = () => {
  const URL = process.env.HEROKU + '/contact';
  console.log('hehe', URL);
  return axios.get(URL);
};

export const createContact = body => {
  const URL = process.env.HEROKU + '/contact';
  console.log('hehe', URL);
  return axios.post(URL, body);
};

export const deleteContact = id => {
  const URL = process.env.HEROKU + '/contact/' + id;
  console.log('hehe', URL);
  return axios.delete(URL);
};

export const updateContact = (id, body) => {
  const URL = process.env.HEROKU + '/contact/' + id;
  console.log('hehe', URL);
  return axios.put(URL, body);
};
