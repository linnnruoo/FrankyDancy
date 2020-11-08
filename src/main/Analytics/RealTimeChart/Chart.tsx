/**
 * https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
 * https://medium.com/@oxygenna/real-time-cryptocurrency-visualisations-using-react-websockets-and-chartjs-e4a76132a862
 */
import React from 'react'
import { ChartData, Line } from 'react-chartjs-2'
import styled from 'styled-components'

import socket from 'configs/socket'
import * as events from 'common/events'
import Stack from 'components/Stack'
import { Sensor } from 'common/models'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'
import { ACCELEROMETER, DATATYPE } from 'common/sensor'
import { getMinuteSecondString } from 'utilities/datetime'

// to see who do a bigger move
let magnitudeData: any = [[], [], []]
let magnitudeDataWRTTime: any = [[], [], []] // see whos slower
let startTime: any = [null, null, null]
let firstMovementReceived: boolean = false
let firstStartTime: Date

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        type: 'time',
        // display: false,
        time: {
          // stepSize: ,
          unit: 'second' as any,
          parser: 'mm:ss',
          displayFormats: {
            second: 'mm:ss',
          },
        },
        ticks: {
          autoSkip: true,
          display: true,
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
      dancersData = magnitudeData
    } else {
      dancersData = magnitudeDataWRTTime
    }

    return {
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
  const [chartData, setChartData] = React.useState<ChartData<Chart.ChartData>>(
    getChartData(),
  )

  const fetchSensorData = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
      // detect if its new data?
      if (!firstMovementReceived) {
        firstStartTime = new Date(sensor.date)
        firstMovementReceived = true
      }

      // pipe different sensor data into the corresponding pos
      const indexPos = sensor.dancerNo - 1

      if (!startTime[indexPos]) {
        startTime[indexPos] = new Date(sensor.date)
      }

      const now = new Date(sensor.date)

      const timelapseWRTDancer = getMinuteSecondString(now, startTime[indexPos])
      const timelapseWRTDance = getMinuteSecondString(now, firstStartTime)

      const { x, y, z } = sensor.accelerometer
      const magnitude = Math.sqrt(x * x + y * y + z * z)

      magnitudeData[indexPos] = [
        ...magnitudeData[indexPos],
        { x: timelapseWRTDancer, y: magnitude },
      ]
      magnitudeDataWRTTime[indexPos] = [
        ...magnitudeDataWRTTime[indexPos],
        { x: timelapseWRTDance, y: magnitude },
      ]

      if (magnitudeData[indexPos].length > 20) {
        magnitudeData[indexPos].shift()
        magnitudeDataWRTTime[indexPos].shift()
      }
    })

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  const fetchResetFlag = () => {
    socket.on(events.MOVE_RESET_EVENT, () => {
      magnitudeData = [[], [], []]
      magnitudeDataWRTTime = [[], [], []]
      startTime = [null, null, null]
    })

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchSensorData, [])
  React.useEffect(fetchResetFlag, [])

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
      magnitudeData = [[], [], []]
      magnitudeDataWRTTime = [[], [], []]
      setReset(false)
    }
  }

  React.useEffect(resetSensorData, [toReset])

  // TODO: display 'X is the slowest, Y is the fastest', 'X did the bigger move'
  // TODO: one chart -> time series to show whos slowest whos fastest TIME GRAPH
  // TODO: 2nd chart -> measure dancer1,2,3 start, then get corresponding time diff for subsequent moves -> MAGNITUDE GRAPH
  // then ?? seconds later, clear all the data?
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
    min-height: 400px !important;
    height: 300px !important;
  }
`

export default Chart
