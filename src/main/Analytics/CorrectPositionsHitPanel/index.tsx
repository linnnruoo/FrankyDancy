import React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import _ from 'lodash'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'
import { Movement } from 'common/models'
import socket from 'configs/socket'
import * as events from 'common/events'

let tempPositionData: number[] = [0, 0, 0]
let tempLabels: string[] = []

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    // xAxes: [
    //   {
    //     display: false,
    //   },
    // ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  tooltips: {
    enabled: false,
  },
}

interface Props {
  dancerNames: string[]
}

/**
 * Unable to update the chart data with the dancer names loaded
 * as the socket instance is called upon component mounted to the page
 * the original chart data instance is then taken
 */
const CorrectPositionsHitPanel: React.FC<Props> = ({ dancerNames }) => {
  let chartRef: Bar

  const getChartData = () => {
    return {
      labels: tempLabels,
      datasets: [
        {
          borderWidth: 2,
          backgroundColor: [MINT, VIOLET, PUMPKIN],
          borderColor: [MINT, VIOLET, PUMPKIN],
          data: tempPositionData,
        },
      ],
    }
  }

  const [chartData, setChartData] = React.useState(getChartData())

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      // update positions
      const predictedPosition = newMovement.position
      const correctPosition = newMovement.correctPosition
      if (predictedPosition !== correctPosition) {
        // call an action to store the wrong positions for the sider panel
      }
      _.map(predictedPosition, (pos, i) => {
        if (pos === correctPosition[i]) {
          tempPositionData[i] += 1
        }
      })
    })

    const interval = setInterval(() => {
      setChartData(getChartData())
      chartRef.chartInstance.update()
    }, 1000)

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
      clearInterval(interval)
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  const updateChartLabels = () => {
    tempLabels = dancerNames
    setChartData(getChartData())
    chartRef.chartInstance.update()
  }

  React.useEffect(updateChartLabels, [dancerNames])

  return (
    <Card width="30%">
      <Stack vertical gutter={Gutter.SMALL}>
        <Title>Correct Positions Hit</Title>
        <ChartContainer>
          <Bar
            data={chartData}
            options={chartOptions}
            ref={(ref) => {
              if (ref) {
                chartRef = ref
              }
            }}
          />
        </ChartContainer>
      </Stack>
    </Card>
  )
}

const ChartContainer = styled(Stack)`
  canvas {
    width: 100% !important;
    min-height: 200px !important;
    height: 200px !important;
  }
`
export default CorrectPositionsHitPanel
