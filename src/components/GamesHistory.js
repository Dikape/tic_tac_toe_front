import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { getFinishedGamesForUser } from '../helpers/game_api.js';

export default class GamesHistory extends Component{
	constructor (props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),	
      games: null,
      redirect: false
    }
  }
  handleClick(event){
    let game_id = event.target.id;
    sessionStorage.setItem('game_history_id', game_id);
    this.setState({
      redirect: true
    });
  }
  componentWillMount() {
    const gamesResponse = getFinishedGamesForUser(this.state.access_token);
    gamesResponse.then(
      (response) => {
        const games = [];
        response.data.map((game) =>{
          games.push(
            <li key={game.id}>Game {game.game_type}: 
              <a id={game.id} role="button" onClick={(event) => this.handleClick(event)}>{game.uuid}</a>
               (Author: {game.author}, Winner: {game.winner}, Finished: {game.finished_datetime});
            </li>)
        });
        this.setState({
          games: games
        })
      },
      (error) => {

      }
    )
  } 
  render() {
    const {redirect} = this.state;
    if (redirect){
      return(<Redirect to='/game_history' />)
    }
  	return (
  	  <div className='col-md-12'>
        <h1>Finished games</h1>
        <div className='col-md-10'>
          <ul>
            {this.state.games}
          </ul>
        </div>
      </div>
  	)
  }
}