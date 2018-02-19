import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component{
	constructor (props) {
    super(props);
    this.state = {
      'username': localStorage.getItem('user_name'),	
    }
  }
  render() {
  	let hello_msg;
  	let start_game;
 		const username = this.state.username;
 		if (username){
 			hello_msg = username;
 			start_game = (
		    <div className='row'>
	        <Link to='/create_game'><button className="btn btn-create auth-btn">Start game</button></Link>
	        <Link to='/choose_game'><button className="btn btn-create auth-btn">Connect to game</button></Link>
	        <Link to='/finished_games'><button className="btn btn-create auth-btn">Finished games</button></Link>
	      </div>	
			)
 		}
 		else{
 			hello_msg = 'to continue please login.'
 		}
  	return (
  	  <div>
        <h1>Hello, {hello_msg}</h1>
        {start_game}
      </div>
  	)
  }
}