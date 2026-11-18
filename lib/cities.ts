export interface City {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: 'dallas', name: 'Dallas', region: 'Texas', lat: 32.7767, lon: -96.797 },
  { id: 'saint-louis', name: 'Saint Louis', region: 'Missouri', lat: 38.627, lon: -90.1994 },
];

export const DEFAULT_CITY_ID = 'dallas';

export function getCity(id: string): City | undefined {
  return CITIES.find((c) => c.id === id.toLowerCase());
}
