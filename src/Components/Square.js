import React, { Component } from 'react';

import GamePiece from './GamePiece';

class Square extends Component {
    coordinates;
    constructor(props) {
        super(props);
        this.coordinates = {
            xPos: props.xPos,
            yPos: props.yPos
        };
    };

    render() {
        return (
            <button
                className={this.getElementClassName()}
                onDrop={this.handleSquareDrop.bind(this)}
                onDragEnter={this.handleSquareDragEnter.bind(this)}
                onDragOver={this.handleSquareDragOver.bind(this)}
                onDragLeave={this.handleSquareDragLeave.bind(this)}
            >
                {
                    (this.props.pieceOnSquare == null) 
                        ? null
                        : <GamePiece 
                            piece={this.props.pieceOnSquare}
                            isPlayer1sTurn={this.props.isPlayer1sTurn}
                            onPieceDragStart={this.props.onPieceDragStart}
                            onPieceDragEnd={this.props.onPieceDragEnd}
                          />
                }
            </button>);
    }

    getElementClassName() {
        return 'Square' +
            (this.props.isPlayable
                ? ' playable-square'
                : ' non-playable-square');
    }

    handleSquareDrop(e) {
        e.preventDefault();
        this.props.onSquareDrop(e, this.coordinates);
    }

    handleSquareDragEnter(e) {
        e.preventDefault();
        this.props.onSquareDragEnter(e, this.coordinates);
    }

    handleSquareDragOver(e) {
        e.preventDefault();
        this.props.onSquareDragOver(e, this.coordinates);
    }

    handleSquareDragLeave(e) {
        this.props.onSquareDragLeave(e, this.coordinates);
    }
}

export default Square;