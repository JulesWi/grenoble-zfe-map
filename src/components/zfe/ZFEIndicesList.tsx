import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZFEConfig } from './types';
import { indices } from './constants';
import { calculateMean } from './utils/calculations';

interface ZFEIndicesListProps {
  config: ZFEConfig;
}

export const ZFEIndicesList: React.FC<ZFEIndicesListProps> = ({ config }) => {
  if (!config.currentFeatures) return null;

  return (
    <Card className="m-4 rounded-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">🔢 Tous les Indices</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {Object.entries(indices).map(([indexKey, indexLabel]) => {
            const raw = calculateMean(config.currentFeatures!, indexKey);
            const norm = calculateMean(config.currentFeatures!, indexKey + '_n');
            
            return (
              <div key={indexKey} className="p-3 hover:bg-slate-50 flex justify-between items-center">
                <div className="font-semibold text-sm text-slate-700">{indexKey} - {indexLabel}</div>
                <div className="text-right text-xs">
                  <div className="text-green-600 font-semibold">{raw.toFixed(2)}</div>
                  <div className="text-red-500 italic">n: {norm.toFixed(3)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};