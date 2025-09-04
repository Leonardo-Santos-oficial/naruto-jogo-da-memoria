import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

vi.mock('../../utils/generateCards', async () => {
  // mock generateCards e resetIds com um deck estático pequeno
  return {
    default: () => [
      { id: 1, value: 'A', isFlipped: false, isMatched: false },
      { id: 2, value: 'B', isFlipped: false, isMatched: false },
      { id: 3, value: 'A', isFlipped: false, isMatched: false },
      { id: 4, value: 'B', isFlipped: false, isMatched: false },
    ],
    resetIds: () => {},
  };
});

import useMemoryGame from '../useMemoryGame';

describe('useMemoryGame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('estado inicial e setup', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { cards, moves, isGameWon, seconds, isBusy } = result.current.state;
    expect(cards).toHaveLength(4);
    expect(moves).toBe(0);
    expect(isGameWon).toBe(false);
    expect(seconds).toBe(0);
    expect(isBusy).toBe(false);
  });

  it('1º flip inicia o timer', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { actions } = result.current;
    const firstCard = result.current.state.cards[0];
    act(() => actions.handleCardClick(firstCard));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.state.seconds).toBe(1);
  });

  it('mismatch: trava, conta jogada e desvira após 1s', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { actions } = result.current;
    const [c1, , , c2] = result.current.state.cards; // A e B

    act(() => actions.handleCardClick(c1));
    act(() => actions.handleCardClick(c2));

    expect(result.current.state.moves).toBe(1);
    expect(result.current.state.isBusy).toBe(true);

    act(() => vi.advanceTimersByTime(1000));

    const { cards } = result.current.state;
    const c1State = cards.find((c) => c.id === c1.id);
    const c2State = cards.find((c) => c.id === c2.id);
    expect(c1State.isFlipped).toBe(false);
    expect(c2State.isFlipped).toBe(false);
    expect(result.current.state.isBusy).toBe(false);
  });

  it('match: marca par, incrementa jogada e não desvira', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { actions } = result.current;
    // pegar o par A (id 1 e 3)
    const a1 = result.current.state.cards.find((c) => c.value === 'A');
    const a2 = result.current.state.cards.find((c) => c.value === 'A' && c.id !== a1.id);

    act(() => actions.handleCardClick(a1));
    act(() => actions.handleCardClick(a2));

    expect(result.current.state.moves).toBe(1);
    const post = result.current.state.cards;
    post.filter((c) => c.value === 'A').forEach((c) => expect(c.isMatched).toBe(true));
  });

  it('vitória: todos os pares casados seta isGameWon e para timer', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { actions } = result.current;
    const pairs = [
      result.current.state.cards.filter((c) => c.value === 'A'),
      result.current.state.cards.filter((c) => c.value === 'B'),
    ];

    // fecha A
    act(() => actions.handleCardClick(pairs[0][0]));
    act(() => actions.handleCardClick(pairs[0][1]));
    // fecha B
    act(() => actions.handleCardClick(pairs[1][0]));
    act(() => actions.handleCardClick(pairs[1][1]));

    expect(result.current.state.isGameWon).toBe(true);

    const before = result.current.state.seconds;
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.state.seconds).toBe(before); // não incrementa mais
  });

  it('bloqueio: não vira mais de 2 cartas durante mismatch', () => {
    const { result } = renderHook(() => useMemoryGame());
    const { actions } = result.current;
    const [a1, b1, a2] = result.current.state.cards; // A, B, A

    act(() => actions.handleCardClick(a1));
    act(() => actions.handleCardClick(b1)); // mismatch inicia travamento

    // tentativa de virar terceira durante travamento
    act(() => actions.handleCardClick(a2));

    // após 1s, as duas primeiras desviram e a terceira não deve ter virado
    act(() => vi.advanceTimersByTime(1000));
    const state = result.current.state.cards;
    expect(state.find((c) => c.id === a2.id).isFlipped).toBe(false);
  });
});
