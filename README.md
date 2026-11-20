# Weather Dashboard

A Next.js application that displays real-time weather information for multiple US cities with the ability to save and view historical weather data.

*Last updated: 2024-12-19 by Forge*

## Features

- **Real-time Weather Data**: Fetches current weather conditions for multiple US cities using OpenWeatherMap API
- **City Selector**: Choose from Dallas (Texas), St. Louis (Missouri), and Chicago (Illinois) to view weather for different cities
- **Beautiful UI**: Modern, responsive design with Tailwind CSS and Lucide icons
- **Save Weather Data**: Store current weather snapshots to a local database
- **Historical Data**: View all previously saved weather records in a table format
- **SQLite Database**: Local SQLite database for persistent storage

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Database**: SQLite (better-sqlite3)
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (free tier available)

## Getting Started

```bash
npm install
cp .env.example .env   # then set OPENWEATHER_API_KEY in .env
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). See [Setup Instructions](#setup-instructions) below for details.

## Setup Instructions

> **Note for Non-Technical Users**: See the simplified [INSTALLATION.md](./docs/INSTALLATION.md) guide in the docs folder.

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```
OPENWEATHER_API_KEY=your_api_key_here
```

**Get a free API key**: Visit [https://openweathermap.org/api](https://openweathermap.org/api) and sign up for a free account.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
weather-app/
├── app/
│   ├── api/
│   │   └── weather/
│   │       ├── current/route.ts    # Fetches current weather from API
│   │       └── history/route.ts    # Manages saved weather data
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Main dashboard page
├── components/
│   ├── WeatherCard.tsx             # Displays current weather
│   └── HistoryTable.tsx            # Shows historical data
├── lib/
│   ├── cities.ts                   # City configuration and coordinates
│   ├── types.ts                    # TypeScript interfaces
│   └── datasources/
│       ├── index.ts                # Data source factory
│       └── sqlite-datasource.ts    # SQLite implementation
└── package.json
```

## Database Storage

The application uses SQLite for local data storage. The database file `weather.db` is created automatically in the project root when you first save weather data or view history.

### Create Your Own Data Source

Implement the `WeatherDataSource` interface:

```typescript
export interface WeatherDataSource {
  save(data: Omit<WeatherData, "id">): Promise<void>;
  getAll(): Promise<WeatherData[]>;
  getById(id: number): Promise<WeatherData | null>;
  deleteById(id: number): Promise<void>;
}
```

Examples:

- PostgreSQL/MySQL database
- MongoDB
- Cloud storage (AWS S3, Google Cloud Storage)
- External API

To implement a new data source, create a class that implements the `WeatherDataSource` interface and update the `getDataSource()` function in `lib/datasources/index.ts`.

## API Routes

### GET `/api/weather/current`

Fetches current weather data from OpenWeatherMap. Supports multiple cities via query parameter.

**Query Parameters:**
- `city` (optional): The city name to fetch weather for. Defaults to "Dallas". Supported values: "Dallas", "St. Louis", "Chicago"

**Examples:**
- `/api/weather/current` - Returns Dallas weather
- `/api/weather/current?city=St. Louis` - Returns St. Louis weather
- `/api/weather/current?city=Chicago` - Returns Chicago weather

**Response:**

```json
{
  "temperature": 75.2,
  "feelsLike": 73.8,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 8.5,
  "description": "partly cloudy",
  "icon": "02d",
  "city": "Dallas",
  "timestamp": "2025-10-07T22:16:33.000Z"
}
```

**Error Response (unsupported city):**

```json
{
  "error": "City not supported: InvalidCity"
}
```

### GET `/api/weather/history`

Retrieves all saved weather records from the database.

**Response:**

```json
[
  {
    "id": 1,
    "temperature": 75.2,
    "feelsLike": 73.8,
    "humidity": 65,
    "pressure": 1013,
    "windSpeed": 8.5,
    "description": "partly cloudy",
    "icon": "02d",
    "city": "Dallas",
    "timestamp": "2025-10-07T22:16:33.000Z"
  },
  {
    "id": 2,
    "temperature": 68.5,
    "feelsLike": 67.2,
    "humidity": 70,
    "pressure": 1015,
    "windSpeed": 6.3,
    "description": "cloudy",
    "icon": "04d",
    "city": "St. Louis",
    "timestamp": "2025-10-07T23:20:15.000Z"
  }
]
```

### POST `/api/weather/history`

Saves weather data to the database.

**Request Body:**

```json
{
  "temperature": 75.2,
  "feelsLike": 73.8,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 8.5,
  "description": "partly cloudy",
  "icon": "02d",
  "city": "Dallas",
  "timestamp": "2025-10-07T22:16:33.000Z"
}
```

## Supported Cities

The application currently supports weather data for the following US cities:

| City | State | Coordinates |
|------|-------|------------|
| Dallas | Texas | 32.7767°N, 96.7970°W |
| St. Louis | Missouri | 38.6270°N, 90.1994°W |
| Chicago | Illinois | 41.8781°N, 87.6298°W |

To add more cities, edit `lib/cities.ts` and add new entries to the `SUPPORTED_CITIES` object.

## Usage

1. **Select a City**: Use the city selector dropdown at the top of the dashboard to choose which city's weather you want to view
2. **View Current Weather**: The dashboard automatically loads current weather on page load for the selected city
3. **Refresh Weather**: Click "Refresh Weather" to fetch the latest data for the selected city
4. **Save Weather**: Click "Save Current Weather" to store the current snapshot (including the city name)
5. **View History**: Click "Show History" to display all saved weather records from all cities

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### API Key Error

If you see "API key not configured", ensure:

- `.env` file exists in the project root
- `OPENWEATHER_API_KEY` is set correctly
- Restart the development server after creating/modifying `.env`

### City Not Supported Error

If you receive "City not supported" error:

- Make sure you're using the exact city name (case-sensitive)
- Verify the city is in the list of supported cities
- Check the query parameter syntax: `/api/weather/current?city=Dallas`

### Database Issues

If you encounter database errors:

- Delete `weather.db` file and restart the server

### Build Errors

If you get TypeScript errors during build:

```bash
rm -rf .next
npm run build
```

## User Guide for Non-Technical Users

> **Note**: For a more detailed visual guide with illustrations, see [USER_GUIDE.md](./docs/USER_GUIDE.md) in the docs folder.

### What This Application Does

This application is a weather dashboard that shows you the current weather in multiple US cities: Dallas, St. Louis, and Chicago. It has two main features:

1. **View Current Weather**: When you open the application, it shows you the current weather conditions in Dallas by default. You can select a different city using the city selector dropdown at the top to view weather for that city instead.

2. **Save Weather History**: You can save the current weather data by clicking a button, and then view all your saved weather records later. This helps you track weather changes over time and across different cities.

### How to Use the Application

#### Getting Started

1. **Open the Application**: After installation (which a technical person can help with), open your web browser and go to `http://localhost:3000`

2. **Select a City**: At the top of the page, you'll see a dropdown menu labeled "Select City". Click on it and choose from Dallas, St. Louis, or Chicago

3. **View Current Weather**: The weather card shows the current conditions for the selected city, including temperature, humidity, wind speed, and more

4. **Refresh Weather**: Click the "Refresh Weather" button to get the most up-to-date information for the selected city

5. **Save Current Weather**: Click the "Save Current Weather" button to store the current weather data (including which city it's for) in the database

6. **View History**: Click the "Show History" button to see all previously saved weather records from all cities

#### Understanding the Data

- **Temperature**: Shown in Fahrenheit
- **Feels Like**: How the temperature actually feels due to humidity and wind
- **Humidity**: The amount of moisture in the air (percentage)
- **Pressure**: Atmospheric pressure in hPa (hectopascals)
- **Wind Speed**: How fast the wind is blowing in mph (miles per hour)
- **Description**: A text description of the current weather conditions

### Behind the Scenes (Simplified)

- The application gets weather data from OpenWeatherMap, a service that provides weather information for locations worldwide
- When you save weather data, it's stored in a local database file called `weather.db`
- The database is just a file on the computer that stores information in an organized way
- The application is built with Next.js, which is a framework for creating web applications
- The city coordinates are stored in the application and used to request weather data for each city

### Common Questions

**Q: Where is the weather data coming from?**  
A: The data comes from OpenWeatherMap's API, which provides real-time weather information for locations worldwide.

**Q: Is my data being sent anywhere?**  
A: No, all saved weather data is stored locally on your computer in the database file. Nothing is sent to external servers except the request to get current weather from OpenWeatherMap.

**Q: What happens if I close the application?**  
A: Your saved weather history will still be available when you reopen the application, as it's stored in the database file.

**Q: Can I change the location to view weather for different cities?**  
A: Yes! Use the city selector dropdown at the top of the page to choose from Dallas, St. Louis, or Chicago. You can also save weather snapshots from multiple cities and view them all together in the history.

**Q: Can I add more cities?**  
A: A technical developer can add more cities by editing the `lib/cities.ts` file and adding the city's coordinates.
