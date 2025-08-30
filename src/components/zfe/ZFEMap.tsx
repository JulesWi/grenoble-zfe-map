import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import { ZFEConfig } from './types';
import { getColorFromValue } from './utils/colorUtils';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ZFEMapProps {
  config: ZFEConfig;
  onFeatureFilter: (features: GeoJSON.Feature[]) => void;
}

export const ZFEMap: React.FC<ZFEMapProps> = ({ config, onFeatureFilter }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([45.188529, 5.724524], 12);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add other base maps
    const baseMaps = {
      'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      'Carto Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png')
    };

    L.control.layers(baseMaps).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !config.geojsonData) return;

    // Remove existing layer
    if (geoJsonLayerRef.current) {
      mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
    }

    // Add new GeoJSON layer
    const geoJsonLayer = L.geoJSON(config.geojsonData, {
      style: (feature) => {
        const value = feature?.properties?.[config.currentIndex] || 0;
        return {
          fillColor: getColorFromValue(value),
          weight: 0.5,
          opacity: 0.8,
          color: '#fff',
          fillOpacity: 0.7
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          let content = '<div class="max-h-64 overflow-y-auto"><h4 class="font-bold mb-2">📍 Informations du carreau</h4>';
          
          // Show current index value
          const currentValue = feature.properties[config.currentIndex] || 0;
          content += `<p class="mb-2"><strong>Valeur actuelle (${config.currentIndex})</strong>: ${currentValue.toFixed(3)}</p>`;
          
          content += '</div>';
          
          layer.bindPopup(content, { maxWidth: 400 }).openPopup();
        });
      }
    }).addTo(mapInstanceRef.current);

    geoJsonLayerRef.current = geoJsonLayer;

    // Fit bounds to data
    mapInstanceRef.current.fitBounds(geoJsonLayer.getBounds());
  }, [config.geojsonData, config.currentIndex]);

  return (
    <div className="flex-1 relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-[1000] min-w-48">
        <div className="font-bold mb-3 text-sm text-slate-700">
          {config.currentIndex} - Légende
        </div>
        <div className="h-5 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded mb-2"></div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>0.0 (Faible)</span>
          <span>0.5</span>
          <span>1.0 (Élevé)</span>
        </div>
      </div>
    </div>
  );
};