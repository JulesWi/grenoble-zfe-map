import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ZFEConfig } from './types';
import { createHistogramBins } from './utils/calculations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ZFEHistogramProps {
  config: ZFEConfig;
}

export const ZFEHistogram: React.FC<ZFEHistogramProps> = ({ config }) => {
  if (!config.currentFeatures) return null;

  const values = config.currentFeatures.map(f => f.properties?.[config.currentIndex] || 0);
  const { bins, labels } = createHistogramBins(values, 10);

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Fréquence',
      data: bins,
      backgroundColor: 'rgba(52, 152, 219, 0.6)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="h-48">
      <Bar data={chartData} options={options} />
    </div>
  );
};