import './App.css';
import { useState, useEffect } from 'react';
import StartScreen from './components/start-screen/start-screen';

function App() {
  const [runGame, setGameState] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGameState(true);
    }, 500)
    return () => clearTimeout(timeout);
  }, [])

  return (
    <div className="constainer-fluid">
     {runGame && <StartScreen />}
    </div>
  );
}

export default App;
