import React from 'react'

import Card from 'components/Card'
import { ACCELEROMETER, DATATYPE, GYROSCOPE } from 'common/sensor'

import Chart from './Chart'
import DancerPanel from './DancerPanel'
import SensorDataSelect from './SensorSelect'
import { DancerProfile } from 'common/models'

interface Props {
  dancerProfiles: Dict<DancerProfile>
  toReset: boolean
  setReset: (reset: boolean) => void
}

const RealTimeChart: React.FC<Props> = ({
  dancerProfiles,
  toReset,
  setReset,
}) => {
  const [sensorType, selectSensorType] = React.useState(GYROSCOPE)
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
        dancerProfiles={dancerProfiles}
        toReset={toReset}
        setReset={setReset}
        sensorType={sensorType}
        dataType={dataType}
      />
    </Card>
  )
}

export default RealTimeChart
