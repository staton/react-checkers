import React, { Component } from 'react';

import GamePiece from './GamePiece';

class Square extends Component {

    constructor(props) {
        super(props);
        this.state = {
            piece: props.piece
        }
    };

    render() {
        console.log(this.state.piece);
        return (
            <button className={'Square ' + this.props.playable}>
                {
                    this.state.piece == null ? null : <GamePiece piece={this.state.piece}/>
                }
            </button>);
    }
}

export default Square;