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
                onDragStart={this.handlePieceDragStart.bind(this)}
                onDragEnd={this.handlePieceDragEnd.bind(this)}
            >
            </div>);
    }

    getElementClassName() {
        return 'GamePiece'
            + ' player-' + (this.props.piece.player === 1 ? 'one' : 'two') 
            + (this.props.piece.isKing ? ' king' : '')
            + (this.props.piece.isSelected ? ' selected-gamepiece' : '');
    }

    handlePieceDragStart(e) {
        e.dataTransfer.setData('text/plain', this.props.piece.id);
        this.props.onPieceDragStart(e, this.props.piece.id);
    }

    handlePieceDragEnd(e) {
        this.props.onPieceDragEnd(e, this.props.piece.id);
    }
}

export default GamePiece;