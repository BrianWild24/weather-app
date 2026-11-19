import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { buildDailyForecast } from '@/lib/forecast';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const DALLAS_COORDS = { lat: 32.7767, lon: -96.7970 };

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured. Please set OPENWEATHER_API_KEY in .env' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat: DALLAS_COORDS.lat,
          lon: DALLAS_COORDS.lon,
          appid: OPENWEATHER_API_KEY,
          units: 'imperial', // Fahrenheit
        },
      }
    );

    const data = response.data;
    const forecast = buildDailyForecast(data.list, data.city?.timezone ?? 0);

    return NextResponse.json(forecast);
  } catch (error) {
    console.error('Error fetching forecast data:', error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: `Weather API error: ${error.response?.data?.message || error.message}` },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch forecast data' },
      { status: 500 }
    );
  }
}
