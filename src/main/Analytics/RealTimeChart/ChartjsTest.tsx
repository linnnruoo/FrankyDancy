import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-streaming'
import _ from 'lodash'

import * as events from 'common/events'
import socket from 'configs/socket'
import { getHourSecond } from 'utilities/datetime'
import { Sensor } from 'common/models'

const Chartjs: React.FC = () => {
  const startTime = Date.now()

  const [sensorData, setSensorData] = React.useState<any[]>([])
  const [rawData, setData] = React.useState<Array<{ x: string; y: number }>>([])

  const [newData, setNewData] = React.useState<number>()

  /**
   * @todo: able to split into x,y,z and accelertomet / gyroscope readings
   */
  const fetchData = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
      console.log('received', sensor)
      setNewData(sensor.accelerometer.x)
    })
  }

  React.useEffect(fetchData, [])

  console.log('re-rendered ?????')
  return (
    <Line
      type="line"
      data={{
        datasets: [
          {
            label: 'user 1',
            fill: false,
            // data: _.map(sensorData, (sensor) => {
            //   console.log('ARGH', sensor)
            //   return {
            //     y: _.get(sensor, ['accelerometer', 'y'], 0),
            //     x: Date.now(),
            // }
            // }),
            data: [],
          },
          // { label: 'user2', fill: false, data: [] },
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
                      y: newData,
                    })
                  })
                },
                delay: 2000,
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
