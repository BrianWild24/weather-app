import { describe, it, expect } from 'vitest';
import { CITIES, getCityById } from './cities';

describe('cities', () => {
  it('contains Dallas and Saint Louis', () => {
    expect(CITIES.map((c) => c.id)).toEqual(['dallas', 'stlouis']);
  });

  it('finds Saint Louis by id', () => {
    expect(getCityById('stlouis')?.name).toBe('Saint Louis');
  });

  it('finds Dallas by id', () => {
    expect(getCityById('dallas')?.name).toBe('Dallas');
  });

  it('returns undefined for removed cities', () => {
    expect(getCityById('chicago')).toBeUndefined();
    expect(getCityById('denver')).toBeUndefined();
  });
});
