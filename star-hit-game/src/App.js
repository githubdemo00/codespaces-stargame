import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import TicTacToe from './TicTacToe';
import StarWars from './StarWars'; // Import the StarWars component

const App = () => {
    const [game, setGame] = useState(null);
    const handleGameSelection = (selectedGame) => {
        setGame(selectedGame);
    };
    return (
        <div className="app-container">
            {!game && (
                <div className="game-selection">
                    <div className="game-icon">🕹️</div>
                    <h1 className="game-title">Choose Your Game</h1>
                    <button className="game-button" onClick={() => handleGameSelection('star')}>
                        Play Star Game
                    </button>
                    <button className="game-button" onClick={() => handleGameSelection('tictactoe')}>
                        Play Tic Tac Toe
                    </button>
                    <button className="game-button" onClick={() => handleGameSelection('starwars')}>
                        Play StarWars
                    </button>
                </div>
            )}
            {game === 'star' && <Game />}
            {game === 'tictactoe' && <TicTacToe />}
            {game === 'starwars' && <StarWars />} {/* Render the StarWars game */}
        </div>
    );
};

export default App;