import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-streaming'

const Chartjs: React.FC = () => {
  const [data, setData] = React.useState([1, 2, 3, 5])

  return (
    <Line
      type="line"
      data={{
        datasets: [
          {
            label: 'user 1',
            fill: false,
            data: [],
          },
        ],
      }}
      options={{
        scales: {
          xAxes: [
            {
              type: 'realtime',
              realtime: {
                onRefresh: (chart: any) => {
                  chart.data.datasets.forEach((dataset: any) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: Math.random(),
                    })
                  })
                },
                delay: 1000,
              },
            } as any,
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: false,
        },
      }}
    />
  )
}

export default Chartjs
