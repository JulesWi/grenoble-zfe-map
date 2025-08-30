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
    <div className="w-96 bg-card border-l shadow-lg overflow-y-auto">
      <div className="bg-red-600 text-white p-4">
        <h3 className="text-lg font-semibold text-center">📈 Tableau de Bord</h3>
      </div>

      {/* Index Selector */}
      <Card className="m-4 rounded-lg">
        <CardContent className="p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
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
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <ZFEKPICards config={config} />

      {/* Radar Chart */}
      <Card className="m-4 rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🎯 Radar des Indices</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ZFERadarChart config={config} />
        </CardContent>
      </Card>

      {/* Histogram */}
      <Card className="m-4 rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📊 Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ZFEHistogram config={config} />
        </CardContent>
      </Card>

      {/* Indices List */}
      <ZFEIndicesList config={config} />
    </div>
  );
};