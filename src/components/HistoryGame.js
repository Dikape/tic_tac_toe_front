import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { getFinishedGameHistory } from '../helpers/game_api.js';
import Board from './Board';

function NextPreviousButtons(props){
		let previous = (<button className="btn btn-primary" onClick={() => props.onClick('previous')}>Previous</button>);
		let next = (<button className="btn btn-primary" onClick={() => props.onClick('next')}>Next</button>);
  	if (props.currentStep===0){
  		previous = (<button className="btn" onClick={()=>{}}>Previous</button>);
  	}
  	if (props.currentStep===props.stepsCount)
  	{
  		next = (<button className="btn" onClick={()=>{}}>Next</button>);
  	}
	return(
		<div className='col-md-12'>
			{previous}|{next}
		</div>
	)
}

export default class GameHistory extends Component{
	constructor(props){
		super(props)
		this.state = {
			access_token: localStorage.getItem('access_token'),
			userName: localStorage.getItem('user_name'),
      gameId: sessionStorage.getItem('game_history_id'),
      gameType: '',
      winner: '',
      author: '',
      boardSize: null,
      boardColls: null,		
      steps: null,
      currentStep: 0,
      stepsCount: null,
      userStep: null, 
      symbolStep: null
		}
	}
	componentWillMount() {
		const {access_token, gameId} = this.state;
		const game = getFinishedGameHistory(access_token, gameId)
		game.then(
			(response) => {
				const data = response.data;
  			const size = data.size;
  			const boardColls = Array(size);
				for (let i = 0; i < size; i++) {
			  	boardColls[i] = Array(size).fill(null);
				}
  			this.setState({
	    		boardSize: size, 
	    		boardColls: boardColls,
	    		gameType: data.game_type,
		      winner: data.winner,
		      author: data.author,
		      steps: data.steps,
		      stepsCount: data.steps.length
	  		})
			},
			(error) => {
				console.log('Dude this is error:')
				console.log(error.response)
			}
		)
	}
	handleButtonClick(direction){
		const steps = this.state.steps;
		let {boardColls, currentStep, userStep, symbolStep} = this.state;
		boardColls.map((row)=>{
			row.fill(null)
		})
		if(direction==='previous'){
			currentStep -= 1;
		}
		else if(direction==='next'){
			currentStep += 1;
		}
		if (currentStep===0){
			userStep = '';
			symbolStep = '';
			boardColls.map((row)=>{
				row.fill(null)
			})
		}else{
			userStep = steps[currentStep-1].user;
			symbolStep = steps[currentStep-1].value;
			for (var i = 0; i <= currentStep-1; i++){
				let step = steps[i];
				boardColls[step.x_coordinate][step.y_coordinate] = step.value;
			}
		}

		this.setState({
			boardColls: boardColls,
			currentStep: currentStep,
			userStep: userStep,
			symbolStep: symbolStep,
		})
	}
  render() {
  	const { gameType, winner, boardColls, boardSize, currentStep, stepsCount, userStep, symbolStep} = this.state;
  	let winnerText;
  	if(gameType==='online'){
  		winnerText = (<h2>Winner: {winner}</h2>);
  	}
  	return (
  		<div>
  			<div className='col-md-4'>
		  		<h1>{gameType} game</h1>
		  		{winnerText}
		  		<h2>Step {currentStep}: {userStep} - {symbolStep}</h2>
		  		<NextPreviousButtons currentStep={currentStep} stepsCount={stepsCount}
		  		 onClick={(direction) => this.handleButtonClick(direction)}/>
  			</div>
  			<div className='col-md-8'>
		  	  <div className='row board'>
		  	  	<Board boardColls={boardColls} boardSize={boardSize} onClick={()=>{}}/>
		      </div>
	      </div>
  		</div>
  	)
  }
}