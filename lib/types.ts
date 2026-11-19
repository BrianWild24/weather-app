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

export interface DailyForecast {
  date: string;
  tempHigh: number;
  tempLow: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherDataSource {
  save(data: Omit<WeatherData, 'id'>): Promise<void>;
  getAll(): Promise<WeatherData[]>;
  getById(id: number): Promise<WeatherData | null>;
  deleteById(id: number): Promise<void>;
}
