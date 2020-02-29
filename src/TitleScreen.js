import React, { Component } from 'react';
import Title from './Title';
import TitleBody from './TitleBody';
import GameContext from './GameContext';

class TitleScreen extends Component {
    render() {
        const { pregameMode } = this.context;

        return (
            <div className="title-screen">
                <Title />
                <TitleBody pregameMode={pregameMode} />
            </div>
        );
    }
}

TitleScreen.contextType = GameContext;
 
export default TitleScreen;