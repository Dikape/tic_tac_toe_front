import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { getLastGame } from '../helpers/game_api.js';

export default class Game extends Component{
	constructor (props) {
    super(props);
    
    this.state = {
    	access_token: sessionStorage.getItem('access_token'),
      board_size: '',
      game_type: '',
      error_msg: '',		
      redirect: false
    }
  }
  componentWillMount() {
  	let game_info = getLastGame(this.state.access_token)
  	game_info.then(
  		(response) => {
  			this.setState({
	    		board_size: response.data.size, 
	      // game_type: response.data.game_type,
	  		})
  		},
 	  	(error) => {
  		 	console.log('Dude this is error:')
				console.log(error.response)
  		})
  }

  render() {
  	const { board_size } = this.state;
  	alert(board_size)
  	return (
  	  <div className='form-group'>
  	  	{board_size}
      </div>
  	)
  }
}