export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  {
    id: 'dallas',
    name: 'Dallas',
    country: 'United States',
    lat: 32.7767,
    lon: -96.7970,
  },
  {
    id: 'stlouis',
    name: 'Saint Louis',
    country: 'United States',
    lat: 38.6270,
    lon: -90.1994,
  },
];

export function getCityById(cityId: string): City | undefined {
  return CITIES.find((city) => city.id === cityId);
}
