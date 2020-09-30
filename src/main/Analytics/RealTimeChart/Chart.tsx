import React from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import socket from 'configs/socket'
import { getMinSec } from 'utilities/datetime'
import * as events from 'common/events'
import Stack from 'components/Stack'
import { Sensor } from 'common/models'

let sensorData: number[] = []
let dummyData: number[] = []
let sensorLabels: string[] = []

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: true,
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
}

interface Props {
  toReset: boolean
  setReset: (reset: boolean) => void
}

const Chart: React.FC<Props> = ({ toReset, setReset }) => {
  const now = moment(new Date())

  // Hardcode 3 datasets input
  const [chartData, setChartData] = React.useState({
    labels: [] as string[],
    datasets: [
      {
        type: 'line',
        label: 'User 1',
        lineTension: 0.5,
        fill: false,
        data: [] as number[],
        borderColor: '#4ed5ab',
      },
      {
        type: 'line',
        label: 'User 2',
        lineTension: 0.5,
        fill: false,
        data: [] as number[],
        borderColor: '#8a5fd6',
      },
    ],
  })

  const fetchSensorData = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
      const value = sensor.accelerometer.x
      const label = getMinSec(moment(sensor.date), now)

      // manage data
      sensorData = [...sensorData, value]
      // TODO: delete dummy data
      dummyData = [...dummyData, value + 0.1]
      if (sensorData.length >= 50) {
        sensorData.shift()
        dummyData.shift()
      }

      // manage labels
      sensorLabels = [...sensorLabels, label]
      if (sensorLabels.length >= 50) {
        sensorLabels.shift()
      }
    })

    // set new label and data
    const interval = setInterval(() => {
      const oldDataset = chartData.datasets[0]
      // TODO delete dummy
      const oldDummy = chartData.datasets[1]
      const newChartData = {
        ...chartData,
        datasets: [
          { ...oldDataset, data: sensorData },
          { ...oldDummy, data: dummyData },
        ],
        labels: sensorLabels,
      }
      setChartData(newChartData)
    }, 30)

    return () => {
      console.log('cleared')
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
      sensorData = []
      // TODO delete dummy
      dummyData = []
      sensorLabels = []
      setReset(false)
    }
  }

  React.useEffect(resetSensorData, [toReset])

  return (
    <Stack style={{ width: '100%', height: 'auto', padding: '40px 40px 30px' }}>
      <Line data={chartData} options={chartOptions} />
    </Stack>
  )
}

export default Chart
