import React from 'react';

export const ZFEHeader: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">🌍 ZFE Grenoble - Observatoire Cartographique</h1>
        <p className="text-sm opacity-90">Zone à Faibles Émissions - Analyse multicritère par carroyage 200m × 200m</p>
      </div>
    </header>
  );
};