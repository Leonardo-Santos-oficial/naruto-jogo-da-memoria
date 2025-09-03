import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ScorePanel from './components/ScorePanel';
import GameBoard from './components/GameBoard';
import generateCards, { resetIds } from './utils/generateCards';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // stores up to 2 card objects
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const timerRef = useRef(null);

  // initialize board
  const setup = () => {
    resetIds();
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setIsGameWon(false);
    setSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // start timer on first flip
  useEffect(() => {
    if (flippedCards.length === 1 && !timerRef.current) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  }, [flippedCards.length]);

  // check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setIsGameWon(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [cards]);

  const handleCardClick = (card) => {
    if (isBusy || isGameWon) return;
    if (flippedCards.length === 2) return;
    // flip the card
    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)));
    const next = [...flippedCards, { ...card, isFlipped: true }];
    setFlippedCards(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (a.value === b.value) {
        // match
        setCards((prev) => prev.map((c) => (c.value === a.value ? { ...c, isMatched: true } : c)));
        setFlippedCards([]);
      } else {
        // not a match — flip back after 1s
        setIsBusy(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
          setIsBusy(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="app">
      <Header onReset={setup} />
      <ScorePanel moves={moves} seconds={seconds} isGameWon={isGameWon} />
      <GameBoard cards={cards} onCardClick={handleCardClick} disabled={isBusy} />
    </div>
  );
}

export default App;
