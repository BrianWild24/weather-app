import { describe, it, expect } from 'vitest';
import { SUPPORTED_CITIES, CITY_NAMES } from './cities';

describe('Cities Configuration', () => {
  describe('SUPPORTED_CITIES', () => {
    it('should contain Dallas with correct coordinates', () => {
      expect(SUPPORTED_CITIES['Dallas']).toEqual({
        name: 'Dallas',
        lat: 32.7767,
        lon: -96.7970,
        state: 'Texas',
      });
    });

    it('should contain St. Louis with correct coordinates', () => {
      expect(SUPPORTED_CITIES['St. Louis']).toEqual({
        name: 'St. Louis',
        lat: 38.6270,
        lon: -90.1994,
        state: 'Missouri',
      });
    });

    it('should contain Chicago with correct coordinates', () => {
      expect(SUPPORTED_CITIES['Chicago']).toEqual({
        name: 'Chicago',
        lat: 41.8781,
        lon: -87.6298,
        state: 'Illinois',
      });
    });

    it('should contain Denver with correct coordinates', () => {
      expect(SUPPORTED_CITIES['Denver']).toEqual({
        name: 'Denver',
        lat: 39.7392,
        lon: -104.9903,
        state: 'Colorado',
      });
    });

    it('should have exactly 4 supported cities', () => {
      expect(Object.keys(SUPPORTED_CITIES)).toHaveLength(4);
    });

    it('should have valid latitude values between -90 and 90', () => {
      Object.values(SUPPORTED_CITIES).forEach((city) => {
        expect(city.lat).toBeGreaterThanOrEqual(-90);
        expect(city.lat).toBeLessThanOrEqual(90);
      });
    });

    it('should have valid longitude values between -180 and 180', () => {
      Object.values(SUPPORTED_CITIES).forEach((city) => {
        expect(city.lon).toBeGreaterThanOrEqual(-180);
        expect(city.lon).toBeLessThanOrEqual(180);
      });
    });
  });

  describe('CITY_NAMES', () => {
    it('should contain all city names', () => {
      expect(CITY_NAMES).toContain('Dallas');
      expect(CITY_NAMES).toContain('St. Louis');
      expect(CITY_NAMES).toContain('Chicago');
      expect(CITY_NAMES).toContain('Denver');
    });

    it('should have exactly 4 city names', () => {
      expect(CITY_NAMES).toHaveLength(4);
    });

    it('should match the keys of SUPPORTED_CITIES', () => {
      expect(CITY_NAMES.sort()).toEqual(Object.keys(SUPPORTED_CITIES).sort());
    });
  });

  describe('CityConfig Interface', () => {
    it('should have required properties for each city', () => {
      Object.values(SUPPORTED_CITIES).forEach((city) => {
        expect(city).toHaveProperty('name');
        expect(city).toHaveProperty('lat');
        expect(city).toHaveProperty('lon');
        expect(city).toHaveProperty('state');
        expect(typeof city.name).toBe('string');
        expect(typeof city.lat).toBe('number');
        expect(typeof city.lon).toBe('number');
        expect(typeof city.state).toBe('string');
      });
    });
  });
});
