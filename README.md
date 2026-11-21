# Dallas Weather Dashboard

A Next.js application that displays real-time weather information for Dallas, Texas with the ability to save and view historical weather data.

*Last updated: 2024-12-19 by Forge*

## Features

- **Real-time Weather Data**: Fetches current weather conditions for Dallas, TX using OpenWeatherMap API
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

Fetches current weather data for Dallas, TX from OpenWeatherMap.

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

## Usage

1. **View Current Weather**: The dashboard automatically loads current weather on page load
2. **Refresh Weather**: Click "Refresh Weather" to fetch the latest data
3. **Save Weather**: Click "Save Current Weather" to store the current snapshot
4. **View History**: Click "Show History" to display all saved weather records

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

This application is a simple weather dashboard that shows you the current weather in Dallas, Texas. It has two main features:

1. **View Current Weather**: When you open the application, it automatically shows you the current weather conditions in Dallas, including temperature, humidity, wind speed, and more.

2. **Save Weather History**: You can save the current weather data by clicking a button, and then view all your saved weather records later. This helps you track weather changes over time.

### How to Use the Application

#### Getting Started

1. **Open the Application**: After installation (which a technical person can help with), open your web browser and go to `http://localhost:3000`

2. **View Current Weather**: The main page shows a weather card with the current conditions in Dallas

3. **Refresh Weather**: Click the "Refresh Weather" button to get the most up-to-date information

4. **Save Current Weather**: Click the "Save Current Weather" button to store the current weather data in the database

5. **View History**: Click the "Show History" button to see all previously saved weather records

#### Understanding the Data

- **Temperature**: Shown in Fahrenheit
- **Feels Like**: How the temperature actually feels due to humidity and wind
- **Humidity**: The amount of moisture in the air (percentage)
- **Pressure**: Atmospheric pressure in hPa (hectopascals)
- **Wind Speed**: How fast the wind is blowing in mph (miles per hour)
- **Description**: A text description of the current weather conditions

### Behind the Scenes (Simplified)

- The application gets weather data from OpenWeatherMap, a service that provides weather information
- When you save weather data, it's stored in a local database file called `weather.db`
- The database is just a file on the computer that stores information in an organized way
- The application is built with Next.js, which is a framework for creating web applications

### Common Questions

**Q: Where is the weather data coming from?**  
A: The data comes from OpenWeatherMap's API, which provides real-time weather information for locations worldwide.

**Q: Is my data being sent anywhere?**  
A: No, all saved weather data is stored locally on your computer in the database file. Nothing is sent to external servers except the request to get current weather.

**Q: What happens if I close the application?**  
A: Your saved weather history will still be available when you reopen the application, as it's stored in the database file.

**Q: Can I change the location from Dallas to another city?**  
A: The current version is set to Dallas only. Changing the location would require modifying the code.

PR.1 status test
