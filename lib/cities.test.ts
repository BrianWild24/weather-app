import { describe, it, expect } from 'vitest';
import { CITIES, getCityById } from './cities';

describe('cities', () => {
  it('contains Dallas, Saint Louis, Chicago and Denver', () => {
    expect(CITIES.map((c) => c.id)).toEqual(['dallas', 'stlouis', 'chicago', 'denver']);
  });

  it('finds Dallas by id', () => {
    expect(getCityById('dallas')?.name).toBe('Dallas');
  });

  it('finds Saint Louis by id', () => {
    expect(getCityById('stlouis')?.name).toBe('Saint Louis');
  });

  it('finds Chicago by id', () => {
    expect(getCityById('chicago')?.name).toBe('Chicago');
  });

  it('finds Denver by id', () => {
    expect(getCityById('denver')?.name).toBe('Denver');
  });

  it('returns undefined for unsupported cities', () => {
    expect(getCityById('seattle')).toBeUndefined();
  });
});
