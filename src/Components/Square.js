import React, { Component } from 'react';

import GamePiece from './GamePiece';

class Square extends Component {

    constructor(props) {
        super(props);
        console.log('IsSquarePlayable? : ' + this.props.isPlayable);
    };

    render() {
        return (
            <button
                className={this.getElementClassName()}
            >
                {
                    (this.props.pieceOnSquare == null) 
                        ? null
                        : <GamePiece 
                            piece={this.props.pieceOnSquare}
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

}

export default Square;