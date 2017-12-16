import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import './App.css';

import Game from './Components/Game';


import {red500, red700, grey50, white} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import typography from 'material-ui/styles/typography';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: white,
        primary2Color: grey50,
    },
    appBar: {
        color: white,
        textColor: red500,
        titleFontWeight: typography.fontWeightMedium
    }
});


class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Game />
                </div>
            </MuiThemeProvider>);
    }
}

export default App;