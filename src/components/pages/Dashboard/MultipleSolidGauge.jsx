import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
 });

 Highcharts.setOptions({
  colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
      return {
          radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
          },
          stops: [
              [0, color],
              [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
          ]
      };
  })
});


const MultipleSolidGauge = (props) => {
  const { dataRun, dataStopped, dataAlert } = props
  const [chartOptions, setChartOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: null,
  tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}: </b>{point.percentage:.1f}%',
              connectorColor: 'silver'
          }
      }
  },
  series: [{
      data: [
        { name: 'Running', y: 1 },
        { name: 'Stopped', y: 1 },
        { name: 'Alerting' , y: 2 },
      ]
  }],
    credits: {
      enabled: false
  },
  });


  const updateSeries = (dataRun, dataStopped, dataAlert) => {

    setChartOptions({
      series: [{
        name: 'Quantidade',
        data: [
          { name: 'Running', y: dataRun },
          { name: 'Stopped', y: dataStopped },
          { name: 'Alerting' , y: dataAlert },
        ]
    }]
    });
  }

  useEffect(()=>{
    updateSeries(dataRun, dataStopped, dataAlert)
  }, [dataRun, dataStopped, dataAlert])


  return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
}

export default MultipleSolidGauge