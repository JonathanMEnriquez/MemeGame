import React, { Component } from 'react';
import Title from './Title';
import TitleBody from './TitleBody';
import GameContext from '../contextStore/GameContext';
import '../css/TitleScreen.css';

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