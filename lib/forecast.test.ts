import { describe, it, expect } from 'vitest';
import { buildDailyForecast, ForecastEntry } from './forecast';

const TZ = -18000; // CDT, UTC-5
const HOUR = 3600;

function entry(dt: number, over: Partial<{ max: number; min: number; hum: number; wind: number; icon: string }> = {}): ForecastEntry {
  return {
    dt,
    main: { temp_max: over.max ?? 80, temp_min: over.min ?? 70, humidity: over.hum ?? 50 },
    weather: [{ description: `desc ${over.icon ?? '01d'}`, icon: over.icon ?? '01d' }],
    wind: { speed: over.wind ?? 5 },
  };
}

// 2025-06-01T00:00:00Z
const BASE = Date.UTC(2025, 5, 1) / 1000;

describe('buildDailyForecast', () => {
  it('groups by city-local date, not UTC date', () => {
    // 03:00 UTC on Jun 2 is 22:00 local on Jun 1
    const result = buildDailyForecast([entry(BASE + 27 * HOUR)], TZ);
    expect(result).toHaveLength(1);
    expect(result[0].date).toBe('2025-06-01');
  });

  it('aggregates high, low, humidity and wind', () => {
    const list = [
      entry(BASE + 14 * HOUR, { max: 85, min: 72, hum: 40, wind: 4 }),
      entry(BASE + 17 * HOUR, { max: 95, min: 78, hum: 60, wind: 7 }),
      entry(BASE + 20 * HOUR, { max: 90, min: 65, hum: 50, wind: 9 }),
    ];
    const [day] = buildDailyForecast(list, TZ);
    expect(day.tempHigh).toBe(95);
    expect(day.tempLow).toBe(65);
    expect(day.humidity).toBe(50);
    expect(day.windSpeed).toBe(6.7);
  });

  it('picks description and icon from the entry closest to local midday', () => {
    const list = [
      entry(BASE + 8 * HOUR, { icon: '01n' }), // 03:00 local
      entry(BASE + 17 * HOUR, { icon: '02d' }), // 12:00 local
      entry(BASE + 22 * HOUR, { icon: '03d' }), // 17:00 local
    ];
    const [day] = buildDailyForecast(list, TZ);
    expect(day.icon).toBe('02d');
  });

  it('returns exactly 5 sorted days when 6 dates appear with a partial first day', () => {
    // Start at 19:00 local Jun 1 (partial), then 40 entries over 3h steps => 6 dates
    const start = BASE + 24 * HOUR;
    const list = Array.from({ length: 40 }, (_, i) => entry(start + i * 3 * HOUR));
    const result = buildDailyForecast(list, TZ);
    expect(result).toHaveLength(5);
    expect(result.map((d) => d.date)).toEqual([...result.map((d) => d.date)].sort());
    expect(result[0].date).toBe('2025-06-01');
    expect(result[4].date).toBe('2025-06-05');
  });

  it('returns an empty array for an empty list', () => {
    expect(buildDailyForecast([], TZ)).toEqual([]);
  });
});
