import { useEffect, useState } from "react";


const Timer = () => {

    const [timer, setTimer] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        if (timer > 0) {
        setTimeout(() => {
            setTimer(prevTime => prevTime - 1);
        }, 1000);
        } else {
        setGameOver(true);
        }
    }, [timer]);


    return (
        <>
        <div className='row'>
            <h1 className="gameTimer display-1 ">{timer === 0 ? 'Game Over' : `${timer}`}</h1>
        </div>
        </>
    )
}

export default Timer ;