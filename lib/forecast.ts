import { DailyForecast } from './types';

export interface ForecastEntry {
  dt: number;
  main: { temp_max: number; temp_min: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

const MAX_DAYS = 5;

/** Shift a UTC unix timestamp (seconds) into the city's local time. */
function toLocal(dt: number, timezoneOffset: number): Date {
  return new Date((dt + timezoneOffset) * 1000);
}

/**
 * Groups OpenWeatherMap 3-hour forecast entries by city-local calendar date
 * and aggregates them into at most 5 daily forecasts, sorted by date.
 *
 * The API returns 40 entries starting at the next 3-hour slot, so the first
 * day may be partial and up to 6 distinct dates can appear. The first day
 * (today, even if partial) is kept and the earliest 5 dates are returned.
 */
export function buildDailyForecast(
  list: ForecastEntry[],
  timezoneOffset: number
): DailyForecast[] {
  const groups = new Map<string, ForecastEntry[]>();

  for (const entry of list) {
    const date = toLocal(entry.dt, timezoneOffset).toISOString().slice(0, 10);
    const group = groups.get(date);
    if (group) {
      group.push(entry);
    } else {
      groups.set(date, [entry]);
    }
  }

  return Array.from(groups.keys())
    .sort()
    .slice(0, MAX_DAYS)
    .map((date) => {
      const entries = groups.get(date) as ForecastEntry[];

      // Representative entry: the one closest to local midday
      const midday = entries.reduce((best, current) => {
        const distance = (e: ForecastEntry) => {
          const d = toLocal(e.dt, timezoneOffset);
          return Math.abs(d.getUTCHours() + d.getUTCMinutes() / 60 - 12);
        };
        return distance(current) < distance(best) ? current : best;
      });

      const avg = (values: number[]) =>
        values.reduce((sum, v) => sum + v, 0) / values.length;

      return {
        date,
        tempHigh: Math.max(...entries.map((e) => e.main.temp_max)),
        tempLow: Math.min(...entries.map((e) => e.main.temp_min)),
        description: midday.weather[0].description,
        icon: midday.weather[0].icon,
        humidity: Math.round(avg(entries.map((e) => e.main.humidity))),
        windSpeed: Math.round(avg(entries.map((e) => e.wind.speed)) * 10) / 10,
      };
    });
}
