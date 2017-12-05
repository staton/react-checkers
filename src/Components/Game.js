import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {greenA700, white, grey500} from 'material-ui/styles/colors';

import Board from './Board';
import * as Logic from '../GameLogic/Logic';

const _ = require('underscore');

class Game extends Component {
    
    possibleMoves = [];
    movesThisTurn = [];

    constructor() {
        super();
        this.state = { 
            pieces: this.initializeGamePieces(),
            isPlayer1sTurn: true,
            isNewGameDialogOpen: false
        };
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              backgroundColor={white}
              labelColor={grey500}
              style="margin:1em;"
              onClick={this.handleNewGameDialogCancel.bind(this)}
            />,
            <RaisedButton 
                label="New Game" 
                backgroundColor={greenA700}
                labelColor={white}
                style="margin:1em;"
                onClick={this.handleStartNewGame.bind(this)} />,
          ];

        return (
            <div className="Game">
                {
                    this.renderPlayerTurnText()
                }
                <Board 
                    pieces={this.state.pieces}
                    isPlayer1sTurn={this.state.isPlayer1sTurn}
                    onPieceDragStart={this.handlePieceDragStart.bind(this)}
                    onPieceDragEnd={this.handlePieceDragEnd.bind(this)}
                    onSquareDrop={this.handleSquareDrop.bind(this)}
                    onSquareDragEnter={this.handleSquareDragEnter.bind(this)}
                    onSquareDragOver={this.handleSquareDragOver.bind(this)}
                    onSquareDragLeave={this.handleSquareDragLeave.bind(this)}
                />
                <br /><br />
                <div>
                    <RaisedButton 
                        label="New Game" 
                        backgroundColor={greenA700}
                        labelColor={white}
                        style="margin:1em;"
                        onClick={this.handleNewGameDialogOpen.bind(this)} />
                </div>
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.isNewGameDialogOpen}
                        onRequestClose={this.handleNewGameDialogClose.bind(this)}
                    >
                    Start a new game?
                    </Dialog>
                </div>
            </div>);
    }

    renderPlayerTurnText() {
        
        if (this.state.isPlayer1sTurn) {
            return (<div className="player-one-turn-text"><h2>Player 1's turn</h2></div>);
        } else {
            return (<div className="player-two-turn-text"><h2>Player 2's turn</h2></div>);
        }
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

        // Get the piece using the piece id, given by 'args'.
        let pieces = this.state.pieces.slice();
        let piece = _.findWhere(pieces, { id: args });

        // set the piece's isSelected property to true
        if (piece !== undefined) {
            piece.isSelected = true;
            this.possibleMoves = Logic.getPossibleMoves(
                piece.player, 
                piece.xPos, 
                piece.yPos, 
                piece.isKing, 
                pieces,
                false);
            this.movesThisTurn.push({ xPos: piece.xPos, yPos: piece.yPos });
            this.setState({ pieces: pieces });
        } else {
            console.warn("Game.handleDragStart - PIECE IS UNDEFINED! pieceId: " + args);
        }
    }

    handlePieceDragEnd(e, args) {
        
    }

    handleSquareDrop(e, args) {

        let pieces = this.state.pieces.slice();
        let piece = _.findWhere(pieces, { isSelected: true });

        if (piece !== undefined) {
            console.log("DROP: " + piece.id + " on " + args.xPos + ", " + args.yPos);
            piece.isSelected = false;
           
            // Check if the piece was placed on a valid square (a possible move)
            if (this.movesThisTurn.length > 1
                && _.findWhere(this.possibleMoves, { xPos: args.xPos, yPos: args.yPos }) !== undefined) {
                // The piece was placed on a valid square. So update the piece's X and Y values, 
                // and remove any jumped pieces.
                piece.xPos = args.xPos;
                piece.yPos = args.yPos;
                
                if (!piece.isKing) {
                    piece.isKing = Logic.checkIfShouldKing(piece);
                }
                
                pieces = this.removePieces(pieces);
                this.setState({ pieces: pieces, isPlayer1sTurn: !this.state.isPlayer1sTurn });
            }
        } else {
            console.warn("Game.handleDragDrop - PIECE IS UNDEFINED!");
        }

        this.possibleMoves = [];
        this.movesThisTurn = [];
    }

    handleSquareDragEnter(e, args) {
        //console.log("Game - handleSquareDragEnter: " + args.xPos + ", " + args.yPos);

        let piece = _.findWhere(this.state.pieces, { isSelected: true });
        let isPossibleMove = (_.findWhere(
            this.possibleMoves, 
            { xPos: args.xPos, yPos: args.yPos }) !== undefined);

        if (isPossibleMove) {
            console.log("DRAG ENTER: isPossibleMove = true");
            // The user hovered over a square that is a possible move.
            // So update the list of possible moves, in the event that
            // the user can double jump.
            this.possibleMoves = Logic.getPossibleMoves(
                piece.player, 
                args.xPos, 
                args.yPos, 
                piece.isKing, 
                this.state.pieces,
                true);

            // Also, add the current square to the list, since in case the
            // user wants to stop on this square.
            this.possibleMoves.push({ xPos: args.xPos, yPos: args.yPos});

            let latestMove = this.movesThisTurn[this.movesThisTurn.length - 1];

            if (latestMove.xPos !== args.xPos || latestMove.yPos !== args.yPos) {
                // Update the list of moves made this turn.
                this.movesThisTurn.push({ xPos: args.xPos, yPos: args.yPos });
            }
            
        } else if (this.movesThisTurn.length > 1) {
            console.log("DRAG ENTER - isPreviousSquare = true");
            var prevSquare = this.movesThisTurn[this.movesThisTurn.length - 2];

            if (prevSquare.xPos === args.xPos && prevSquare.yPos === args.yPos) {

                // The user return to hovering over a previous square,
                // so reset the possible moves, and update the moves this turn.
                this.possibleMoves = Logic.getPossibleMoves(
                    piece.player, 
                    args.xPos, 
                    args.yPos, 
                    piece.isKing, 
                    this.state.pieces,
                    false);

                // Also, add the current square to the list, since in case the
                // user wants to stop on this square.
                this.possibleMoves.push({ xPos: args.xPos, yPos: args.yPos});

                // Remove the most recent move from the moves this turn.
                this.movesThisTurn.pop();
            }
        }

        console.log("MOVES THIS TURN:");
        for (let i = 0; i < this.movesThisTurn.length; i++) {
            console.log(this.movesThisTurn[i].xPos + ", " + this.movesThisTurn[i].yPos);
        }
    }

    handleSquareDragOver(e) {

    }

    handleSquareDragLeave(e, args) {
        
    }

    removePieces(pieces) {

        if (this.movesThisTurn.length > 1) {

            for (let i = (this.movesThisTurn.length - 1); i >= 1; i--) {
                let x1 = this.movesThisTurn[i].xPos;
                let y1 = this.movesThisTurn[i].yPos;
                let x2 = this.movesThisTurn[i - 1].xPos;
                let y2 = this.movesThisTurn[i - 1].yPos;

                if (Math.abs(x1 - x2) > 1) {
                    let xToRemove = (x1 > x2) ? x1 - 1 : x2 - 1;
                    let yToRemove = (y1 > y2) ? y1 - 1 : y2 - 1;
                    console.log("Removing piece at " + xToRemove + ", " + yToRemove);
                    
                    pieces = _.filter(
                        pieces,
                        function(piece) {
                            return (piece.xPos !== xToRemove || piece.yPos !== yToRemove);
                        }
                    );
                }
            }

        } else {
            console.warn("CAN'T REMOVE PIECES, NOT ENOUGH MOVES WERE MADE");
        }

        return pieces;
    }

    handleNewGameDialogOpen(e) {
        this.setState({isNewGameDialogOpen: true});
    }
    
    handleNewGameDialogClose(e) {
        this.setState({isNewGameDialogOpen: false});
    }

    handleNewGameDialogCancel(e) {
        this.setState({isNewGameDialogOpen: false});
    }

    handleStartNewGame(e) {
        this.setState({
            isNewGameDialogOpen: false,
            pieces: this.initializeGamePieces(),
            isPlayer1sTurn: true
        });
    }

}

export default Game;