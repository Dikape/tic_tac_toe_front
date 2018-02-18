import React, { Component } from 'react';

class Cell extends Component{
	render(){
		return(
		   	<button className="cell" onClick={() => this.props.onClick(this.props.x_index, this.props.y_index)}>
		   	  {this.props.cell_value}
		    </button>
			)
	}
}
class Row extends Component{
	renderCells(boardSize){
		const cells = [];
		for (let index = 0; index < boardSize; index++) {
		  cells.push(<Cell cell_value={this.props.row_colls[index]} key={index} x_index={this.props.row_index} y_index={index}
		  	onClick={this.props.onClick}/>)
		}
		return cells;
	}
	render(){
		return(
		   	<div className="btn-group btn-group-justified btn-group-custom" role="group">
		   	  {this.renderCells(this.props.boardSize)}
		    </div>
			)
	}
}

export default class Board extends Component{
	renderBoard(boardSize){
		const board = [];
		for (let index = 0; index < boardSize; index++) {
		  board.push(<Row row_colls={this.props.boardColls[index]} key={index} row_index={index} boardSize={boardSize} onClick={this.props.onClick}/>)
		}
		return board;
	}
	render(){

		const boardSize = this.props.boardSize;

		return (
			<div className='col-md-12 board'>
				{this.renderBoard(boardSize)}
			</div>
		)

	}
}