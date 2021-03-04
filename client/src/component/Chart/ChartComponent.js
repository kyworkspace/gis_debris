import React from 'react'
import { Line } from 'react-chartjs-2'
  // const {data} = props;
const colorArray={
  red : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  blue : {
    backgroundColor: 'rgb(0, 0, 255)',
    borderColor : 'rgb(0, 0, 255,0.2)'
  },
  green : {
    backgroundColor: 'rgb(0, 255, 0)',
    borderColor : 'rgb(0, 255, 0,0.2)'
  },
  orange : {
    backgroundColor: 'rgb(255, 125, 0)',
    borderColor : 'rgb(255, 125, 0,0.2)'
  },
  yellow : {
    backgroundColor: 'rgb(255, 255, 0)',
    borderColor : 'rgb(255, 255, 0,0.2)'
  },
  purple : {
    backgroundColor: 'rgb(255, 0, 255)',
    borderColor : 'rgb(255, 0, 255,0.2)'
  },
  brown : {
    backgroundColor: 'rgb(165,42,42)',
    borderColor : 'rgb(165, 42, 42,0.2)'
  }

}
  

  
function ChartComponent(props) {
    const {data} = props;
    console.log(data)
    const dataList = {
      //x축 라벨 ==> 년도
        labels: data.map(item=>{return item.col_year||item.inv_year}),
        datasets: [
          {
            label: '수거량',
            data: data.map(item=>{return item.col_amount}),
            fill: false,
            backgroundColor: colorArray.red.backgroundColor,
            borderColor: colorArray.red.borderColor,
          },
          {
            label: '조사량',
            data: data.map(item=>{return item.inv_amount}),
            fill: false,
            backgroundColor: colorArray.blue.backgroundColor,
            borderColor: colorArray.blue.borderColor,
          },
          {
            label: '어망',
            data: data.map(item=>{return item.col_fishing_net}),
            fill: false,
            backgroundColor: colorArray.brown.backgroundColor,
            borderColor: colorArray.brown.borderColor,
          },
          {
            label: '고철류',
            data: data.map(item=>{return item.col_scrap}),
            fill: false,
            backgroundColor: colorArray.green.backgroundColor,
            borderColor: colorArray.green.borderColor,
          },
          {
            label: '그물',
            data: data.map(item=>{return item.col_nettrap}),
            fill: false,
            backgroundColor: colorArray.yellow.backgroundColor,
            borderColor: colorArray.yellow.borderColor,
          },
          {
            label: '로프',
            data: data.map(item=>{return item.col_rope}),
            fill: false,
            backgroundColor: colorArray.orange.backgroundColor,
            borderColor: colorArray.orange.borderColor,
          },
          {
            label: '기타',
            data: data.map(item=>{return item.col_etc}),
            fill: false,
            backgroundColor: colorArray.purple.backgroundColor,
            borderColor: colorArray.purple.borderColor,
          },
          
        ],
      }
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
      

    return (
        <div>
            <Line data={dataList} options={options}/>
        </div>
    )
}

export default ChartComponent
