import React, { Component } from 'react';

class GamePiece extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: props.piece
        };
    }
    render() {
        return (
            <div className={
                'GamePiece'
                + ' player-' + (this.state.piece.player == 1 ? 'one' : 'two') 
                + (this.state.piece.isKing ? ' king' : '')
                + (this.state.piece.isSelected ? ' selected-gamepiece' : '')}>
                
            </div>);
    }
}

export default GamePiece;