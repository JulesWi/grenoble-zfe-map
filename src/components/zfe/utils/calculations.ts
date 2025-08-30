export function calculateMean(features: GeoJSON.Feature[], property: string): number {
  const values = features.map(f => f.properties?.[property] || 0);
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function calculatePercentile(features: GeoJSON.Feature[], property: string, percentile: number): number {
  const values = features.map(f => f.properties?.[property] || 0).sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * values.length) - 1;
  return values[index] || 0;
}

export function calculateStd(features: GeoJSON.Feature[], property: string): number {
  const values = features.map(f => f.properties?.[property] || 0);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

export function createHistogramBins(values: number[], numBins: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / numBins;
  
  const bins = Array(numBins).fill(0);
  const labels = [];
  
  for (let i = 0; i < numBins; i++) {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    labels.push(`${binStart.toFixed(2)}-${binEnd.toFixed(2)}`);
  }
  
  values.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), numBins - 1);
    bins[binIndex]++;
  });
  
  return { bins, labels };
}