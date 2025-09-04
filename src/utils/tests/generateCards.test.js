import { describe, it, expect, beforeEach } from 'vitest';
import generateCards, { resetIds } from '../generateCards';

describe('generateCards', () => {
  beforeEach(() => resetIds());

  it('gera pares: cada value aparece exatamente 2x', () => {
    const cards = generateCards(['x', 'y', 'z']);
    const counts = cards.reduce((acc, c) => {
      acc[c.value] = (acc[c.value] || 0) + 1;
      return acc;
    }, {});
    Object.values(counts).forEach((n) => expect(n).toBe(2));
  });

  it('ids são únicos', () => {
    const cards = generateCards(['a', 'b', 'c']);
    const ids = new Set(cards.map((c) => c.id));
    expect(ids.size).toBe(cards.length);
  });

  it('resetIds reinicia a sequência de ids', () => {
    const first = generateCards(['q']);
    const minFirst = Math.min(...first.map((c) => c.id));
    resetIds();
    const second = generateCards(['q']);
    const minSecond = Math.min(...second.map((c) => c.id));
    expect(minFirst).toBe(1);
    expect(minSecond).toBe(1);
  });
});
