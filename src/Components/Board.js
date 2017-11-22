import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {
    boardRows;

    constructor(props) {
        super(props);
        this.boardRows = Array(8).fill(null);
        let squareModels = [8];
        let squareId = 0;
        
        // Set up all 64 squares, but make them null (will be initialized later)
        for (let i = 0; i < 8; i++) {
            squareModels[i] = [8]; // square models
            let rowOfSquares = Array(8).fill(null); // square views
            for (let j = 0; j < 8; j++) {
                squareModels[i][j] = {
                    id: squareId,
                    xPos: i,
                    yPos: j,
                    gamePieceModel: null,
                    playable: this.determineSquareType(i, j),
                    dragEnter: this.handleSquareDragEnter,
                    dragLeave: this.handleSquareDragLeave,
                    dragDrop: this.handleSquareDragDrop
                };

                rowOfSquares[j] = <Square key={squareId} squareModel={squareModels[i][j]} />;

                squareId++;
            }

            this.boardRows[i] = <div key={'row' + i} className="Row">{rowOfSquares}</div>;
        }

        this.state = {
            squareModels: squareModels,
            gamePieceModels: props.pieces
        };

        this.placeGamePieceModels();
    }

    render() {
        return (
            <div className="Board">
                {this.boardRows}
            </div>);
    }

    /**
     * 
     */
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

    /**
     * 
     * @param {*} index 
     * @param {*} x 
     * @param {*} y 
     */
    placePieceOnSquare(index, x, y) {
        this.state.gamePieceModels[index].dragStart = this.handleGamePieceDragStart;
        this.state.gamePieceModels[index].dragEnd = this.handleGamePieceDragEnd;
        this.state.squareModels[x][y].gamePieceModel = this.state.gamePieceModels[index];
    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    determineSquareType(x, y) {
        if (y & 2 !== 0) {
            return (x % 2 === 0) ? 'playable-square' : 'non-playable-square';
        } else {
            return (x % 2 === 0) ? 'non-playable-square' : 'playable-square';
        }
    }

    /**
     * 
     * @param {*} id 
     */
    handleGamePieceDragStart(id) {
        console.log("Board.handleGamePieceDragStart called! id: " + id)
    }

    /**
     * 
     * @param {*} id 
     */
    handleGamePieceDragEnd(id) {
        console.log("Board.handleGamePieceDragEnd called! id: " + id)
    }

    /**
     * 
     * @param {*} id 
     */
    handleSquareDragEnter(id) {
        console.log("Board.handleSquareDragEnter called! id: " + id);
    }

    /**
     * 
     * @param {*} id 
     */
    handleSquareDragLeave(id) {
        console.log("Board.handleSquareDragLeave called! id: " + id);
    }

    /**
     * 
     * @param {*} id 
     */
    handleSquareDragDrop(id) {
        console.log("Board.handleSquareDragDrop called! id: " + id);
    }
}

export default Board;