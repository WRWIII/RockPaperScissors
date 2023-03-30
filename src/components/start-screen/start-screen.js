import { useState, useEffect } from 'react';
import RunScreen from '../run-screen/run-screen';
import './start-screen.css';


const StartScreen = () => {
    const [gameStart, setGameReady] = useState(false);
    const [runGame, setGameState] = useState(false);

    //Start Screen game start hook for a delay on click
    useEffect(() => {
        let timeout;
        if (gameStart) {
            timeout = setTimeout(() => {
                setGameState(true);
            }, 2000)
        }
        return () => clearTimeout(timeout);
    }, [gameStart])



    if (gameStart === false) {
        return (
            <div className='startScreenBGImage'>
                <div className='container-fluid'>
                    <h1 className="titleScreenHeader display-1 bounce-in-bottom">Rock Paper Scissors</h1>
                    <button className="startButton" onClick={() => setGameReady(true)}>
                        <div className="startButtonText display-5 text-shadow-pop-top">Start</div>
                    </button>
                </div>
            </div>

        )
    } else if (gameStart === true && runGame === false) {

        return (
            <div className="startScreenBGImage">
                <div className='container-fluid'>
                    <h1 className="titleScreenHeaderOnChange display-1">GET READY!!!!!!</h1>
                    <button className="startButton">
                        <div className="startButtonActivate display-5">GET READY!!!</div>
                    </button>
                </div>
            </div>
        )
    }

    else if (runGame === true) {
        return (
            <>
                <RunScreen />
            </>
        )
    }
}

export default StartScreen;