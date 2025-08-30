import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ZFEConfig } from './types';
import { indices } from './constants';
import { calculateMean } from './utils/calculations';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ZFERadarChartProps {
  config: ZFEConfig;
}

export const ZFERadarChart: React.FC<ZFERadarChartProps> = ({ config }) => {
  if (!config.currentFeatures) return null;

  const data = Object.keys(indices).map(indexKey => 
    calculateMean(config.currentFeatures!, indexKey + '_n')
  );

  const chartData = {
    labels: Object.keys(indices),
    datasets: [{
      label: 'Moyennes des indices',
      data: data,
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      borderColor: 'rgba(52, 152, 219, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(52, 152, 219, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 0.2
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="h-48">
      <Radar data={chartData} options={options} />
    </div>
  );
};