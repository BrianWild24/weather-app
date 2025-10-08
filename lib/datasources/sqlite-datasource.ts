import Database from 'better-sqlite3';
import path from 'path';
import { WeatherData, WeatherDataSource } from '../types';

export class SQLiteDataSource implements WeatherDataSource {
  private db: Database.Database;

  constructor(dbPath?: string) {
    const defaultPath = path.join(process.cwd(), 'weather.db');
    this.db = new Database(dbPath || defaultPath);
    this.initialize();
  }

  private initialize(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS weather_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL NOT NULL,
        feelsLike REAL NOT NULL,
        humidity INTEGER NOT NULL,
        pressure INTEGER NOT NULL,
        windSpeed REAL NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        city TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )
    `);
  }

  async save(data: Omit<WeatherData, 'id'>): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO weather_history (
        temperature, feelsLike, humidity, pressure, windSpeed, 
        description, icon, city, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      data.temperature,
      data.feelsLike,
      data.humidity,
      data.pressure,
      data.windSpeed,
      data.description,
      data.icon,
      data.city,
      data.timestamp
    );
  }

  async getAll(): Promise<WeatherData[]> {
    const stmt = this.db.prepare(`
      SELECT * FROM weather_history 
      ORDER BY timestamp DESC
    `);
    
    return stmt.all() as WeatherData[];
  }

  async getById(id: number): Promise<WeatherData | null> {
    const stmt = this.db.prepare(`
      SELECT * FROM weather_history WHERE id = ?
    `);
    
    const result = stmt.get(id) as WeatherData | undefined;
    return result || null;
  }

  async deleteById(id: number): Promise<void> {
    const stmt = this.db.prepare(`
      DELETE FROM weather_history WHERE id = ?
    `);
    
    stmt.run(id);
  }

  close(): void {
    this.db.close();
  }
}
