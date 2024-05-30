// src/Game.tsx
import React, { useState, useEffect } from 'react';
import DraggableImage from './DraggableImage';
import DroppableName from './DroppableName';
import images from '../assets/images/images';
import _ from 'lodash'

interface Person {
    id: number;
    name: string;
    image: string;
}

const people: Person[] = [
    { id: 1, name: 'Jine', image: images.img1 },
    { id: 2, name: 'Bob', image: images.img2 },
    { id: 3, name: 'Alice', image: images.img3 },
    { id: 4, name: 'John', image: images.img4 },
    { id: 5, name: 'Zill', image: images.img5 },
    { id: 6, name: 'Mina', image: images.img6 },
];

const Game: React.FC = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [gameRound, setGameRound] = useState(0);
    const [availablePeople, setAvailablePeople] = useState<Person[]>([]);
    // const [usedNames, setUsedNames] = useState<number[]>([]);
    const [sourePerson, setSourcePerson] = useState<Person[]>(shuffleArray(people))
    const [canPlay, setCanPlay] = useState(false)

    // const randomPerson =() : Person[]=>{

    // }
    

    function shuffleArray(array: Person[]) {
        return array.sort(() => Math.random() - 0.5);
    }
    console.log("availablePeople ", availablePeople);

    const randomVailablePerson = () => {
        const sourceTemp = [...sourePerson]
        setAvailablePeople(sourceTemp.slice(0, 3))
        setSourcePerson(sourceTemp.slice(3, sourceTemp.length))

    }


    useEffect(() => {
        let timer = 0;
        if (gameRound < 3) {
            if (canPlay) {
                timer = setInterval(() => {
                    console.log('timer ', timer);
                    setTimeLeft(prev => prev - 1);
                }, 1000);

                if (timeLeft <= 0) {
                    setGameRound(prev => prev + 1);
                    setTimeLeft(30);
                    randomVailablePerson()
                    // setUsedNames([]);
                }

            }
        }

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleDrop = (id: number, droppedId: number) => {
        setAvailablePeople(prev => prev.filter(person => person.id !== droppedId));
        // setUsedNames(prev => [...prev, id]);

        if (id === droppedId) {
            setScore(prev => prev + 1);
        }
    };

    const handleStart = () => {
        setCanPlay(true)
        randomVailablePerson()
        setTimeLeft(30);
        setGameRound(prev => prev + 1);
    }
    const handleNext = () => {
        setGameRound(prev => prev + 1);
        setTimeLeft(30);
        randomVailablePerson()
        // setUsedNames([]);
    }
    return (
        <div>
            <h1>Drag and Drop Game</h1>
            <p>Round: {gameRound}</p>
            <p>Time Left: {timeLeft}s</p>
            <p>Score: {score}</p>
            <div className="images">
                {availablePeople.map(person => (
                    <DraggableImage key={person.id} id={person.id} src={person.image} />
                ))}
            </div>
            <div className="names">
                {availablePeople.map(person => (

                    <DroppableName key={person.id} id={person.id} name={person.name} onDrop={handleDrop} />

                ))}
            </div>
            <button onClick={handleStart} disabled={gameRound > 0 ? true : false}>Start</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Game;
