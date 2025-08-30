import React from 'react';

export const ZFEHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ZFE</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Zone à Faibles Émissions - Grenoble Métropole</h1>
            <p className="text-sm text-gray-600">Observatoire cartographique multicritère</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            À propos
          </button>
          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Rapport PDF
          </button>
        </div>
      </div>
    </header>
  );
};