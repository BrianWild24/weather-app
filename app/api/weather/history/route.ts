// Weather history API: GET returns all saved weather records, POST validates and saves a new record.
import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/datasources';

export async function GET(request: NextRequest) {
  try {
    const dataSource = getDataSource();
    const history = await dataSource.getAll();
    
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching weather history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'temperature', 'feelsLike', 'humidity', 'pressure', 
      'windSpeed', 'description', 'icon', 'city', 'timestamp'
    ];
    
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const dataSource = getDataSource();
    await dataSource.save(body);
    
    return NextResponse.json({ success: true, message: 'Weather data saved' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    return NextResponse.json(
      { error: 'Failed to save weather data' },
      { status: 500 }
    );
  }
}
