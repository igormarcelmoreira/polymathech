import {
  Chart as ChartJS,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'

import { Radar } from 'react-chartjs-2'

import styles from './RadarChart.module.css'

ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale)

export function RadarChart(props) {
  const data = {
    labels: [
      'Lógico-matemático',
      'Naturalista',
      'Musical',
      'Interpessoal',
      'Linguistica',
      'Intrapessoal',
      'Corporal',
      'Espacial',
    ],
    datasets: [
      {
        label: 'Resultado',
        data: props.data,
        backgroundColor: 'rgb(0, 0, 0)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        borderWidth: 0.3,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 99, 132, 0.2)',
        },
        angleLines: {
          color: 'rgba(255, 99, 132, 0.2)',
        },
        suggestedMin: 0,
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif',
          },
          color: 'rgb(255, 255, 255)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        bodyColor: '#fff',
        titleColor: '#fff',
        borderColor: 'rgba(255, 99, 132, 0.3)',
        borderWidth: 0.5,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 4,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  }

  return (
    <div className={styles.fundo}>
      <Radar data={data} options={options} />
    </div>
  )
}
