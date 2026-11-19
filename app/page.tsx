'use client';

import { useState, useEffect } from 'react';
import { WeatherData } from '@/lib/types';
import { CITIES, DEFAULT_CITY_ID } from '@/lib/cities';
import WeatherCard from '@/components/WeatherCard';
import HistoryTable from '@/components/HistoryTable';
import { RefreshCw, Save, History, AlertCircle } from 'lucide-react';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY_ID);
  const selectedCityName =
    CITIES.find((c) => c.id === selectedCity)?.name ?? 'Dallas';

  const fetchCurrentWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather/current?city=${encodeURIComponent(selectedCity)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather');
      }
      
      setCurrentWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherHistory = async () => {
    try {
      const response = await fetch('/api/weather/history');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch history');
      }
      
      setWeatherHistory(data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const saveCurrentWeather = async () => {
    if (!currentWeather) return;
    
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await fetch('/api/weather/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentWeather),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save weather');
      }
      
      setSuccessMessage('Weather data saved successfully!');
      
      // Refresh history if it's being shown
      if (showHistory) {
        await fetchWeatherHistory();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save weather');
    } finally {
      setSaving(false);
    }
  };

  const toggleHistory = async () => {
    if (!showHistory) {
      await fetchWeatherHistory();
    }
    setShowHistory(!showHistory);
  };

  useEffect(() => {
    fetchCurrentWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time weather information for {selectedCityName}
          </p>
          <div className="mt-4">
            <label htmlFor="city-select" className="sr-only">
              Select city
            </label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-4 shadow-sm"
            >
              {CITIES.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center space-x-3">
            <Save className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <p className="text-green-800 dark:text-green-200">{successMessage}</p>
          </div>
        )}

        <div className="mb-8">
          {loading && !currentWeather ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading weather data...</p>
            </div>
          ) : currentWeather ? (
            <WeatherCard weather={currentWeather} />
          ) : null}
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={fetchCurrentWeather}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Weather</span>
          </button>

          <button
            onClick={saveCurrentWeather}
            disabled={!currentWeather || saving}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Current Weather'}</span>
          </button>

          <button
            onClick={toggleHistory}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
          >
            <History className="w-5 h-5" />
            <span>{showHistory ? 'Hide History' : 'Show History'}</span>
          </button>
        </div>

        {showHistory && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Weather History
            </h2>
            <HistoryTable history={weatherHistory} />
          </div>
        )}
      </div>
    </div>
  );
}
