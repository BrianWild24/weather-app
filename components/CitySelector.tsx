'use client';

import { CITIES } from '@/lib/cities';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <select
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {CITIES.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}, {city.country}
        </option>
      ))}
    </select>
  );
}
