import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const LOCATIONS: Record<string, { lat: number; lon: number }> = {
  dallas: { lat: 32.7767, lon: -96.7970 },
  champaign: { lat: 40.1164, lon: -88.2434 },
};
const DEFAULT_LOCATION = 'dallas';

export async function GET(request: NextRequest) {
  const location = (
    request.nextUrl.searchParams.get('location') || DEFAULT_LOCATION
  ).toLowerCase();

  if (!Object.prototype.hasOwnProperty.call(LOCATIONS, location)) {
    return NextResponse.json(
      {
        error: `Invalid location "${location}". Valid locations: ${Object.keys(LOCATIONS).join(', ')}`,
      },
      { status: 400 }
    );
  }
  const coords = LOCATIONS[location];

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured. Please set OPENWEATHER_API_KEY in .env' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: OPENWEATHER_API_KEY,
          units: 'imperial', // Fahrenheit
        },
      }
    );

    const data = response.data;

    const weatherData = {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: `Weather API error: ${error.response?.data?.message || error.message}` },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
