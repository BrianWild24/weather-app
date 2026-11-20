export interface CityConfig {
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: Record<string, CityConfig> = {
  dallas: { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
  stlouis: { name: 'Saint Louis', lat: 38.6270, lon: -90.1994 },
  chicago: { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
};

export const DEFAULT_CITY = 'dallas';
