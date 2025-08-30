export function getColorFromValue(value: number): string {
  const colors = ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#e74c3c'];
  const normalizedValue = Math.max(0, Math.min(1, value)); // Clamp between 0 and 1
  const index = Math.floor(normalizedValue * (colors.length - 1));
  return colors[Math.min(index, colors.length - 1)];
}