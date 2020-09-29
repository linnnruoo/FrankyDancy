import React from 'react'
import Chart from 'react-apexcharts'

class ApexChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: 'series-2',
          data: [30, 12, 4, 23, 41, 60, 20, 91],
        },
        {
          name: 'series-3',
          data: [30, 23, 1],
        },
      ],
    }
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ApexChart
