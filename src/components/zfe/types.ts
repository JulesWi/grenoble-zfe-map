export interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSON.Feature[];
}

export interface ZFEConfig {
  currentIndex: string;
  geojsonData: GeoJSONData | null;
  currentFeatures: GeoJSON.Feature[] | null;
}

export interface VariableGroup {
  [key: string]: {
    key: string;
    label: string;
  }[];
}

export interface IndicesMap {
  [key: string]: string;
}

export interface KPIData {
  count: number;
  mean: number;
  p90: number;
  std: number;
}