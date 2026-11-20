// Non-finite input (NaN, Infinity) is not specially handled; it follows toFixed defaults.
export function formatTemperature(celsius: number): string {
  const formatted = celsius.toFixed(1);
  return `${formatted === '-0.0' ? '0.0' : formatted}°C`;
}

const MPS_TO_MPH = 2.236936;

// Non-finite input (NaN, Infinity) is not specially handled. Math.round(-0.x) is -0,
// which a template string prints as "0", so no negative-zero special case is needed.
export function formatWindSpeed(mps: number): string {
  return `${Math.round(mps * MPS_TO_MPH)} mph`;
}
