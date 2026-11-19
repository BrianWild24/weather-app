import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getCityById, DEFAULT_CITY_ID } from '@/lib/cities';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured. Please set OPENWEATHER_API_KEY in .env' },
      { status: 500 }
    );
  }

  const cityParam = request.nextUrl.searchParams.get('city');
  const city = getCityById(cityParam ?? DEFAULT_CITY_ID);
  if (!city) {
    return NextResponse.json(
      { error: `Unknown city: ${cityParam}` },
      { status: 400 }
    );
  }

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
