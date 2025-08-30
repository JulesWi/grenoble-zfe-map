import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ZFEKPICards } from './ZFEKPICards';
import { ZFERadarChart } from './ZFERadarChart';
import { ZFEHistogram } from './ZFEHistogram';
import { ZFEIndicesList } from './ZFEIndicesList';
import { ZFEConfig } from './types';
import { indices } from './constants';

interface ZFEDashboardProps {
  config: ZFEConfig;
  onIndexChange: (index: string) => void;
}

export const ZFEDashboard: React.FC<ZFEDashboardProps> = ({ config, onIndexChange }) => {
  if (!config.currentFeatures) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Tableau de bord</h3>
        <p className="text-sm text-gray-600 mt-1">Niveau de zoom : 12</p>
      </div>

      {/* Distribution des équipements */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span className="w-4 h-4 mr-2">📊</span>
          Distribution des équipements
        </h4>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Densité par zone</span>
          <button className="text-blue-600 hover:text-blue-800">↗</button>
        </div>
      </div>

      {/* Indices de mobilité */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <span className="w-4 h-4 mr-2">🚗</span>
          Indices de mobilité
        </h4>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-xs text-blue-600 mb-1">IMD1</div>
            <div className="text-sm font-semibold text-blue-800">-</div>
            <div className="text-xs text-gray-500">Places vélos/ménage</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-xs text-red-600 mb-1">IMF1</div>
            <div className="text-sm font-semibold text-red-800">-</div>
            <div className="text-xs text-gray-500">Ménages précaires/total</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-xs text-green-600 mb-1">ITF1</div>
            <div className="text-sm font-semibold text-green-800">-</div>
            <div className="text-xs text-gray-500">Arrêts/habitant</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-xs text-purple-600 mb-1">IDV2</div>
            <div className="text-sm font-semibold text-purple-800">-</div>
            <div className="text-xs text-gray-500">Bornes/parking</div>
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <div className="text-xs text-gray-600 mb-1">IGEM</div>
          <div className="text-sm font-semibold text-gray-800">-</div>
        </div>
      </div>

      {/* Vue radar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900">Vue radar</h4>
          <span className="text-xs text-gray-500">Évolution temps réel</span>
        </div>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500">Indice global et évolution</div>
        </div>
      </div>

      {/* Index Selector */}
      <div className="p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Indice à afficher :
        </label>
        <Select value={config.currentIndex} onValueChange={onIndexChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(indices).map(([key, label]) => (
              <SelectItem key={key + '_n'} value={key + '_n'}>
                {key} - {label} (norm.)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <ZFEKPICards config={config} />

      {/* Charts */}
      <Card className="m-4 rounded-lg border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Radar des Indices</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ZFERadarChart config={config} />
        </CardContent>
      </Card>

      <Card className="m-4 rounded-lg border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ZFEHistogram config={config} />
        </CardContent>
      </Card>

      <ZFEIndicesList config={config} />
    </div>
  );
};