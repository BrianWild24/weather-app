export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { id: 'dallas', name: 'Dallas', lat: 32.7767, lon: -96.797 },
  { id: 'saint-louis', name: 'Saint Louis', lat: 38.627, lon: -90.1994 },
  { id: 'chicago', name: 'Chicago', lat: 41.8781, lon: -87.6298 },
];

export const DEFAULT_CITY_ID = 'dallas';

export function getCityById(id: string | null | undefined): City | undefined {
  if (!id) return undefined;
  return CITIES.find((c) => c.id === id.toLowerCase());
}
