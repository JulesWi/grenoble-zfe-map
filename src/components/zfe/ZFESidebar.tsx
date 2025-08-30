import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ZFEConfig, VariableGroup } from './types';
import { variableGroups } from './constants';
import { calculateMean } from './utils/calculations';

interface ZFESidebarProps {
  config: ZFEConfig;
  onFeatureFilter: (features: GeoJSON.Feature[]) => void;
}

export const ZFESidebar: React.FC<ZFESidebarProps> = ({ config }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  if (!config.currentFeatures) return null;

  return (
    <div className="w-80 bg-card border-r shadow-lg overflow-y-auto">
      <div className="bg-slate-700 text-white p-4">
        <h3 className="text-lg font-semibold text-center">📊 Variables & Données</h3>
      </div>
      
      <div className="divide-y">
        {Object.entries(variableGroups).map(([groupName, variables]) => {
          const isExpanded = expandedGroups.includes(groupName);
          
          return (
            <div key={groupName} className="border-b">
              <button
                onClick={() => toggleGroup(groupName)}
                className="w-full p-3 bg-slate-200 hover:bg-slate-300 flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-slate-700">{groupName}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {isExpanded && (
                <div className="bg-card">
                  {variables.map((variable) => {
                    const mean = calculateMean(config.currentFeatures!, variable.key);
                    const meanNorm = calculateMean(config.currentFeatures!, variable.key + '_n');
                    
                    return (
                      <div key={variable.key} className="p-3 border-b border-slate-100 hover:bg-slate-50 flex justify-between items-center">
                        <div className="font-medium text-sm text-slate-700">{variable.label}</div>
                        <div className="text-right text-xs">
                          <div className="text-green-600 font-semibold">{mean.toFixed(2)}</div>
                          <div className="text-red-500 italic">n: {meanNorm.toFixed(3)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};