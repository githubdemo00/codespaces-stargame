import React, { useState } from 'react';
import './App.css';
import Game from './Game';
import TicTacToe from './TicTacToe';
import StarWars from './StarWars'; // Import the StarWars component

const { CosmosClient } = require('@azure/cosmos');

const App = () => {
    const [game, setGame] = useState(null);
    const [name, setName] = useState(''); // New state variable for the name
    const [email, setEmail] = useState(''); // New state variable for the email

    const handleGameSelection = (selectedGame) => {
        setGame(selectedGame);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);

        const client = new CosmosClient({ endpoint: "https://dwpdatadump.documents.azure.com:443/", key: "f1OpaMv4dcUOBMFoOE8lyOLF6Fbvgot4U5a18mk70PzZc08E8JkOPNiWV2Es9iznUInWPxTQ7e2lACDbI19irg=="});
        const database = client.database("dwp");
        const container = database.container("dwpdata");
        const { resource: createdItem } = await container.items.create({ name, email });

    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} required />
                </label>
                <input type="submit" value="Submit" disabled={!name || !validateEmail(email)} />
            </form>
            {isSubmitted && name && validateEmail(email) && (
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