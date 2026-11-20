// Supported cities and their coordinates
export interface CityConfig {
  name: string;
  lat: number;
  lon: number;
  state: string;
}

export const SUPPORTED_CITIES: Record<string, CityConfig> = {
  Dallas: {
    name: 'Dallas',
    lat: 32.7767,
    lon: -96.7970,
    state: 'Texas',
  },
  'St. Louis': {
    name: 'St. Louis',
    lat: 38.6270,
    lon: -90.1994,
    state: 'Missouri',
  },
  Chicago: {
    name: 'Chicago',
    lat: 41.8781,
    lon: -87.6298,
    state: 'Illinois',
  },
};

export const CITY_NAMES = Object.keys(SUPPORTED_CITIES);
