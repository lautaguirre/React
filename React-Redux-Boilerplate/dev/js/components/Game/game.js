import React, { Component } from 'react';
import Board from '../Board/board';

import PropTypes from 'prop-types';
import store from './../../store/store';
import {JUMP_TO_STEP, START, BOARD_CLICKED} from './../../actions/actions';

require('./game.scss');

class Game extends Component {
    constructor(){
      super();
      this.handleclick = this.handleclick.bind(this);
      this.jumpTo = this.jumpTo.bind(this);
      this.calculateWinner = this.calculateWinner.bind(this);
    }

    static propTypes = {
      gameState: PropTypes.object.isRequired
    }

    componentDidMount(){
      store.dispatch(START({
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true
      }));
    }
  
    jumpTo(step){
      store.dispatch(JUMP_TO_STEP({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      }));
    }
  
    handleclick(i){
      const history = this.props.gameState.history.slice(0,this.props.gameState.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
  
      if(this.calculateWinner(squares) || squares[i]){
        return;
      }
  
      squares[i] = this.props.gameState.xIsNext ? 'X':'O';

      store.dispatch(BOARD_CLICKED({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.props.gameState.xIsNext
      }));
    }

    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    } 
  
    render() {
  
      const history = this.props.gameState.history;
      const current = history[this.props.gameState.stepNumber];
      const winner = this.calculateWinner(current.squares);
  
      const moves = history.map((step,move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return(
          <li key={move} >
            <button onClick={() => this.jumpTo(move)} >{desc}</button>
          </li>
        );
      });
  
      let status;
      if(winner){
        status = 'Winner is ' + winner;
      }else{
        status = this.props.gameState.xIsNext ? 'X is next':'O is next';
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleclick(i)}  
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}

export default Game;