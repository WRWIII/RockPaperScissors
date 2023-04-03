import React, { useState, useEffect } from 'react';
import './scoreboard.css'

const Scoreboard = ({ score, scoreList, matchDecision }) => {
  const [newName, setNewName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [playerResult, setPlayerResult] = useState(0);

  //End score counting animation
  useEffect(() => {
    let interval;
    if (playerResult < score) {
      interval = setInterval(() => {
        setPlayerResult(prevScore => prevScore + 1);
      }, 40);
    }
    return () => clearInterval(interval);
  }, [score, playerResult]);

  //Handles for name input and submission handle to remove input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    scoreList.push({ name: newName, score, match: matchDecision });
    setNewName('');
    console.log(scoreList);
    setFormSubmitted(true);
  };
  //Sort and limit to 5 for high scores
  const sortedScoreList = scoreList.sort((a, b) => b.score - a.score);
  const limitedScoreList = sortedScoreList.slice(0, 5);

  return (
    <>
      <h2 className='match-decision'>{matchDecision}</h2>
      <div className='row'>
        <h3 className='player-result'>{playerResult * 1000}</h3>
      </div>
      <table className='highScoreTable'>
        <thead>
          <tr>
            <th>CHAMPIONS</th>
            <th>TOTAL POINTS</th>
            <th>WIN, LOSS, OR TIE</th>
          </tr>
        </thead>
        <tbody>
          {limitedScoreList.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.score * 1000}</td>
              <td>{score.match.substring(4,5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!formSubmitted && (
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-2'>
              <input className='name-input form-control' type="text" value={newName} onChange={handleNameChange} maxLength='10' placeholder='Enter Name' />
              <button className='btn btn-secondary' type='submit'>ENTER</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Scoreboard;