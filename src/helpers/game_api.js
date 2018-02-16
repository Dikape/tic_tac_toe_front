import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


export function createGame(game_type, board_size, access_token) {
  const url = `${BASE_URL}/api/v0/game`;
  const data = { 
		game_type: game_type,
		board_size: board_size,
	};
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.post(url, data, headers);
}


export function getLastGame(access_token) {
  const url = `${BASE_URL}/api/v0/game`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}