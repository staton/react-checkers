import React, { Component } from 'react';

import Board from './Board';
import * as Logic from '../GameLogic/Logic';

const _ = require('underscore');

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
                    onPieceDragStart={this.handlePieceDragStart.bind(this)}
                    onPieceDragEnd={this.handlePieceDragEnd.bind(this)}
                    onSquareDrop={this.handleSquareDrop.bind(this)}
                    onSquareDragEnter={this.handleSquareDragEnter.bind(this)}
                    onSquareDragOver={this.handleSquareDragOver.bind(this)}
                    onSquareDragLeave={this.handleSquareDragLeave.bind(this)}
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
        console.log("DRAG START: " + args);
        let pieces = this.state.pieces.slice();
        let piece = _.findWhere(pieces, { id: args });

        if (piece !== undefined) {
            piece.isSelected = true;
            // highlight squares for possible moves
            this.setState({ pieces: pieces });
        } else {
            console.warn("Game.handleDragStart - PIECE IS UNDEFINED! pieceId: " + args);
        }
    }

    handlePieceDragEnd(e, args) {
        /*
        console.log("DRAG END: " + args);
        let pieces = this.state.pieces.slice();
        let piece = _.findWhere(pieces, { id: args });

        if (piece !== undefined) {
            piece.isSelected = false;
            this.setState({ pieces: pieces });
        } else {
            console.warn("Game.handleDragEnd - PIECE IS UNDEFINED! pieceId: " + args);
        }
        */
    }

    handleSquareDrop(e, args) {
        console.log("Game - handleSquareDrop: " + args.xPos + ", " + args.yPos);

        let pieces = this.state.pieces.slice();
        let piece = _.findWhere(pieces, { isSelected: true });

        if (piece !== undefined) {
            // if the drop was valid, then place the piece & change the player's turn (if no jump).
            console.log("DROP: " + piece.id);
            piece.xPos = args.xPos;
            piece.yPos = args.yPos;
            piece.isSelected = false;
            // unhighlight squares
            this.setState({ pieces: pieces });
        } else {
            console.warn("Game.handleDragDrop - PIECE IS UNDEFINED!");
        }
    }

    handleSquareDragEnter(e, args) {
        console.log("Game - handleSquareDragEnter: " + args.xPos + ", " + args.yPos);
        // check to see if this square is a square that is after a 'jump'. if so, highlight any
        // second jumps.
        // else if the squre is the original square, show the original possible moves.
    }

    handleSquareDragOver(e) {
    }

    handleSquareDragLeave(e, args) {
        console.log("Game - handleSquareDragLeave: " + args.xPos + ", " + args.yPos);
    }

}

export default Game;