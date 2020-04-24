import React from 'react';
import './css/App.css';
import GameSwitch from './components/GameSwitch';
import GameProvider from './contextStore/GameProvider';

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
