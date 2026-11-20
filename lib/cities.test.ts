import { describe, it, expect } from 'vitest';
import { CITIES, getCityById } from './cities';

describe('cities', () => {
  it('contains Dallas, Saint Louis and Chicago', () => {
    expect(CITIES.map((c) => c.id)).toEqual(['dallas', 'stlouis', 'chicago']);
  });

  it('finds Dallas by id', () => {
    expect(getCityById('dallas')?.name).toBe('Dallas');
  });

  it('finds Saint Louis by id', () => {
    expect(getCityById('stlouis')).toEqual({
      id: 'stlouis',
      name: 'Saint Louis',
      country: 'United States',
      lat: 38.6270,
      lon: -90.2494,
    });
  });

  it('finds Chicago by id', () => {
    expect(getCityById('chicago')).toEqual({
      id: 'chicago',
      name: 'Chicago',
      country: 'United States',
      lat: 41.8781,
      lon: -87.6298,
    });
  });

  it('returns undefined for unknown cities', () => {
    expect(getCityById('denver')).toBeUndefined();
  });
});
