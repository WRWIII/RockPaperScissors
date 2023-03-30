import { useState, useEffect, useRef } from 'react';
import '../run-screen/run-screen.css';
import Scoreboard from '../scoreboard/scoreboard';
import music from '../music/rpsTheme.mp3';
import tieGIF from '../componentIMG/megaManTie.gif';
import hitGIF from '../componentIMG/megaManShoot.gif';
import damageGIF from '../componentIMG/megaManDamage.gif';

const RunScreen = () => {
    const [timer, setTimer] = useState(30);
    const [playerScore, setPlayerScore] = useState(0);
    const [cpuScore, setCpuScore] = useState(0);
    const [gameResult, setGameResult] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [scoreList, setScoreList] = useState([]);
    const [damage, setDamage] = useState(false);
    const [hit, setHit] = useState(false);
    const [remtachEnable, setRematchEnable] = useState(false);
    const [musicPlayer, setMusicPlayer] = useState(false);
    // const [showAudioControls, setShowAudioControls] = useState('hidden-audio-controls');
    const [isMuted, setIsMuted] = useState(false);
    const [battleGIF, setBattleGIF] = useState(tieGIF);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    const updateScoreList = () => {
        setScoreList([...scoreList, playerScore])
    }

    ///Music player activator && audio btn
    function handleMusicPlayer() {
        const rpsMusic = document.getElementById('audio-player');
        setMusicPlayer(true);
        if(musicPlayer === true) {
            rpsMusic.play();
        }
    }

    // function handleAudioButton() {
    //     if(showAudioControls === 'hidden-audio-controls') {
    //         setShowAudioControls('audio-controls');
    //     } else if(showAudioControls === 'audio-controls'){
    //         setShowAudioControls('hidden-audio-controls');
    //     }
    // }

    function handleMuteBtn() {
        if(audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
        }
    }

    ///Timer && gameover trigger && music trigger
    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerRef.current);
            setGameOver(true);
            handleRematchButton();
        }else {
            timerRef.current = setInterval(() =>{
                setTimer(prevTime => prevTime - 1);
            }, 1000);  
            console.log('render')
        handleMusicPlayer();
        return () => {
            clearInterval(timerRef.current);
        }
        } 
    }, [timer]);

    ///Commentary arrays
    const fightLossComment = [
        'Oh NO!!!!',
        'Ouch!!!',
        'No Good!!!',
        'Ahh!!!'
    ]

    let randomLossIndex = Math.floor(Math.random() * fightLossComment.length);
    let randomLossComment = fightLossComment[randomLossIndex];

    const fightWinComment = [
        'Nice Move!!!',
        'Ez Pz!!!',
        'Incredible!!!',
        'Excellent!!!'
    ]

    let randomWinIndex = Math.floor(Math.random() * fightWinComment.length);
    let randomWinComment = fightWinComment[randomWinIndex];

    const fightTieComment = [
        'Try Again!',
        'Again Again!',
        'C\'mon Again!',
        'Again!'
    ]

    let randomTieIndex = Math.floor(Math.random() * fightTieComment.length);
    let randomTieComment = fightTieComment[randomTieIndex];

    
    ///match LOGIC && damage triggger && comment trigger
    const moves = ['rock', 'paper', 'scissors'];
    const rpsMatch = (playerMove) => {
        const cpuMove = moves[Math.floor(Math.random() * 3)];

        if(playerMove === cpuMove) {
            setGameResult(<h5 className='tie-comment'>{randomTieComment}</h5>)
            setBattleGIF(tieGIF);
        } else if(
            (playerMove === 'rock' && cpuMove === 'scissors') ||
            (playerMove === 'paper' && cpuMove === 'rock') ||
            (playerMove === 'scissors' && cpuMove === 'paper')
        ) {
            setPlayerScore(prevScore => prevScore + 1);
            handleHit();
            setGameResult(<h1 className='playerAttackHit'>{randomWinComment}</h1>)
            setBattleGIF(hitGIF);
        } else {
            setCpuScore(prevScore => prevScore + 1);
            handleDamage();
            setGameResult(<h3 className='cpuAttackHit'>{randomLossComment}</h3>)
            setBattleGIF(damageGIF);
        }
    };

    function handleDamage() {
        setDamage(true);
        setTimeout(() => {
        setDamage(false);
        }, 1000);
    }

    function handleHit() {
        setHit(true);
        setTimeout(() => {
            setHit(false);
        }, 1000)
    }
    
    let matchDecision = '';
    if(playerScore > cpuScore) {
        matchDecision = "YOU WIN!!!";
    } else if (playerScore < cpuScore) {
        matchDecision = "YOU LOSE!";
      } else {
        matchDecision = "DRAW!";
    }

    ///rematch Btn
    function handleRematchButton() {
        setTimeout(() => {
           setRematchEnable(true) 
        },2000)
    }

    const handleRematch = () => {
        setPlayerScore(0);
        setCpuScore(0);
        setTimer(5);
        setGameResult('');
        setGameOver(false);
        setRematchEnable(false);
        setBattleGIF(tieGIF);
    }

    return (
        <div className={damage ? 'runScreenBGImage shake' : 'runScreenBGImage'}>
            <div className='container'>    
            {/* Scores and Timer */}
                    <div className="battleCommentary">{timer > 0 && gameResult}</div>    
                        <div className={damage ? "score playerScore playerHit" : "score playerScore"}>Player: {playerScore}</div>
                        <div className={hit ? 'score cpuScore playerHit' : 'score cpuScore'}>CPU: {cpuScore}</div>
                <div className='row'>
                    <h1 className="gameTimer display-1 ">{timer === 0 ? 'Game Over' : `${timer}`}</h1>
                </div>
            {/* Audio */}
                <div className='hidden-audio-controls'>
                    <audio ref={audioRef} preload="true" id='audio-player' loop>
                    <source src={music} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                </div>  
                <button className='mute-btn btn btn-outline-primary btn-sm' onClick={handleMuteBtn}>{isMuted ? <i class="fas fa-volume-up"></i> : <i class="fas fa-volume-mute"></i>}</button>
                {/* <button className='audio-btn' onClick={handleAudioButton}>AUDIO</button> */}
                {!gameOver ?  (
                    // Controller
                    <>
                    <div className='row'>
                        <div className='controller btn-group'>
                            <div className='col-4'><button className='rps btn' id='rock' onClick={() => rpsMatch('rock')}></button></div>
                            <div className='col-4'><button className='rps btn' id='paper' onClick={() => rpsMatch('paper')}></button></div>
                            <div className='col-4'><button className='rps btn' id='scissors' onClick={() => rpsMatch('scissors')}></button></div>
                        </div>
                    </div>
                    <div className='row'>
                    <div className="gif-container">
                    <img src={battleGIF} className='battle-gif' alt="Your GIF" />
                    </div>
                    </div>
                    </>
                ) : ( 
                    <>
                    { <Scoreboard score={playerScore} scoreList={scoreList} matchDecision={matchDecision} />}
                    {!remtachEnable ? (
                        <></>
                    ) : (
                        // Rematch Button
                       
                            <button className='btn btn-lg btn-block rematch-button' onClick={handleRematch}>Rematch?</button>   
                     
                    )}
                    </>
                )}
                
            </div>

        </div>
       
    );
};

export default RunScreen;