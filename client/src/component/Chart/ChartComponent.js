import React from 'react'
import { Line } from 'react-chartjs-2'
  // const {data} = props;
const colorArray={
  red : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  blue : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  green : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  orange : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  yellow : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  purple : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
  },
  brown : {
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor : 'rgb(255, 0, 0,0.2)'
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
            label: '어망',
            data: data.map(item=>{return item.col_fishing_net}),
            fill: false,
            backgroundColor: colorArray.red.backgroundColor,
            borderColor: colorArray.red.borderColor,
          },
          {
            label: '고철류',
            data: data.map(item=>{return item.col_scrap}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: '그물',
            data: data.map(item=>{return item.col_nettrap}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: '로프',
            data: data.map(item=>{return item.col_rope}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: '기타',
            data: data.map(item=>{return item.col_etc}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: '수거량',
            data: data.map(item=>{return item.col_amount}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: '조사량',
            data: data.map(item=>{return item.inv_amount}),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          }
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
