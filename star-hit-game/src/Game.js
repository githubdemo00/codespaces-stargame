import React, { useState, useEffect, useCallback } from 'react';

const Game = () => {
    const [score, setScore] = useState(0);
    const [objects, setObjects] = useState([]);
    const gameTime = 60000; // 1 minute in milliseconds
    const objectFallInterval = 100; // Interval for objects to fall

    const createObject = useCallback(() => {
        const newObject = {
            id: Math.random(),
            x: Math.random() * window.innerWidth,
            y: 0,
            size: Math.random() * (120 - 10) + 10, // Random size between 10 and 80
            color: getRandomColor(),
            type: Math.random() > 0.5 ? 'star' : 'bomb' // Randomly choose type
        };
        setObjects(prevObjects => [...prevObjects, newObject]);
    }, []); // No dependencies

    useEffect(() => {
        const gameTimer = setTimeout(() => {
            setObjects([]);
            alert(`Game over! Your score: ${score}`);
        }, gameTime);

        const objectCreationInterval = setInterval(() => {
            createObject();
        }, objectFallInterval); // Create a new object every second

        return () => {
            clearTimeout(gameTimer);
            clearInterval(objectCreationInterval);
        };
    }, [createObject, score]); // Added createObject and score to the dependency array


    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const hitObject = (id, type) => {
        if (type === 'star') {
            setScore(score + 1);
        } else {
            // Bomb logic here, e.g., reduce score or end game
            setScore(score > 0 ? score - 1 : 0);
        }
        setObjects(objects.filter(obj => obj.id !== id));
    };

    useEffect(() => {
        const moveObjects = setInterval(() => {
            setObjects(prevObjects =>
                prevObjects.map(obj => ({
                    ...obj,
                    y: obj.y + 10 // Adjust speed by changing this value
                })).filter(obj => obj.y < window.innerHeight)
            );
        }, objectFallInterval);

        return () => clearInterval(moveObjects);
    }, []);

    return (
        <div style={{ marginTop: '80px' }}>
            <h1>Click the falling stars and avoid the bombs</h1>
            <h2>Score: {score}</h2>
            <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                {objects.map(obj => (
                    <div
                        key={obj.id}
                        onClick={() => hitObject(obj.id, obj.type)}
                        style={{
                            position: 'absolute',
                            top: `${obj.y}px`,
                            left: `${obj.x}px`,
                            cursor: 'pointer',
                            fontSize: `${obj.size}px`,
                            color: obj.color,
                        }}>
                        {obj.type === 'star' ? '★' : '💣'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;