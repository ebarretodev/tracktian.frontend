import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
highchartsMore(Highcharts);
solidGauge(Highcharts);


const SolidChart = (props) => {
  const { data } = props
  const [chartOptions, setChartOptions] = useState({
    chart:{
      type:'solidgauge'
    },
    title: 'Teste',
    pane: {
      center: ['50%', '50%'],

      startAngle: -135,
      endAngle: 135,
      background: {
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
      }
    },
    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },
    yAxis: {
      stops: [
        [0.4, '#DF5353'], // red
        [0.7  , '#DDDF0D'], // yellow
        [0.9, '#55BF3B'] // green
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      visible: false,
      tickAmount: 0,
      min: 0,
      max: 100,
      title: {
        text: '',
        y: -70
      },
      labels: {

        y: 16
      }
  },
  plotOptions: {
    solidgauge: {
        dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,

        },
        labels: {
          enabled: false
        }
    }
},

    series: [{
      name: 'Health',
      dataLabels: {
        format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}%</span><br/>' +
            '</div>'
    },
    tooltip: {
        valueSuffix: '%'
    },
      type: 'solidgauge',
       data: [0]
      }],
      credits: {
        enabled: false
    },
  });


  const updateSeries = (data) => {
    setChartOptions({
      series: [
          {
            type: 'solidgauge',
            data: [data]}
        ]
    });
  }

    useEffect(()=>{
      updateSeries(data)
    }, [data])

  return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
}

export default SolidChart