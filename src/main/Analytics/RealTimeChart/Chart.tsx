/**
 * https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
 * https://medium.com/@oxygenna/real-time-cryptocurrency-visualisations-using-react-websockets-and-chartjs-e4a76132a862
 */
import React from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

import socket from 'configs/socket'
import * as events from 'common/events'
import Stack from 'components/Stack'
import { Sensor } from 'common/models'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'

let dancersData: Array<Array<{ x: string; y: number }>> = [[], [], []] // lol

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: 'time',
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
}

const Chart: React.FC<Props> = ({ toReset, setReset }) => {
  const getChartData = () => {
    return {
      // labels: sensorLabels,
      type: 'line',
      datasets: [
        {
          label: '1',
          lineTension: 0.5,
          fill: false,
          data: dancersData[0],
          borderColor: MINT,
        },
        {
          label: '2',
          lineTension: 0.5,
          fill: false,
          data: dancersData[1],
          borderColor: VIOLET,
        },
        {
          label: '3',
          lineTension: 0.5,
          fill: false,
          data: dancersData[2],
          borderColor: PUMPKIN,
        },
      ],
    }
  }

  // Hardcode 3 datasets input
  const [chartData, setChartData] = React.useState(getChartData())

  const fetchSensorData = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
      const value = sensor.accelerometer.x
      // pipe different sensor data into the corresponding pos
      const indexPos = sensor.dancerNo - 1

      dancersData[indexPos] = [
        ...dancersData[indexPos],
        { x: sensor.date, y: value },
      ]

      // TODO find the dancer that has max length
      // if that dancer is the current dancer, shift

      if (dancersData[indexPos].length >= 50) {
        dancersData[indexPos].shift()
      }
    })

    // set new label and data
    const interval = setInterval(() => {
      // pip different sensor data into the corresponding dancer pos
      setChartData(getChartData())
    }, 30)

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
      clearInterval(interval)
    }
  }

  React.useEffect(fetchSensorData, [])

  // To clear all the existing sensor datadata stored
  const resetSensorData = () => {
    if (toReset) {
      dancersData = [[], [], []]
      setReset(false)
    }
  }

  React.useEffect(resetSensorData, [toReset])

  return (
    <Stack
      vertical
      style={{ width: '100%', height: 'auto', padding: '40px 40px 30px' }}
    >
      <ChartContainer>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
    </Stack>
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
