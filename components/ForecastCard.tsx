import Image from 'next/image';
import { DailyForecast } from '@/lib/types';
import { Droplets, Wind } from 'lucide-react';

interface ForecastCardProps {
  forecast: DailyForecast[];
}

function formatDay(date: string) {
  // date is a calendar date (YYYY-MM-DD); format in UTC so it never shifts
  const d = new Date(`${date}T12:00:00Z`);
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' }),
    short: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
  };
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {forecast.map((day) => {
        const { weekday, short } = formatDay(day.date);
        const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

        return (
          <div
            key={day.date}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-center"
          >
            <div className="font-semibold text-gray-900 dark:text-white">{weekday}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{short}</div>

            <Image
              src={iconUrl}
              alt={day.description}
              width={64}
              height={64}
              className="w-16 h-16 mx-auto"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
              {day.description}
            </p>

            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {Math.round(day.tempHigh)}°F
              <span className="font-normal text-gray-500 dark:text-gray-400">
                {' '}/ {Math.round(day.tempLow)}°F
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Droplets className="w-4 h-4" />
                <span>{day.humidity}%</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Wind className="w-4 h-4" />
                <span>{day.windSpeed} mph</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
