import './App.css';
import Header from './components/Header';
import ScorePanel from './components/ScorePanel';
import GameBoard from './components/GameBoard';
import useMemoryGame from './hooks/useMemoryGame';

function App() {
  const {
    state: { cards, moves, isGameWon, seconds, isBusy },
    actions: { setup, handleCardClick },
  } = useMemoryGame();

  return (
    <div className="app">
      <Header onReset={setup} />
      <ScorePanel moves={moves} seconds={seconds} isGameWon={isGameWon} />
      <GameBoard cards={cards} onCardClick={handleCardClick} disabled={isBusy} />
    </div>
  );
}

export default App;
