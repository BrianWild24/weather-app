// Data source entry point: exposes getDataSource(), which returns the SQLite-backed WeatherDataSource, and re-exports SQLiteDataSource.
import { WeatherDataSource } from '../types';
import { SQLiteDataSource } from './sqlite-datasource';

// Factory function to get the data source
export function getDataSource(): WeatherDataSource {
  return new SQLiteDataSource();
}

export { SQLiteDataSource };
