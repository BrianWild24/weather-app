export const CITIES = {
  dallas: { label: 'Dallas, Texas', lat: 32.7767, lon: -96.7970 },
  chicago: { label: 'Chicago, Illinois', lat: 41.8781, lon: -87.6298 },
} as const;

export type CityKey = keyof typeof CITIES;

export const DEFAULT_CITY: CityKey = 'dallas';
