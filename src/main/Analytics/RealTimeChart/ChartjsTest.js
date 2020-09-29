import React from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import socket from 'configs/socket'
import * as events from 'common/events'
import Stack from 'components/Stack'
import { getMinSec } from 'utilities/datetime'

class ChartTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: moment(new Date()),
      chartData: {
        labels: [],
        datasets: [
          {
            type: 'line',
            label: 'user 1',
            lineTension: 0.5,
            fill: false,
            data: [],
            borderColor: '#98B9AB',
          },
        ],
      },
      chartOptions: {
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
      },
    }
  }

  componentDidMount = () => {
    socket.on(events.SENSOR_INSERTION_EVENT, (sensor) => {
      const value = sensor.accelerometer.x
      const label = getMinSec(moment(sensor.date), this.state.now)

      // manage data
      const oldData = this.state.chartData.datasets[0]
      const newData = { ...oldData }
      if (newData.data.length >= 20) {
        newData.data.shift()
      }
      newData.data.push(value)

      // manage labels
      const oldLabels = this.state.chartData.labels
      const newLabels = [...oldLabels]
      if (newLabels.length >= 20) {
        newLabels.shift()
      }
      newLabels.push(label)

      // set new label and data
      const newChartData = {
        ...this.state.chartData,
        datasets: [newData],
        labels: newLabels,
      }
      this.setState({ chartData: newChartData })
    })
  }

  componentWillUnmount = () => {
    socket.disconnect()
  }

  render() {
    return (
      <Stack style={{ width: '100%', height: 'auto' }}>
        <Line data={this.state.chartData} options={this.state.chartOptions} />
      </Stack>
    )
  }
}

export default ChartTest
