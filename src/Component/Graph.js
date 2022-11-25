import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = (data0,data1,data2,name1,name2) =>{
  const data ={
    labels:data0,
    datasets: [{
      data:data1,
      backgroundColor:'transparent',
      borderColor:'#cc3333',
      pointBorderColor:'transparent',
      label: name1,
      borderWidth: 4,
      pointStyle: 'rectRot',
      pointRadius: 5,
      fill: false,
      pointBorderColor: '#cc3333'
      
    },{
      data:data2,
      backgroundColor:'transparent',
      borderColor:'#cc3',
      pointBorderColor:'transparent',
      label: name2,
      borderWidth: 4,
      pointStyle: 'rectRot',
      pointRadius: 5,
      fill: false,
      pointBorderColor: '#cc3'
    }]
  }
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      }
    }
  };

    return (
      <div>
         <Line data={data} options = {options} ></Line>
      </div>
    )

}
export {Graph};