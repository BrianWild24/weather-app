// Formatting helpers for displaying weather values (currently temperature in °C).
// Non-finite input (NaN, Infinity) is not specially handled; it follows toFixed defaults.
export function formatTemperature(celsius: number): string {
  const formatted = celsius.toFixed(1);
  return `${formatted === '-0.0' ? '0.0' : formatted}°C`;
}
