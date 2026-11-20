// Shared TypeScript types for weather data records and the data source interface used to store them.
export interface WeatherData {
  id?: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  icon: string;
  city: string;
  timestamp: string;
}

export interface WeatherDataSource {
  save(data: Omit<WeatherData, 'id'>): Promise<void>;
  getAll(): Promise<WeatherData[]>;
  getById(id: number): Promise<WeatherData | null>;
  deleteById(id: number): Promise<void>;
}
