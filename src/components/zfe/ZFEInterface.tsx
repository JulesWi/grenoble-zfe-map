import React, { useState, useCallback } from 'react';
import { ZFEHeader } from './ZFEHeader';
import { ZFESidebar } from './ZFESidebar';
import { ZFEMap } from './ZFEMap';
import { ZFEDashboard } from './ZFEDashboard';
import { generateDemoData } from './utils/dataGenerator';
import { GeoJSONData, ZFEConfig } from './types';
import 'leaflet/dist/leaflet.css';

export const ZFEInterface: React.FC = () => {
  const [config, setConfig] = useState<ZFEConfig>({
    currentIndex: 'GAI_n',
    geojsonData: null,
    currentFeatures: null
  });

  React.useEffect(() => {
    // Generate demo data on component mount
    const data = generateDemoData();
    setConfig(prev => ({
      ...prev,
      geojsonData: data,
      currentFeatures: data.features
    }));
  }, []);

  const handleIndexChange = useCallback((newIndex: string) => {
    setConfig(prev => ({ ...prev, currentIndex: newIndex }));
  }, []);

  const handleFeatureFilter = useCallback((filteredFeatures: GeoJSON.Feature[]) => {
    setConfig(prev => ({ ...prev, currentFeatures: filteredFeatures }));
  }, []);

  if (!config.geojsonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données ZFE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <ZFEHeader />
      <div className="flex h-[calc(100vh-88px)]">
        <ZFESidebar 
          config={config}
          onFeatureFilter={handleFeatureFilter}
        />
        <ZFEMap 
          config={config}
          onFeatureFilter={handleFeatureFilter}
        />
        <ZFEDashboard 
          config={config}
          onIndexChange={handleIndexChange}
        />
      </div>
    </div>
  );
};