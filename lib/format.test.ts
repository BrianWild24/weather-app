import { describe, it, expect } from 'vitest';
import { formatTemperature, formatHumidity } from './format';

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

describe('formatHumidity', () => {
  it('formats integers', () => {
    expect(formatHumidity(65)).toBe('65%');
  });

  it('rounds up', () => {
    expect(formatHumidity(64.5)).toBe('65%');
    expect(formatHumidity(64.6)).toBe('65%');
  });

  it('rounds down', () => {
    expect(formatHumidity(64.4)).toBe('64%');
  });

  it('formats zero', () => {
    expect(formatHumidity(0)).toBe('0%');
  });

  it('formats 100', () => {
    expect(formatHumidity(100)).toBe('100%');
  });

  it('clamps values above 100', () => {
    expect(formatHumidity(101)).toBe('100%');
    expect(formatHumidity(250)).toBe('100%');
  });

  it('clamps values below 0', () => {
    expect(formatHumidity(-1)).toBe('0%');
    expect(formatHumidity(-50)).toBe('0%');
  });

  it('does not return negative zero', () => {
    expect(formatHumidity(-0.4)).toBe('0%');
  });
});
