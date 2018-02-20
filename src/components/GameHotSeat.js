import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getLastHotSeatGame, getHotSeatSteps } from '../helpers/game_api.js';
import Board from './Board';
import openSocket from 'socket.io-client';
import { BASE_URL } from '../config.js';

export default class Game extends Component{
	constructor (props) {
    super(props);
    
    this.state = {
    	access_token: localStorage.getItem('access_token'),
      boardSize: null,
      gameId: null,
      boardColls: null,
      xIsNext: true,
      stepNumber: 0,
      winner: null,
      error_msg: '',		
      finished: false,
      socket: openSocket(BASE_URL+"hot_seat")
    }
    this.state.socket.on('step_result', (data) => this.handleSocketStep(data));
  }
  loadSteps(gameId){
  	let stepsList = getHotSeatSteps(this.state.access_token, gameId);
  	stepsList.then(
  		(response) => {
  			if(response.data.length){
	  			let boardColls = this.state.boardColls;
	  			let stepNumber = 0;
	  			response.data.map((step) =>{
	  				boardColls[step.x_coordinate][step.y_coordinate] = step.value;
	  				stepNumber = step.step_number;
	  			})
	  			this.setState({
	  				boardColls: boardColls,
						xIsNext: ((stepNumber+1) % 2) === 0 ? true : false,
						stepNumber: stepNumber+1,
	  			})
  			}
  		},
 	  	(error) => {
  		 	console.log('Dude this is error:')
				console.log(error.response)
  		}
  	)
  }
  handleSocketStep(data){
  	if(data.message!=='saved'){
  			this.setState({
  				winner: data.message,
  				finished: true
  			});
  			alert(data.message)
		}
  }
  componentWillMount() {
  	let game_info = getLastHotSeatGame(this.state.access_token)
  	game_info.then(
  		(response) => {
  			const size = response.data.size;
  			const boardColls = Array(size);
				for (let i = 0; i < size; i++) {
			  	boardColls[i] = Array(size).fill(null);
				}
  			this.setState({
	    		boardSize: size, 
	    		boardColls: boardColls,
	    		gameId: response.data.id
	  		})
	  		this.loadSteps(response.data.id)
  		},
 	  	(error) => {
 	  		this.setState({
	    		finished: true, 
	  		})
  		 	console.log('Dude this is error:')
				console.log(error.response)
  		}
  	);
  }	

  handleClick(x, y){
  	const { boardColls, winner } = this.state
  	let current_coll = boardColls[x][y]
  	if (current_coll || winner){
  		return;
  	}

  	let currentSymbol = (this.state.xIsNext ? 'X' : 'O');
  	boardColls[x][y] = currentSymbol;
  	let data_to_send = {
  		x: x, 
  		y:y,
  		stepNumber: this.state.stepNumber,
  		gameId: this.state.gameId,
  		currentSymbol: currentSymbol,
  		userId: localStorage.getItem('user_id'),
  	}
  	this.state.socket.emit('step', data_to_send);
  	this.setState({
  		boardColls: boardColls,
  		xIsNext: !this.state.xIsNext,
  		stepNumber: this.state.stepNumber + 1
  	})
  }

  render() {
  	const { boardSize, boardColls, winner, finished } = this.state;
  	let next_gamer = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  	if (winner || finished){
  		next_gamer = (<Link to='/create_game'><button className="btn btn-create auth-btn">New game</button></Link>)
  	}
  	if (boardSize){
	  	return (
	  		<div>
		  		<h1>{next_gamer}</h1>
		  	  <div className='row board'>
		  	  	<Board boardColls={boardColls} boardSize={boardSize} onClick={(x, y) => this.handleClick(x, y)}/>
		      </div>
	      </div>
	  	)
  	}else{
	  	return (
	  	  <div className=''>
	  	  {next_gamer}
	      </div>
	  	)
  	}

  }
}