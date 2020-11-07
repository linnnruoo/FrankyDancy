/**
 * https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
 * https://medium.com/@oxygenna/real-time-cryptocurrency-visualisations-using-react-websockets-and-chartjs-e4a76132a862
 */
import React from 'react'
import { ChartData, Line } from 'react-chartjs-2'
import styled from 'styled-components'
import _ from 'lodash'

import socket from 'configs/socket'
import * as events from 'common/events'
import Stack from 'components/Stack'
import { Sensor } from 'common/models'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'
import { ACCELEROMETER, DATATYPE } from 'common/sensor'

let gyroData: any = [
  { x: [], y: [], z: [] },
  { x: [], y: [], z: [] },
  { x: [], y: [], z: [] },
]

let acceleroData: any = [
  { x: [], y: [], z: [] },
  { x: [], y: [], z: [] },
  { x: [], y: [], z: [] },
]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: 'time',
        display: false,
        ticks: {
          autoSkip: true,
          display: false,
        },
        gridlines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: { display: false },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
}

interface Props {
  toReset: boolean
  setReset: (reset: boolean) => void
  sensorType: string
  dataType: DATATYPE
}

const Chart: React.FC<Props> = ({
  toReset,
  setReset,
  sensorType,
  dataType,
}) => {
  const getChartData = () => {
    // const dancersData = getDancersData()
    let dancersData: any
    if (sensorType === ACCELEROMETER) {
      dancersData = acceleroData
    } else {
      dancersData = gyroData
    }

    return {
      datasets: [
        {
          label: '1',
          lineTension: 0.5,
          fill: false,
          data: dancersData[0][dataType],
          borderColor: MINT,
        },
        {
          label: '2',
          lineTension: 0.5,
          fill: false,
          data: dancersData[1][dataType],
          borderColor: VIOLET,
        },
        {
          label: '3',
          lineTension: 0.5,
          fill: false,
          data: dancersData[2][dataType],
          borderColor: PUMPKIN,
        },
      ],
    }
  }

  // Hardcode 3 datasets input
  const [chartData, setChartData] = React.useState<ChartData<Chart.ChartData>>(
    getChartData(),
  )

  const fetchSensorData = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
      // pipe different sensor data into the corresponding pos
      const indexPos = sensor.dancerNo - 1
      const now = new Date()

      gyroData[indexPos] = {
        x: [
          ...gyroData[indexPos].x,
          { x: now, y: _.get(sensor, ['gyroscope', 'x'], 0) },
        ],
        y: [
          ...gyroData[indexPos].y,
          { x: now, y: _.get(sensor, ['gyroscope', 'y'], 0) },
        ],
        z: [
          ...gyroData[indexPos].z,
          { x: now, y: _.get(sensor, ['gyroscope', 'z'], 0) },
        ],
      }
      acceleroData[indexPos] = {
        x: [
          ...acceleroData[indexPos].x,
          { x: now, y: _.get(sensor, ['accelerometer', 'x'], 0) },
        ],
        y: [
          ...acceleroData[indexPos].y,
          { x: now, y: _.get(sensor, ['accelerometer', 'y'], 0) },
        ],
        z: [
          ...acceleroData[indexPos].z,
          { x: now, y: _.get(sensor, ['accelerometer', 'z'], 0) },
        ],
      }

      if (gyroData[indexPos].x.length > 20) {
        gyroData[indexPos].x.shift()
        gyroData[indexPos].y.shift()
        gyroData[indexPos].z.shift()
        acceleroData[indexPos].x.shift()
        acceleroData[indexPos].y.shift()
        acceleroData[indexPos].z.shift()
      }
    })

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchSensorData, [])

  const createNewInterval = () => {
    const interval = setInterval(() => {
      setChartData({
        ...chartData,
        ...getChartData(),
      })
    }, 30)

    return () => {
      clearInterval(interval)
    }
  }

  React.useEffect(createNewInterval, [dataType, sensorType])
  // To clear all the existing sensor datadata stored
  const resetSensorData = () => {
    if (toReset) {
      gyroData = [
        { x: [], y: [], z: [] },
        { x: [], y: [], z: [] },
        { x: [], y: [], z: [] },
      ]

      acceleroData = [
        { x: [], y: [], z: [] },
        { x: [], y: [], z: [] },
        { x: [], y: [], z: [] },
      ]
      setReset(false)
    }
  }

  React.useEffect(resetSensorData, [toReset])

  return (
    <>
      <Stack
        vertical
        style={{ width: '100%', height: 'auto', padding: '40px 40px 30px' }}
      >
        <ChartContainer>
          <Line data={chartData} options={chartOptions} />
        </ChartContainer>
      </Stack>
    </>
  )
}

const ChartContainer = styled(Stack)`
  canvas {
    width: 100% !important;
    min-height: 300px !important;
    height: 300px !important;
  }
`

export default Chart
