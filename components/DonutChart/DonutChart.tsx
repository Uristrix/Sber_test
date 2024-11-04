import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';

export const DonutChart = () => {
  const [total] = useState(215); // Общее значение
  const [encrypted] = useState(133); // Зашифровано
  const [unencrypted] = useState(82); // Не зашифровано

  const options = {
    chart: {
      type: 'pie',
      innerSize: '155',
      backgroundColor: 'transparent',
      height: 340,
      events: {
        load: function (this: Highcharts.Chart) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const chart = this;
          const centerText = `
              <tspan style="color: white; font-size: 55px; font-weight: 800; padding-bottom: 10px">${total}</tspan></br>
               <tspan style="font-size: 20px; color: #FFFFFF8F;" dy='10'>${encrypted} (+74)</tspan></br>
               <tspan style="font-size: 20px; color: #FFFFFF8F;" dy='5'>${unencrypted}</tspan>
            `;
          chart.renderer
            .label(
              centerText,
              chart.plotWidth / 2 - 40,
              chart.plotTop + chart.plotHeight / 2 - 60,
            )
            .css({})
            .attr({
              zIndex: 1,
            })
            .add();
        },
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: {point.y}',
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: '20px',
        color: '#FFFFFFF5',
      },
      itemHoverStyle: {
        color: '#FFFFFFF5',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        borderRadius: 0,
        borderWidth: 0,
        startAngle: 159,
        minSize: 340,
        allowPointSelect: false,
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: {
          enable: true,
          distance: 50,
          padding: 0,
          connectorPadding: 10,
          connectorColor: 'rgba(255, 255, 255, 0.96)',
          connectorWidth: 2,
          connectorShape: function (
            labelPosition: any,
            connectorPosition: any,
            options: any,
          ) {
            const path = (
              Highcharts as any
            ).seriesTypes.pie.prototype.pointClass.prototype.connectorShapes.crookedLine.call(
              this,
              labelPosition,
              connectorPosition,
              options,
            );

            if (labelPosition.alignment === 'right') {
              path[0][1] -= 0;
              path[1][1] -= 10;
              path[2][1] -= 20;
            } else {
              path[0][1] += 0;
              // path[1][1] += 20;
              path[2][1] += 20;
              path[3][1] += 20;
            }

            return path;
          },
          format: '{point.percentage:.0f}%',
          style: {
            fontSize: '30px',
            color: '#FFFFFFF5',
            textOutline: false,
          },
        },
      },
    },
    series: [
      {
        name: 'Влияние крипты',
        innerSize: '80%',
        data: [
          {
            name: 'Зашифровано',
            y: encrypted,
            color: '#77954D',
          },
          {
            name: 'Не зашифровано',
            y: unencrypted,
            color: '#979797',
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
