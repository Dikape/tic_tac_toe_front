import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { createGame } from '../helpers/game_api.js';

export default class CreateGame extends Component{
	constructor (props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('user_name'),
      access_token: sessionStorage.getItem('access_token'),
      board_size: '',
      game_type: 'hot_seat',
      error_msg: '',		
      redirect: false
    }
  }
  handleInputChange(event){
    this.setState({
      board_size: event.target.value
    });
  }
  handleSelectChange(event){
    this.setState({
      game_type: event.target.value
    });
  }
  handleSubmit(event){
  	const {access_token, board_size, game_type} = this.state
  	if (board_size>=15 && board_size<=100){
  		this.setState({
  			error_msg: ''
  		});
  		createGame(game_type, board_size, access_token).then(
  			(response) =>{
		  		this.setState({
		  			redirect: true
		  		});
  			},
  			(error) => {
  				console.log('Dude this is error:')
  				console.log(error.response)
  			})
  	}
  	else{
  		this.setState({
  			error_msg: 'Size must be more than 14 and less than 101!'
  		});
  	}

  }
  render() {
  	const {error_msg, redirect} = this.state;
  	if (redirect) {
  		return <Redirect to='/game'/>;
  	};
  	return (
  	  <div className='form-group'>
	      <form >
	    		<h1>Create New Game</h1>
	      	<p className='error-msg'>{error_msg}</p>
	      	
		      <div className="row">
		        <label>
		          Choose size of board(x*x):
		          <input type="number" 
		          min="15"
		          max="30"
		          className="form-control" 
		          value={this.state.board_size} 
		          onChange={(event) => this.handleInputChange(event)} />
		        </label>
	        </div>
	        <div className="row">
		        <label>
		          Choose type of game:
		          <select value={this.state.game_type} className="form-control"  onChange={(event) => this.handleSelectChange(event)}>
		            <option value="hot_seat">Hot seat</option>
		            <option value="online">Online</option>
		          </select>
		        </label>
		      </div>
		      <div className="row">
	        	<input type="button" className="btn btn-success" value="Submit" onClick={() => this.handleSubmit()}/>
	        </div>
	      </form>
      </div>
  	)
  }
}