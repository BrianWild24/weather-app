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
    const city = getCityById('stlouis');
    expect(city?.name).toBe('Saint Louis');
    expect(city?.lat).toBeCloseTo(38.627, 2);
    expect(city?.lon).toBeCloseTo(-90.199, 2);
  });

  it('finds Chicago by id', () => {
    const city = getCityById('chicago');
    expect(city?.name).toBe('Chicago');
    expect(city?.lat).toBeCloseTo(41.878, 2);
    expect(city?.lon).toBeCloseTo(-87.63, 2);
  });

  it('finds Denver by id', () => {
    const city = getCityById('denver');
    expect(city?.name).toBe('Denver');
    expect(city?.lat).toBeCloseTo(39.739, 2);
    expect(city?.lon).toBeCloseTo(-104.990, 2);
  });

  it('returns undefined for unknown cities', () => {
    expect(getCityById('atlantis')).toBeUndefined();
  });
});
