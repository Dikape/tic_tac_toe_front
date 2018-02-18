import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { getStartedOnlineGames } from '../helpers/game_api.js';

export default class Home extends Component{
	constructor (props) {
    super(props);
    this.state = {
      access_token: localStorage.getItem('access_token'),	
      games: null,
      redirect: false
    }
  }
  handleClick(event){
    let game_uuid = event.target.id;
    sessionStorage.setItem('game_uuid', game_uuid);
    this.setState({
      redirect: true
    });
  }
  componentWillMount() {
    const gamesResponse = getStartedOnlineGames(this.state.access_token);
    gamesResponse.then(
      (response) => {
        const games = [];
        response.data.map((game) =>{
          games.push(
            <li key={game.id}>Game: 
              <a id={game.uuid} role="button" onClick={(event) => this.handleClick(event)}>{game.uuid}</a> (Author: {game.author});
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
      return(<Redirect to='/online' />)
    }
  	return (
  	  <div className='col-md-12'>
        <h1>Started games</h1>
        <div className='col-md-6'>
          <ul>
            {this.state.games}
          </ul>
        </div>
      </div>
  	)
  }
}