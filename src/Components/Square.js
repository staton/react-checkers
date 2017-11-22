import React, { Component } from 'react';

import GamePiece from './GamePiece';

class Square extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squareModel: props.squareModel
        }
    };

    render() {
        return (
            <button 
                onDragEnter={this.handleDragEnter.bind(this)}
                onDragLeave={this.handleDragLeave.bind(this)}
                className={'Square ' + this.state.squareModel.playable}>
                {
                    this.state.squareModel.gamePieceModel == null 
                        ? null 
                        : <GamePiece piece={this.state.squareModel.gamePieceModel}/>
                }
            </button>);
    }

    handleDragEnter(event) {
        event.preventDefault();
        this.state.squareModel.dragEnter(this.state.squareModel.id);
    }

    handleDragLeave(event) {
        this.state.squareModel.dragLeave(this.state.squareModel.id);
    }

    handleDragDrop(event) {
        this.state.squareModel.dragDrop(this.state.squareModel.id);
    }

}

export default Square;