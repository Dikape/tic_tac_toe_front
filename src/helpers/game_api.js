import axios from 'axios';
import { BASE_URL } from '../config.js';


export function createGame(game_type, board_size, access_token) {
	let url = `${BASE_URL}/api/v0/online`;
	if (game_type==='hot_seat'){
		url = `${BASE_URL}/api/v0/hot_seat`;
	}
  
  const data = { 
		game_type: game_type,
		board_size: board_size,	
	};
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.post(url, data, headers);
}


export function getLastHotSeatGame(access_token) {
  const url = `${BASE_URL}/api/v0/hot_seat`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}

export function getHotSeatSteps(access_token, game_id) {
  const url = `${BASE_URL}/api/v0/hot_seat/steps/${game_id}`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}

export function getStartedOnlineGames(access_token) {	
	const url = `${BASE_URL}/api/v0/online`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}

export function getFinishedGamesForUser(access_token) {	
	const url = `${BASE_URL}/api/v0/finished_games`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}

export function getFinishedGameHistory(access_token, game_id) {	
	const url = `${BASE_URL}/api/v0/game_history/${game_id}`;
 	const headers =  {
    headers: { Authorization: "JWT " + access_token }
  };
  return axios.get(url, headers);
}
