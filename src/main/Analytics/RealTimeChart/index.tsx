import React from 'react'

import Card from 'components/Card'
import { Sensor, SensorReading } from 'common/models'

import Chartjs from './ChartjsTest'

interface NewSensorData {
  dancerNo: number
  accelerometer: SensorReading
  gyroscope: SensorReading
  duration: string
}

interface Props {}

const RealTimeChart: React.FC<Props> = () => {
  // TODO hardcode 3 datasets
  const [sensordata1, setSensorData] = React.useState<any[]>([
    {
      dancerNo: 1,
      accelerometer: { x: 2, y: 3, z: 12 },
      gyroscope: { x: 2, y: 3, z: 12 },
      duration: '00:00',
    },
  ])

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    <>
      <Card width="100%">
        <Chartjs />
      </Card>
    </>
  )
}

export default RealTimeChart
