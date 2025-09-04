import { describe, it, expect } from 'vitest';
import { shuffle } from '../shuffle';

describe('shuffle', () => {
  it('não deve mutar o array de entrada', () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffle(input);
    expect(input).toEqual(copy);
  });

  it('deve manter o mesmo tamanho e elementos', () => {
    const input = ['a', 'b', 'c', 'd'];
    const out = shuffle(input);
    expect(out).toHaveLength(input.length);
    expect([...out].sort()).toEqual([...input].sort());
  });

  it('provavelmente altera a ordem após algumas execuções', () => {
    const input = Array.from({ length: 8 }, (_, i) => i);
    let diferente = false;
    for (let i = 0; i < 10; i += 1) {
      const out = shuffle(input);
      if (out.some((v, idx) => v !== input[idx])) {
        diferente = true;
        break;
      }
    }
    expect(diferente).toBe(true);
  });
});
