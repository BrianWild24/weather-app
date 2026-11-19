export interface City {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

export const CITIES = {
  dallas: { name: 'Dallas', state: 'Texas', lat: 32.7767, lon: -96.797 },
  miami: { name: 'Miami', state: 'Florida', lat: 25.7617, lon: -80.1918 },
} satisfies Record<string, City>;

export type CityKey = keyof typeof CITIES;

export const DEFAULT_CITY: CityKey = 'dallas';

export function isCityKey(value: string): value is CityKey {
  return Object.prototype.hasOwnProperty.call(CITIES, value);
}
