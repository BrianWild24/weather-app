import { describe, it, expect } from 'vitest';
import { CITIES, getCityById } from './cities';

describe('cities', () => {
  it('contains only Dallas', () => {
    expect(CITIES.map((c) => c.id)).toEqual(['dallas']);
  });

  it('finds Dallas by id', () => {
    expect(getCityById('dallas')?.name).toBe('Dallas');
  });

  it('returns undefined for removed cities', () => {
    expect(getCityById('chicago')).toBeUndefined();
    expect(getCityById('denver')).toBeUndefined();
    expect(getCityById('stlouis')).toBeUndefined();
  });
});
