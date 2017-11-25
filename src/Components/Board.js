import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {

    boardRows;
    
    constructor(props) {

        super(props);
        this.boardRows = Array(8).fill(null);
        let squares = [8];
        let squareId = 0;
        
        // Set up all 64 squares, but make them null (will be initialized later)
        for (let i = 0; i < 8; i++) {

            let rowOfSquares = Array(8).fill(null);

            for (let j = 0; j < 8; j++) {
                rowOfSquares[j] = 
                    <Square 
                        key={squareId} 
                        id={squareId}
                        xPos={i}
                        yPos={j}
                        isPlayable={this.determineSquareType(i, j)}
                        canMoveToThisSquare={false}
                        pieceOnSquare={this.getPieceOnSquare(i, j)}
                        onPieceDragStart={this.props.onPieceDragStart}
                        onPieceDragEnd={this.props.onPieceDragEnd}
                        onSquareDrop={this.props.onSquareDrop}
                        onSquareDragEnter={this.props.onSquareDragEnter}
                        onSquareDragOver={this.props.onSquareDragOver}
                        onSquareDragLeave={this.props.onSquareDragLeave}
                    />;
                squareId++;
            }

            this.boardRows[i] = <div key={'row' + i} className="Row">{rowOfSquares}</div>;
        }

        for (let i = 0; i < this.props.pieces.length; i++) {

        }
        //this.placeGamePieceModels();
    }

    render() {
        return (
            <div className="Board">
                {this.boardRows}
            </div>);
    }

    determineSquareType(x, y) {
        return (y % 2 !== 0)
            ? (x % 2 === 0)
            : (x % 2 !== 0);
    }

    placeGamePieceModels() {
        let index = 0;

        for (let i = 0; i < 8; i++) {
            if (i < 3) {
                // Initialize player 1's pieces on the appropriate squares
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    this.placePieceOnSquare(index, i, j);
                    index++;
                }
            } else if (i >= 5) {
                // Initialize player 2's pieces on the appropriate squares
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    this.placePieceOnSquare(index, i, j);
                    index++;
                }
            }
        }
    }

    getPieceOnSquare(x, y) {
        for (let i = 0; i < this.props.pieces.length; i++) {
            let pieceXPos = this.props.pieces[i].xPos;
            let pieceYPos = this.props.pieces[i].yPos;

            if (x == pieceXPos && y == pieceYPos)
            {
                return this.props.pieces[i];
            }
        }
        return null;
    }

}

export default Board;