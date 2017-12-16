import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {greenA700, grey500, white} from 'material-ui/styles/colors';

class NewGameDialog extends Component {

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              backgroundColor={white}
              labelColor={grey500}
              style={{margin: '1em'}}
              onClick={this.handleNewGameDialogClose.bind(this)}
            />,
            <RaisedButton 
                label="New Game" 
                backgroundColor={greenA700}
                labelColor={white}
                style={{margin: '1em'}}
                onClick={this.handleStartNewGame.bind(this)} />,
            ];

        return (<div>
            <Dialog
                actions={actions}
                modal={false}
                open={this.props.isNewGameDialogOpen}
                onRequestClose={this.handleNewGameDialogClose.bind(this)}
            >
            Start a new game?
            </Dialog>
        </div>);
    }

    handleNewGameDialogClose(e) {
        this.props.onNewGameDialogClose(e);
    }

    handleStartNewGame(e) {
        this.props.onStartNewGame(e);
    }
}

export default NewGameDialog;