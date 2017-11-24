import React, { Component } from 'react';

class GamePiece extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                draggable="true"
                className={this.getElementClassName()}
            >
            </div>);
    }

    getElementClassName() {
        return 'GamePiece'
            + ' player-' + (this.props.piece.player === 1 ? 'one' : 'two') 
            + (this.props.piece.isKing ? ' king' : '')
            + (this.props.piece.isSelected ? ' selected-gamepiece' : '');
    }
}

export default GamePiece;