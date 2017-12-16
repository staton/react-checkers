import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {

    render() {
        return (
            <div className="Board">
                {this.createBoardRows()}
            </div>);
    }

    /**
     * Creates every row of the board.
     */
    createBoardRows() {
        let boardRows = Array(8).fill(null);
        let squareId = 0;
        
        for (let i = 0; i < 8; i++) {

            let rowOfSquares = Array(8).fill(null);

            for (let j = 0; j < 8; j++) {
                rowOfSquares[j] = 
                    <Square 
                        key={squareId} 
                        id={squareId}
                        xPos={i}
                        yPos={j}
                        isPlayable={this.determineIfSquareIsPlayable(i, j)}
                        canMoveToThisSquare={false}
                        pieceOnSquare={this.getPieceOnSquare(i, j)}
                        isPlayer1sTurn={this.props.isPlayer1sTurn}
                        onPieceDragStart={this.props.onPieceDragStart}
                        onPieceDragEnd={this.props.onPieceDragEnd}
                        onSquareDrop={this.props.onSquareDrop}
                        onSquareDragEnter={this.props.onSquareDragEnter}
                        onSquareDragOver={this.props.onSquareDragOver}
                        onSquareDragLeave={this.props.onSquareDragLeave}
                    />;
                squareId++;
            }

            boardRows[i] = <div key={'row' + i} className="board-row">{rowOfSquares}</div>;
        }

        return boardRows;
    }

    /**
     * Determines if the square is a playable square.
     * @param {*} x 
     * @param {*} y 
     */
    determineIfSquareIsPlayable(x, y) {
        return (y % 2 !== 0)
            ? (x % 2 === 0)
            : (x % 2 !== 0);
    }

    /**
     * Gets the game piece, if any, that is on this square.
     * @param {*} x The x-coordinate of the square.
     * @param {*} y The y-coordinate of the square.
     */
    getPieceOnSquare(x, y) {
        for (let i = 0; i < this.props.pieces.length; i++) {
            let pieceXPos = this.props.pieces[i].xPos;
            let pieceYPos = this.props.pieces[i].yPos;

            if (x === pieceXPos && y === pieceYPos)
            {
                return this.props.pieces[i];
            }
        }
        return null;
    }

}

export default Board;