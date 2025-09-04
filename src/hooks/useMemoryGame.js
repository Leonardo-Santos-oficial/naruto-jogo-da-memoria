import { useEffect, useRef, useState } from 'react';
import generateCards, { resetIds } from '../utils/generateCards';

export default function useMemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const timerRef = useRef(null);
  const busyRef = useRef(false);

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
    busyRef.current = false;
    setIsBusy(false);
  };

  useEffect(() => {
    setup();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (flippedCards.length === 1 && !timerRef.current) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  }, [flippedCards.length]);

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
    if (busyRef.current || isBusy || isGameWon) return;

    // vira visualmente a carta clicada
    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)));

    // usa forma funcional para garantir leitura do estado mais recente
    setFlippedCards((prev) => {
      // evita duplicar a mesma carta por latência de estado
      if (prev.some((c) => c.id === card.id)) return prev;
      const next = [...prev, { ...card, isFlipped: true }];

      if (next.length === 2) {
        busyRef.current = true;
        setIsBusy(true);
        setMoves((m) => m + 1);
        const [a, b] = next;
        if (a.value === b.value) {
          // marca par e verifica vitória imediatamente
          setCards((prevCards) => {
            const updated = prevCards.map((c) => (c.value === a.value ? { ...c, isMatched: true } : c));
            if (updated.length > 0 && updated.every((c) => c.isMatched)) {
              setIsGameWon(true);
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
            }
            return updated;
          });
          // libera imediatamente após match (sem esperar timeout)
          setFlippedCards([]);
          busyRef.current = false;
          setIsBusy(false);
        } else {
          // não casou — desvira após 1s
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((c) => (c.id === a.id || c.id === b.id ? { ...c, isFlipped: false } : c))
            );
            setFlippedCards([]);
            busyRef.current = false;
            setIsBusy(false);
          }, 1000);
        }
      }

      return next;
    });
  };

  return {
    state: { cards, moves, isGameWon, seconds, isBusy },
    actions: { setup, handleCardClick },
  };
}
