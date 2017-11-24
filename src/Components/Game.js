import React, { Component } from 'react';

import Board from './Board';
import * as Logic from '../GameLogic/Logic';

class Game extends Component {

    constructor() {
        super();
        this.state = { 
            pieces: Logic.initializeGamePieces(),
            isPlayer1sTurn: true
        };
    }

    render() {
        return (
            <div className="Game">
                <div><h2>Checkers</h2></div>
                <div>Player 1's turn</div>
                <Board 
                    pieces={this.state.pieces}
                    onPieceDragStart={this.handlePieceDragStart}
                    onPieceDragEnd={this.handlePieceDragEnd}
                    onPieceDragDrop={this.handlePieceDragDrop}
                    onSquareHoverEnter={this.handleSquareHoverEnter}
                    onSquareHoverLeave={this.handleSquareHoverLeave}
                />
            </div>);
    }

    handlePieceDragStart(e) {
        console.log("Game - HandlePieceDragStart: " + e);
    }

    handlePieceDragEnd(e) {
        console.log("Game - HandlePieceDragEnd: " + e);
    }

    handlePieceDragDrop(e) {
        console.log("Game - HandlePieceDragDrop: " + e);
    }

    handleSquareHoverEnter(e) {
        console.log("Game - HandleSquareHoverEnter: " + e);
    }

    handleSquareHoverLeave(e) {
        console.log("Game - HandleSquareHoverLeave: " + e);
    }

}

export default Game;