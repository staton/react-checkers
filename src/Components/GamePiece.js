import React, { Component } from 'react';

class GamePiece extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                draggable={this.isPieceDraggable()}
                className={this.getElementClassName()}
                onDragStart={this.handlePieceDragStart.bind(this)}
                onDragEnd={this.handlePieceDragEnd.bind(this)}
            >
                <div className="piece-overlay"></div>
            </div>);
    }

    isPieceDraggable() {
        return ((this.props.isPlayer1sTurn && this.props.piece.player == 1)
            || (!this.props.isPlayer1sTurn && this.props.piece.player == 2));
    }

    getElementClassName() {
        return 'GamePiece'
            + ' player-' + (this.props.piece.player === 1 ? 'one' : 'two') 
            + (this.props.piece.isKing ? ' king' : '')
            + (this.props.piece.isSelected ? ' selected-gamepiece' : '');
    }

    handlePieceDragStart(e) {
        this.props.onPieceDragStart(e, this.props.piece.id);
    }

    handlePieceDragEnd(e) {
        this.props.onPieceDragEnd(e, this.props.piece.id);
    }
}

export default GamePiece;