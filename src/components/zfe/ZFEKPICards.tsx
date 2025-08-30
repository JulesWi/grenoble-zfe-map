import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ZFEConfig } from './types';
import { calculateMean, calculatePercentile, calculateStd } from './utils/calculations';

interface ZFEKPICardsProps {
  config: ZFEConfig;
}

export const ZFEKPICards: React.FC<ZFEKPICardsProps> = ({ config }) => {
  if (!config.currentFeatures) return null;

  const count = config.currentFeatures.length;
  const mean = calculateMean(config.currentFeatures, config.currentIndex);
  const p90 = calculatePercentile(config.currentFeatures, config.currentIndex, 90);
  const std = calculateStd(config.currentFeatures, config.currentIndex);

  const kpis = [
    { label: 'Carreaux', value: count.toString() },
    { label: 'Moyenne', value: mean.toFixed(3) },
    { label: 'Percentile 90', value: p90.toFixed(3) },
    { label: 'Écart-type', value: std.toFixed(3) }
  ];

  return (
    <div className="p-4">
      <h4 className="text-base font-semibold mb-3 text-slate-700">🎯 Indicateurs Clés</h4>
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-slate-50 border-l-4 border-l-blue-500">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">{kpi.value}</div>
              <div className="text-xs text-slate-600 uppercase">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};