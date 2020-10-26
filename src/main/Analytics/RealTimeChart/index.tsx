import React from 'react'

import Card from 'components/Card'
import { ACCELEROMETER, DATATYPE } from 'common/sensor'

import Chart from './Chart'
import DancerPanel from './DancerPanel'
import SensorDataSelect from './SensorSelect'

interface Props {
  toReset: boolean
  setReset: (reset: boolean) => void
}

const RealTimeChart: React.FC<Props> = ({ toReset, setReset }) => {
  const [sensorType, selectSensorType] = React.useState(ACCELEROMETER)
  const [dataType, selectDataType] = React.useState(DATATYPE.X)

  return (
    <Card width="100%" style={{ position: 'relative', padding: 0 }}>
      <DancerPanel />
      <SensorDataSelect
        sensorType={sensorType}
        dataType={dataType}
        selectSensorType={selectSensorType}
        selectDataType={selectDataType}
      />
      <Chart
        toReset={toReset}
        setReset={setReset}
        sensorType={sensorType}
        dataType={dataType}
      />
    </Card>
  )
}

export default RealTimeChart
