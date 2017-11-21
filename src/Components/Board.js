import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {
    rows;

    constructor(props) {
        super(props);
        let arr = [8];
        for (let i = 0; i < 8; i++) {
            arr[i] = [8];
            for (let j = 0; j < 8; j++) {
                arr[i][j] = null;
            }
        }
        for (let j = 0; j < 24; j++){
            console.log(props.pieces[j]);
        }
        this.state = {
            squares: arr,
            pieces: props.pieces
        };

        this.initializeBoard();
    }

    render() {
        return (
            <div className="Board">
                {this.rows}
            </div>);
    }

    /**
     * 
     */
    initializeBoard() {
        this.rows = Array(8).fill(null);
        let key;
        let index = 0;

        for (let i = 0; i < 8; i++) {
            if (i < 3) {
                // Initialize player 1's pieces on the appropriate squares
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    this.initializePieceOnSquare(index, i, j);
                    index++;
                }
            } else if (i >= 5) {
                // Initialize player 2's pieces on the appropriate squares
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    this.initializePieceOnSquare(index, i, j);
                    index++;
                }
            }
        }

        // Now initialize all 64 square views
        for (let i = 0; i < 8; i++) {
            let row = Array(8).fill(null);

            for (let j = 0; j < 8; j++) {
                key = 'x' + i + 'y' + j;
                row[j] = <Square key={key} 
                                 playable={this.determineSquareType(i, j)} 
                                 piece={this.state.squares[i][j]}/>;
            }
            
            key = 'row' + i;
            this.rows[i] = <div key={key} className="Row">{row}</div>;
        }
    }

    /**
     * 
     * @param {*} index 
     * @param {*} x 
     * @param {*} y 
     */
    initializePieceOnSquare(index, x, y) {
        //let id = this.state.pieces[index].id;
        this.state.pieces[index].dragStart = this.handleDragStart;
        this.state.pieces[index].dragEnd = this.handleDragEnd;
        this.state.squares[x][y] = this.state.pieces[index];
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
    handleDragStart(id) {
        console.log("Board.handleDragStart called! id: " + id)
    }

    /**
     * 
     * @param {*} id 
     */
    handleDragEnd(id) {
        console.log("Board.handleDragEnd called! id: " + id)
    }
}

export default Board;