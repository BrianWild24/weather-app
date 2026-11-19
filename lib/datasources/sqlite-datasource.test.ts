import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SQLiteDataSource } from './sqlite-datasource';
import type { WeatherData } from '../types';

function makeWeather(
  overrides: Partial<Omit<WeatherData, 'id'>> = {}
): Omit<WeatherData, 'id'> {
  return {
    temperature: 20.5,
    feelsLike: 19.2,
    humidity: 60,
    pressure: 1013,
    windSpeed: 3.4,
    description: 'clear sky',
    icon: '01d',
    city: 'London',
    timestamp: '2024-01-01T12:00:00.000Z',
    ...overrides,
  };
}

describe('SQLiteDataSource', () => {
  let ds: SQLiteDataSource;

  beforeEach(() => {
    ds = new SQLiteDataSource(':memory:');
  });

  afterEach(() => {
    ds.close();
  });

  describe('save', () => {
    it('stores a row with an auto-assigned id and matching fields', async () => {
      const data = makeWeather();
      await ds.save(data);

      const rows = await ds.getAll();
      expect(rows).toHaveLength(1);
      expect(typeof rows[0].id).toBe('number');
      expect(rows[0]).toEqual({ ...data, id: rows[0].id });
    });

    it('assigns distinct ids when saving twice', async () => {
      await ds.save(makeWeather());
      await ds.save(makeWeather());

      const rows = await ds.getAll();
      expect(rows).toHaveLength(2);
      expect(rows[0].id).not.toBe(rows[1].id);
    });
  });

  describe('getAll', () => {
    it('returns an empty array on an empty DB', async () => {
      expect(await ds.getAll()).toEqual([]);
    });

    it('orders rows by timestamp descending', async () => {
      await ds.save(makeWeather({ city: 'B', timestamp: '2024-01-02T00:00:00.000Z' }));
      await ds.save(makeWeather({ city: 'C', timestamp: '2024-01-03T00:00:00.000Z' }));
      await ds.save(makeWeather({ city: 'A', timestamp: '2024-01-01T00:00:00.000Z' }));

      const rows = await ds.getAll();
      expect(rows.map((r) => r.city)).toEqual(['C', 'B', 'A']);
    });
  });

  describe('getById', () => {
    it('returns the row for an existing id', async () => {
      await ds.save(makeWeather({ city: 'Paris' }));
      const [row] = await ds.getAll();

      const found = await ds.getById(row.id as number);
      expect(found).toEqual(row);
      expect(found?.city).toBe('Paris');
    });

    it('returns null for a missing id', async () => {
      expect(await ds.getById(9999)).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('removes the row', async () => {
      await ds.save(makeWeather());
      const [row] = await ds.getAll();

      await ds.deleteById(row.id as number);

      expect(await ds.getById(row.id as number)).toBeNull();
      expect(await ds.getAll()).toEqual([]);
    });

    it('leaves other rows when deleting one of two', async () => {
      await ds.save(makeWeather({ city: 'A', timestamp: '2024-01-01T00:00:00.000Z' }));
      await ds.save(makeWeather({ city: 'B', timestamp: '2024-01-02T00:00:00.000Z' }));
      const rows = await ds.getAll();
      const toDelete = rows.find((r) => r.city === 'A')!;

      await ds.deleteById(toDelete.id as number);

      const remaining = await ds.getAll();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].city).toBe('B');
    });

    it('resolves without throwing for a nonexistent id and keeps existing rows', async () => {
      await ds.save(makeWeather());
      const before = await ds.getAll();

      await expect(ds.deleteById(9999)).resolves.toBeUndefined();

      expect(await ds.getAll()).toEqual(before);
    });
  });
});
