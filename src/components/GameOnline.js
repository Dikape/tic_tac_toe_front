import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Board from './Board';
import openSocket from 'socket.io-client';
import { SOCKET_URL } from '../config.js';

export default class OnlineGame extends Component{
  constructor (props) {
    super(props);
    
    this.state = {
      gameUUID: sessionStorage.getItem('game_uuid'),
      userId: localStorage.getItem('user_id'),
      userName: localStorage.getItem('user_name'),
      yourSymbol: null,
      boardSize: null,
      gameId: null,
      boardColls: null,
      xIsNext: true,
      stepNumber: 0,
      author: null,
      winner: null,
      error_msg: '',    
      finished: false,
      socket: openSocket(SOCKET_URL+'online')
    }
    // sessionStorage.clear();
    this.state.socket.on('game_info', (data) => this.handleSocketGameInfo(data));
    this.state.socket.on('cant_connect', (data) => this.handleSocketCantConnect(data));
    this.state.socket.on('game_result', (data) => this.handleSocketGameResult(data));
    this.state.socket.on('step_result', (data) => this.handleSocketStep(data));
  }

  handleSocketGameInfo(data){
    const size = data.board_size;
    const boardColls = Array(size);
    for (let i = 0; i < size; i++) {
      boardColls[i] = Array(size).fill(null);
    }
    this.setState({
      boardSize: size, 
      boardColls: boardColls,
      gameId: data.game_id,
      author: data.author,
      yourSymbol: (this.state.userName===data.author ? 'X' : 'O'),
    })
    if(data.finished){
      this.setState({
        finished: true, 
        winner: data.finished
      })
    }
    if(data.steps.length){
      let stepNumber = 0;
      data.steps.map((step) =>{
        boardColls[step.x_coordinate][step.y_coordinate] = step.value;
        stepNumber = step.step_number;
      })
      this.setState({
        boardColls: boardColls,
        xIsNext: ((stepNumber+1) % 2) === 0 ? true : false,
        stepNumber: stepNumber+1,
      })
    }

  }
  handleSocketCantConnect(data){
    this.setState({
      error_msg: data.message,
    })
  }
  handleSocketGameResult(data){
    if(data.message!=='saved'){
        this.setState({
          winner: data.message,
          finished: true
        });
        alert(data.message)
    }
  }
  handleSocketStep(data){
    this.setState({
      boardColls: data.boardColls,
      xIsNext: data.xIsNext,
      stepNumber: data.stepNumber
    });
  }
  componentWillMount() {
    this.state.socket.emit('connect_to_game', {
      gameUUID: this.state.gameUUID,
      userId: this.state.userId
    });
  } 
  componentDidMount() {
    this.state.socket.emit('connect_to_game', {
      gameUUID: this.state.gameUUID,
      userId: this.state.userId
    });
  } 
  handleClick(x, y){
    const { boardColls, winner } = this.state
    let current_coll = boardColls[x][y]
    if (current_coll || winner){
      return;
    }
    if (this.state.author===this.state.userName && !this.state.xIsNext)
    {
      return;
    }
    if (this.state.author!==this.state.userName && this.state.xIsNext)
    {
      return;
    }
    let currentSymbol = (this.state.xIsNext ? 'X' : 'O');
    boardColls[x][y] = currentSymbol;

    let stepInfo = {
      boardColls: boardColls,
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
      gameUUID: this.state.gameUUID
    }
    this.setState(stepInfo);
    this.state.socket.emit('step', stepInfo);
    let data_to_send = {
      x: x, 
      y:y,
      stepNumber: this.state.stepNumber,
      gameId: this.state.gameId,
      currentSymbol: currentSymbol,
      userId: localStorage.getItem('user_id'),
      gameUUID: this.state.gameUUID
    }
    this.state.socket.emit('get_result', data_to_send);

  }

  render() {
    const { boardSize, boardColls, winner, finished, error_msg, yourSymbol} = this.state;
    let next_gamer = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let your_symbol = 'Your: ' + yourSymbol;
    if (finished){
      next_gamer = (<Link to='/create_game'><button className="btn btn-create auth-btn">New game</button></Link>)
    }
    if (winner){
      your_symbol = winner;
    }
    if (boardSize){
      return (
        <div>
          <h2>{next_gamer}</h2>
          <h2>{your_symbol}</h2>
          <div className='row board'>
            <Board boardColls={boardColls} boardSize={boardSize} onClick={(x, y) => this.handleClick(x, y)}/>
          </div>
        </div>
      )
    }else{
      return (
        <div className=''>
        {error_msg}
        </div>
      )
    }

  }
}