import React, { useState, useEffect } from 'react';

const StarWars = () => {
    const [rocketPosition, setRocketPosition] = useState(window.innerWidth / 2);
    const [asteroids, setAsteroids] = useState([]);
    const asteroidFallInterval = 100; // Interval for asteroids to fall
    const rocketSpeed = 20; // Speed of the rocket movement

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setRocketPosition(prevPosition => Math.max(prevPosition - rocketSpeed, 0));
            } else if (event.key === 'ArrowRight') {
                setRocketPosition(prevPosition => Math.min(prevPosition + rocketSpeed, window.innerWidth));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const asteroidCreationInterval = setInterval(() => {
            createAsteroid();
        }, 1000); // Create a new asteroid every second

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(asteroidCreationInterval);
        };
    }, []);

    const createAsteroid = () => {
        const newAsteroid = {
            id: Math.random(),
            x: Math.random() * window.innerWidth,
            y: 0,
        };
        setAsteroids(prevAsteroids => [...prevAsteroids, newAsteroid]);
    };

    useEffect(() => {
        const moveAsteroids = setInterval(() => {
            setAsteroids(prevAsteroids =>
                prevAsteroids.map(asteroid => ({
                    ...asteroid,
                    y: asteroid.y + 10
                })).filter(asteroid => asteroid.y < window.innerHeight)
            );
        }, asteroidFallInterval);

        return () => clearInterval(moveAsteroids);
    }, []);

    return (
        <div style={styles.gameArea}>
            <div style={{ ...styles.rocket, left: rocketPosition }}>🚀</div>
            {asteroids.map(asteroid => (
                <div
                    key={asteroid.id}
                    style={{ ...styles.asteroid, left: asteroid.x, top: asteroid.y }}>
                    🌑
                </div>
            ))}
        </div>
    );
};

// Styles
const styles = {
    gameArea: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'black',
        overflow: 'hidden'
    },
    rocket: {
        position: 'absolute',
        bottom: '20px',
        fontSize: '30px'
    },
    asteroid: {
        position: 'absolute',
        fontSize: '20px'
    }
};

export default StarWars;
