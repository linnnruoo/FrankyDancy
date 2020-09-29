import React from 'react'

import Card from 'components/Card'
import { Sensor, SensorReading } from 'common/models'

import * as events from 'common/events'
import socket from 'configs/socket'

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { getHourSecond } from 'utilities/datetime'
import ApexChart from './Test'
import Chartjs from './ChartjsTest'

interface NewSensorData {
  dancerNo: number
  accelerometer: SensorReading
  gyroscope: SensorReading
  duration: string
}

interface Props {
  // sensorData: Sensor[]
}

const RealTimeChart: React.FC<Props> = () => {
  // TODO hardcode 3 datasets
  const [sensordata1, setSensorData] = React.useState<any[]>([
    {
      dancerNo: 1,
      accelerometer: { x: 2, y: 3, z: 12 },
      gyroscope: { x: 2, y: 3, z: 12 },
      duration: '00:00',
    },
    {
      dancerNo: 1,
      accelerometer: { x: 1, y: 3, z: 12 },
      gyroscope: { x: 2, y: 3, z: 12 },
      duration: '00:01',
    },
  ])

  const fetchData = () => {
    // socket.on(events.SENSOR_INSERTION_EVENT, (sensor: Sensor) => {
    //   console.log('received', sensor)
    //   const parsedSensor:NewSensorData = {
    //     dancerNo: sensor.dancerNo,
    //     accelerometer: sensor.accelerometer,
    //     gyroscope: sensor.gyroscope,
    //     duration: getHourSecond(sensor.date)
    //   }
    //   setSensorData((currData: Sensor[]) => [...currData, parsedSensor])
    // })
  }

  React.useEffect(fetchData, [])

  return (
    <>
      <Card width="100%">
        {/* <LineChart width={400} height={400} data={sensorData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="dancerNo" stroke="#8884d8" />
        </LineChart> */}
        {/* <ApexChart /> */}
        <Chartjs />
      </Card>
    </>
  )
}

export default RealTimeChart
