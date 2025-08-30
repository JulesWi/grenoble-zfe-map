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
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          Points d'intérêt visibles
        </h3>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
          Statistiques démographiques
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 mr-2">👥</span>
            Ménages
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 mr-2">👥</span>
            Ménages précaires
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 mr-2">👤</span>
            Individus
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="w-4 h-4 mr-2">💰</span>
            Niveau de vie médian
          </div>
        </div>
      </div>
      
      <div>
        {Object.entries(variableGroups).map(([groupName, variables]) => {
          const isExpanded = expandedGroups.includes(groupName);
          
          return (
            <div key={groupName} className="border-b border-gray-100">
              <button
                onClick={() => toggleGroup(groupName)}
                className="w-full p-4 hover:bg-gray-50 flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-sm text-gray-700">{groupName}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="bg-gray-50">
                  {variables.map((variable) => {
                    const mean = calculateMean(config.currentFeatures!, variable.key);
                    const meanNorm = calculateMean(config.currentFeatures!, variable.key + '_n');
                    
                    return (
                      <div key={variable.key} className="px-4 py-2 border-b border-gray-100 hover:bg-white flex justify-between items-center text-sm">
                        <div className="font-medium text-gray-700">{variable.label}</div>
                        <div className="text-right text-xs">
                          <div className="text-blue-600 font-semibold">{mean.toFixed(2)}</div>
                          <div className="text-gray-500">n: {meanNorm.toFixed(3)}</div>
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