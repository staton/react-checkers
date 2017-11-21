import React, { Component } from 'react';

import Board from './Board';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            gamePieces: this.initializeGamePieces()
        };
    }

    render() {
        return (
            <div className="Game">
                <div><h2>Checkers</h2></div>
                <div>Player 1's turn</div>
                <Board pieces={this.state.gamePieces}/>
            </div>);
    }

    initializeGamePieces() {
        let pieces = [24];
        let index = 0;

        for (let i = 0; i < 8; i++) {
            if (i < 3) {
                // Initialize player 1's pieces
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    pieces[index] = { id: index, player: 1, isKing: false, isSelected: false, xPosition: i, yPosition: j};
                    index++;
                }
            } else if (i >= 5) {
                // Initialize player 2's pieces
                for (let j = ((i + 1) % 2); j < 8; j+=2) {
                    pieces[index] = { id: index, player: 2, isKing: false, isSelected: false, xPosition: i, yPosition: j};
                    index++;
                }
            }
        }

        return pieces;
    }

}

export default Game;