import { GeoJSONData } from '../types';
import { variableGroups, indices } from '../constants';

export function generateDemoData(): GeoJSONData {
  const features: GeoJSON.Feature[] = [];
  const bounds = [[45.1, 5.7], [45.25, 5.85]]; // Approximation Grenoble
  
  for (let i = 0; i < 500; i++) {
    const lat = bounds[0][0] + (bounds[1][0] - bounds[0][0]) * Math.random();
    const lng = bounds[0][1] + (bounds[1][1] - bounds[0][1]) * Math.random();
    
    // Generate coordinates for a 200m square
    const offset = 0.0018; // Approximately 200m in degrees
    const coordinates = [[
      [lng, lat],
      [lng + offset, lat],
      [lng + offset, lat + offset],
      [lng, lat + offset],
      [lng, lat]
    ]];
    
    // Generate realistic data
    const properties: { [key: string]: number } = {};
    
    // Base variables
    Object.values(variableGroups).forEach(group => {
      group.forEach(variable => {
        const raw = Math.random() * 100;
        const normalized = Math.random();
        properties[variable.key] = raw;
        properties[variable.key + '_n'] = normalized;
      });
    });
    
    // Calculate indices (simplified version)
    Object.keys(indices).forEach(indexKey => {
      const raw = Math.random() * 10;
      const normalized = Math.random();
      properties[indexKey] = raw;
      properties[indexKey + '_n'] = normalized;
    });
    
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: coordinates
      },
      properties: properties
    });
  }
  
  return {
    type: 'FeatureCollection',
    features: features
  };
}