# Installation Guide for Non-Technical Users

This guide will help you or your technical assistant set up the Dallas Weather Dashboard application on your computer.

## Prerequisites

Before you begin, make sure you have:

1. **Node.js** installed on your computer (version 18 or higher)
2. **An OpenWeatherMap API key** (free to obtain)

If you don't have these, ask a technical person to help you set them up.

## Step-by-Step Installation

### 1. Download the Application

If you received this application as a ZIP file:
1. Extract the ZIP file to a folder on your computer
2. Open a terminal or command prompt
3. Navigate to the folder where you extracted the files

If you're getting the application from GitHub:
1. Clone the repository using:
   ```
   git clone https://github.com/BrianWild24/dallas-weather-dashboard.git
   ```
   (Replace with the actual repository URL)
2. Navigate to the project folder:
   ```
   cd dallas-weather-dashboard
   ```

### 2. Set Up the API Key

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. After signing up, get your API key from your account dashboard
3. In the project folder, create a file named `.env` (with the dot at the beginning)
4. Open the file in a text editor and add this line:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with the actual API key you received

### 3. Install Dependencies

In the terminal or command prompt, run:

```
npm install
```

This will install all the necessary packages for the application to work.

### 4. Start the Application

Once the installation is complete, start the application by running:

```
npm run dev
```

### 5. Access the Application

Open your web browser and go to:

```
http://localhost:3000
```

You should now see the Dallas Weather Dashboard!

## Troubleshooting

### "API key not configured" Error

If you see this error:
1. Make sure you created the `.env` file correctly
2. Check that you copied the API key correctly
3. Restart the application after making changes to the `.env` file

### "Cannot find module" Error

If you see this error:
1. Make sure you ran `npm install` successfully
2. Try running `npm install` again

### Other Issues

If you encounter any other issues, please contact the technical support person who provided you with this application.
