// Non-finite input (NaN, Infinity) is not specially handled; it follows toFixed defaults.
export function formatTemperature(celsius: number): string {
  const formatted = celsius.toFixed(1);
  return `${formatted === '-0.0' ? '0.0' : formatted}°C`;
}

// Non-finite input (NaN, Infinity) is not specially handled.
export function formatHumidity(percent: number): string {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  return `${clamped}%`;
}
