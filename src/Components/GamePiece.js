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
            <div draggable="true"
                onDragStart={this.handleDragStart.bind(this)}
                onDragEnd={this.handleDragEnd.bind(this)}
                className={
                'GamePiece'
                + ' player-' + (this.state.piece.player === 1 ? 'one' : 'two') 
                + (this.state.piece.isKing ? ' king' : '')
                + (this.state.piece.isSelected ? ' selected-gamepiece' : '')}>
                
            </div>);
    }

    /**
     * 
     */
    handleDragStart(e) {
        let id = this.state.piece.id;
        this.state.piece.dragStart(id);
    }

    /**
     * 
     */
    handleDragEnd(e) {
        let id = this.state.piece.id;
        this.state.piece.dragEnd(id);
    }

}

export default GamePiece;