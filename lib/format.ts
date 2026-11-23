// Non-finite input (NaN, Infinity) is not specially handled; it follows toFixed defaults.
export function formatTemperature(celsius: number): string {
  const formatted = celsius.toFixed(1);
  return `${formatted === '-0.0' ? '0.0' : formatted}°C`;
}

// Non-finite input (NaN, Infinity) is not specially handled; it is formatted as-is.
export function formatWindSpeed(mps: number): string {
  return `${Math.round(mps * 3.6)} km/h`;
}
