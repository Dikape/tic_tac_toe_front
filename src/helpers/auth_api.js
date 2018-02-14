import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


export function register(username, password) {
  const url = `${BASE_URL}/api/v0/registration`;
  const data = { 
  	username: username,
  	password: password,
   }
  return axios.post(url, data);
}

export function login(username, password) {
  const url = `${BASE_URL}/api/v0/login`;
  const data = { 
  	username: username,
  	password: password,
   }
  return axios.post(url, data);
}

export function getUser(access_token) {
  const url = `${BASE_URL}/api/v0/user`;
  return axios.get(url, {
    headers: { Authorization: "JWT " + access_token }
   });
}	