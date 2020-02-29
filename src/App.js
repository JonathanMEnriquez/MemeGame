import React from 'react';
import './css/App.css';
import GameSwitch from './GameSwitch';
import GameProvider from './GameProvider';

const App = () => {
  return (
    <div className="main">
      <GameProvider>
        <GameSwitch />
      </GameProvider>
    </div>
  );
}

export default App;
