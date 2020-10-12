import React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
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

const CurrentPositionsHitPanel: React.FC<{}> = () => {
  const [chartData, setChartData] = React.useState({
    labels: ['User 1', 'User 2', 'User 3'],
    datasets: [
      {
        borderWidth: 2,
        backgroundColor: [MINT, VIOLET, PUMPKIN],
        borderColor: [MINT, VIOLET, PUMPKIN],
        data: [3, 11, 0],
      },
    ],
  })

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    <Card width="30%">
      <Stack vertical gutter={Gutter.SMALL}>
        <Title>Correct Positions Hit</Title>
        <ChartContainer>
          <Bar data={chartData} options={chartOptions} />
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

export default CurrentPositionsHitPanel
