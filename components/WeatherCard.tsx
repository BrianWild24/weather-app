import Image from 'next/image';
import { WeatherData } from '@/lib/types';
import { Cloud, Droplets, Wind, Gauge, ThermometerSun, Clock } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const lastUpdated = new Date(weather.timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-4xl font-bold">{weather.city}</h2>
          <p className="text-blue-100 capitalize text-lg mt-1">
            {weather.description}
          </p>
        </div>
        <Image
          src={iconUrl}
          alt={weather.description}
          width={96}
          height={96}
          className="w-24 h-24"
        />
      </div>

      <div className="mb-8">
        <div className="text-6xl font-bold mb-2">
          {Math.round(weather.temperature)}°F
        </div>
        <div className="text-blue-100 text-lg">
          Feels like {Math.round(weather.feelsLike)}°F
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
          <Droplets className="w-6 h-6" />
          <div>
            <div className="text-sm text-blue-100">Humidity</div>
            <div className="font-semibold text-lg">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
          <Wind className="w-6 h-6" />
          <div>
            <div className="text-sm text-blue-100">Wind Speed</div>
            <div className="font-semibold text-lg">{weather.windSpeed} mph</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
          <Gauge className="w-6 h-6" />
          <div>
            <div className="text-sm text-blue-100">Pressure</div>
            <div className="font-semibold text-lg">{weather.pressure} hPa</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
          <ThermometerSun className="w-6 h-6" />
          <div>
            <div className="text-sm text-blue-100">Temperature</div>
            <div className="font-semibold text-lg">{Math.round(weather.temperature)}°F</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-3">
        <Clock className="w-5 h-5 text-blue-100" />
        <div className="text-center">
          <div className="text-xs text-blue-100">Last updated (local time)</div>
          <div className="text-sm font-semibold">{lastUpdated}</div>
        </div>
      </div>
    </div>
  );
}
