import React, { Component } from 'react';

import Board from './Board';
import * as Logic from '../GameLogic/Logic';

class Game extends Component {

    constructor() {
        super();
        this.state = { 
            pieces: this.initializeGamePieces(),
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
                    onSquareDrop={this.handleSquareDrop}
                    onSquareDragEnter={this.handleSquareDragEnter}
                    onSquareDragOver={this.handleSquareDragOver}
                    onSquareDragLeave={this.handleSquareDragLeave}
                />
            </div>);
    }

    resetGame() {
        this.setState({
            pieces: this.initializeGamePieces(),
            isPlayer1sTurn: true
        });
    }

    initializeGamePieces() {
        let pieces = [24];
        let index = 0;
    
        for (let i = 0; i < 8; i++) {
            if (i < 3) {
                // Initialize player 1's pieces
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    pieces[index] = { 
                        id: index, 
                        player: 1, 
                        isKing: false, 
                        isSelected: false, 
                        xPos: i, 
                        yPos: j,
                        dragStart: null,
                        dragEnd: null
                    };
                    index++;
                }
            } else if (i >= 5) {
                // Initialize player 2's pieces
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    pieces[index] = { 
                        id: index, 
                        player: 2, 
                        isKing: false, 
                        isSelected: false, 
                        xPos: i, 
                        yPos: j,
                        dragStart: null,
                        dragEnd: null
                    };
                    index++;
                }
            }
        }
    
        return pieces;
    }

    handlePieceDragStart(e, args) {
        let pieceId = e.dataTransfer.getData('text/plain')
        console.log("Game - handlePieceDragStart: " + args);
    }

    handlePieceDragEnd(e, args) {
        console.log("Game - handlePieceDragEnd: " + args);
    }

    handleSquareDrop(e, args) {
        console.log("Game - handleSquareDrop: " + args.xPos + ", " + args.yPos);
    }

    handleSquareDragEnter(e, args) {
        console.log("Game - handleSquareDragEnter: " + args.xPos + ", " + args.yPos);
    }

    handleSquareDragOver(e) {
    }

    handleSquareDragLeave(e, args) {
        console.log("Game - handleSquareDragLeave: " + args.xPos + ", " + args.yPos);
    }

}

export default Game;