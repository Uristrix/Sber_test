import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Sankey from 'highcharts/modules/sankey';
import { useState } from 'react';

Sankey(Highcharts);

export const SankeyDiagram = () => {
  const [data] = useState([
    {
      from: 'Медведи',
      to: 'Мёд',
      weight: 40,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(151, 151, 151, 0.85)'],
          [1, 'rgba(139, 117, 186, 0.85)'],
        ],
      },
    },
    {
      from: 'Медведи',
      to: 'Малина',
      weight: 10,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(151, 151, 151, 0.85)'],
          [1, 'rgba(221, 175, 211, 0.85)'],
        ],
      },
    },
    {
      from: 'Медведи',
      to: 'Яблоки',
      weight: 15,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(151, 151, 151, 0.85)'],
          [1, 'rgba(126, 184, 191, 0.85)'],
        ],
      },
    },
    {
      from: 'Ежи',
      to: 'Мёд',
      weight: 10,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(119, 149, 77, 0.85)'],
          [1, 'rgba(139, 117, 186, 0.85)'],
        ],
      },
    },
    {
      from: 'Ежи',
      to: 'Малина',
      weight: 10,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(119, 149, 77, 0.85)'],
          [1, 'rgba(221, 175, 211, 0.85)'],
        ],
      },
    },
    {
      from: 'Ежи',
      to: 'Яблоки',
      weight: 15,
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
          [0, 'rgba(119, 149, 77, 0.85)'],
          [1, 'rgba(126, 184, 191, 0.85)'],
        ],
      },
    },
  ]);

  // Вычисление суммы весов
  const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);

  // Функция для получения процента, округленного до целого
  const getPercentage = (weight: number) =>
    Math.round((weight / totalWeight) * 100) + '%';

  // Подсчет веса для каждого узла
  const weights = data.reduce((acc: Record<string, number>, item) => {
    acc[item.from] = (acc[item.from] || 0) + item.weight;
    acc[item.to] = (acc[item.to] || 0) + item.weight;
    return acc;
  }, {});

  const options = {
    chart: {
      type: 'sankey',
      backgroundColor: '#242427',
      height: 350,
      marginTop: 50,
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      sankey: {
        //linkOpacity: 0.85,
        // linkColorMode: 'gradient',
        dataLabels: {
          enabled: true,
          //format: '{point.name}<br>{point.weight:.0f}%', // можно из node вынести
          style: {
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 500,
            textOutline: 'none',
          },
        },
        states: {
          inactive: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        keys: ['from', 'to', 'weight', 'color'],
        type: 'sankey',
        data: data,
        nodes: [
          {
            id: 'Медведи',
            color: 'rgba(151, 151, 151, 1)',
            dataLabels: {
              enabled: true,
              format: `Медведи<br>${getPercentage(weights['Медведи'])}`,
            },
          },
          {
            id: 'Ежи',
            color: 'rgba(119, 149, 77, 1)',
            dataLabels: {
              enabled: true,
              format: `Ежи<br>${getPercentage(weights['Ежи'])}`,
            },
          },
          {
            id: 'Мёд',
            color: 'rgba(139, 117, 186, 1)',
            dataLabels: {
              enabled: true,
              format: `Мёд<br><tspan>${getPercentage(weights['Мёд'])}</tspan>`,
            },
          },
          {
            id: 'Малина',
            color: 'rgba(221, 175, 211, 1)',
            dataLabels: {
              enabled: true,
              format: `Малина<br><tspan dx=30>${getPercentage(weights['Малина'])}</tspan>`,
            },
          },
          {
            id: 'Яблоки',
            color: 'rgba(126, 184, 191, 1)',
            dataLabels: {
              enabled: true,
              format: `Яблоки<br><tspan dx='25'>${getPercentage(weights['Яблоки'])}</tspan>`,
            },
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
