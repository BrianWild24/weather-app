import { describe, it, expect } from 'vitest';
import { formatTemperature, formatWindSpeed } from './format';

describe('formatTemperature', () => {
  it('rounds up to one decimal', () => {
    expect(formatTemperature(21.46)).toBe('21.5°C');
  });

  it('rounds down to one decimal', () => {
    expect(formatTemperature(21.44)).toBe('21.4°C');
  });

  it('adds a trailing decimal to integers', () => {
    expect(formatTemperature(20)).toBe('20.0°C');
  });

  it('formats zero', () => {
    expect(formatTemperature(0)).toBe('0.0°C');
  });

  it('formats negative values', () => {
    expect(formatTemperature(-5.26)).toBe('-5.3°C');
  });

  it('does not return negative zero', () => {
    expect(formatTemperature(-0.04)).toBe('0.0°C');
  });
});

describe('formatWindSpeed', () => {
  it('converts m/s to km/h', () => {
    expect(formatWindSpeed(10)).toBe('36 km/h');
  });

  it('formats zero', () => {
    expect(formatWindSpeed(0)).toBe('0 km/h');
  });

  it('rounds up', () => {
    expect(formatWindSpeed(3)).toBe('11 km/h');
  });

  it('rounds down', () => {
    expect(formatWindSpeed(1.5)).toBe('5 km/h');
  });

  it('rounds a small positive value up to 1', () => {
    expect(formatWindSpeed(0.14)).toBe('1 km/h');
  });

  it('does not return negative zero', () => {
    expect(formatWindSpeed(-0.1)).toBe('0 km/h');
  });
});
