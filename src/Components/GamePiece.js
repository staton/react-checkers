import React, { Component } from 'react';

class GamePiece extends Component {

    render() {
        console.log("Render game piece!");
        return (
            <div 
                draggable={this.isPieceDraggable()}
                className={this.getElementClassName()}
                onDragStart={this.handlePieceDragStart.bind(this)}
                onDragEnd={this.handlePieceDragEnd.bind(this)}
            >
                <div
                    className="piece-overlay"
                >
                    <div
                        className="king"
                        style={this.getKingStyle()}
                    >
                        <span>KING</span>
                    </div>
                </div>
            </div>);
    }

    /**
     * Determines whether or not the piece is draggable, based on which player's turn it is.
     */
    isPieceDraggable() {
        return ((this.props.isPlayer1sTurn && this.props.piece.player === 1)
            || (!this.props.isPlayer1sTurn && this.props.piece.player !== 1));
    }

    /**
     * Gets the class name for this piece.
     */
    getElementClassName() {
        return 'GamePiece'
            + ' player-' + (this.props.piece.player === 1 ? 'one' : 'two')
            + (this.props.piece.isSelected ? ' selected-gamepiece' : '');
    }

    /**
     * Gets the style that will determine if the "KING" icon is visible or not,
     * depending on whether or not this piece has been kinged.
     */
    getKingStyle() {
        return {
            visibility: (this.props.piece.isKing ? 'visible' : 'hidden')
        };
    }

    handlePieceDragStart(e) {
        this.props.onPieceDragStart(e, this.props.piece.id);
    }

    handlePieceDragEnd(e) {
        this.props.onPieceDragEnd(e, this.props.piece.id);
    }
}

export default GamePiece;