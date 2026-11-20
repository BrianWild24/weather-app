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
    const city = getCityById('stlouis');
    expect(city?.name).toBe('Saint Louis');
    expect(city?.lat).toBe(38.627);
    expect(city?.lon).toBe(-90.1994);
  });

  it('finds Chicago by id', () => {
    const city = getCityById('chicago');
    expect(city?.name).toBe('Chicago');
    expect(city?.lat).toBe(41.8781);
    expect(city?.lon).toBe(-87.6298);
  });

  it('returns undefined for unknown cities', () => {
    expect(getCityById('denver')).toBeUndefined();
  });
});
