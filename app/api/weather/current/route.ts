import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = {
  dallas: { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
  'saint-louis': { name: 'Saint Louis', lat: 38.6270, lon: -90.1994 },
  chicago: { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
} as const;

type CityKey = keyof typeof CITIES;

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured. Please set OPENWEATHER_API_KEY in .env' },
      { status: 500 }
    );
  }

  const cityKey = request.nextUrl.searchParams.get('city') ?? 'dallas';
  if (!Object.hasOwn(CITIES, cityKey)) {
    return NextResponse.json({ error: 'Unknown city' }, { status: 400 });
  }
  const city = CITIES[cityKey as CityKey];

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: city.lat,
          lon: city.lon,
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
      city: city.name,
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
