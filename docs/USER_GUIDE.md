# Dallas Weather Dashboard - Visual Guide

This guide provides a visual walkthrough of the Dallas Weather Dashboard application.

## Main Dashboard

When you first open the application, you'll see the main dashboard that looks like this:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│           Dallas Weather Dashboard                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │                                             │    │
│  │  Dallas                       [WEATHER ICON]│    │
│  │  Partly Cloudy                             │    │
│  │                                             │    │
│  │  75°F                                       │    │
│  │  Feels like 73°F                            │    │
│  │                                             │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  │Humidity │  │Wind     │  │Pressure │  │Temp     │ │
│  │  │65%      │  │8.5 mph  │  │1013 hPa │  │75°F     │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘ │
│  │                                             │    │
│  │  Last updated: 10/8/2025, 8:27:02 AM       │    │
│  │                                             │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  [Refresh Weather] [Save Current Weather] [Show History] │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Button Functions

### 1. Refresh Weather Button

Click this button to get the most up-to-date weather information for Dallas.

### 2. Save Current Weather Button

Click this button to save the current weather data to your local database. When you click it:

1. The current weather data is stored in the database
2. A success message appears briefly: "Weather data saved successfully!"

### 3. Show History Button

Click this button to view all previously saved weather records. When you click it, a table appears below the buttons:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                  Weather History                    │
│                                                     │
├────────────┬─────────┬──────────┬────────┬─────────┬───────────┤
│ Date & Time│ Temp    │ Feels Like│ Humidity│ Wind   │ Description│
├────────────┼─────────┼──────────┼────────┼─────────┼───────────┤
│ 10/8/2025, │ 75°F    │ 73°F     │ 65%    │ 8.5 mph │ partly     │
│ 8:27:02 AM │         │          │        │         │ cloudy     │
├────────────┼─────────┼──────────┼────────┼─────────┼───────────┤
│ 10/7/2025, │ 72°F    │ 70°F     │ 68%    │ 6.2 mph │ clear sky  │
│ 5:16:33 PM │         │          │        │         │            │
└────────────┴─────────┴──────────┴────────┴─────────┴───────────┘
```

Click the "Show History" button again to hide the history table.

## Understanding Weather Data

### Temperature
The current temperature in Fahrenheit. In the example above, it's 75°F.

### Feels Like
How the temperature actually feels due to factors like humidity and wind. In the example above, it feels like 73°F.

### Humidity
The amount of moisture in the air, shown as a percentage. In the example above, it's 65%.

### Wind Speed
How fast the wind is blowing, measured in miles per hour (mph). In the example above, it's 8.5 mph.

### Pressure
Atmospheric pressure measured in hectopascals (hPa). In the example above, it's 1013 hPa.

### Description
A text description of the current weather conditions. In the example above, it's "partly cloudy".

## Troubleshooting

### No Weather Data Appears
If you don't see any weather data when you open the application:
1. Check your internet connection
2. Click the "Refresh Weather" button
3. Ask a technical person to check if the API key is set up correctly

### Can't Save Weather Data
If you click "Save Current Weather" but nothing happens:
1. Make sure you have weather data displayed first
2. Ask a technical person to check if the database is working correctly
