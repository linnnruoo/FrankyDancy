import React from 'react'
import { Select as AntSelect } from 'antd'
import styled from 'styled-components'

import Stack, { Gutter } from 'components/Stack'
import { ACCELEROMETER, DATATYPE, GYROSCOPE } from 'common/sensor'

const { Option } = AntSelect

interface Props {
  sensorType: string
  dataType: DATATYPE
  selectSensorType: (sensorType: string) => void
  selectDataType: (dataType: DATATYPE) => void
}

const SensorDataSelect: React.FC<Props> = ({
  sensorType,
  dataType,
  selectSensorType,
  selectDataType,
}) => {
  return (
    <SelectContainer>
      <Stack gutter={Gutter.SMALL}>
        <Select
          defaultValue={sensorType}
          onChange={(sensorType) => {
            const newSelection = sensorType as string
            selectSensorType(newSelection)
          }}
        >
          <Option value={ACCELEROMETER}>Accelerometer</Option>
          <Option value={GYROSCOPE}>Gyroscope</Option>
        </Select>
        <Select
          defaultValue={dataType}
          onChange={(dataType) => {
            const newSelection = dataType as DATATYPE
            selectDataType(newSelection)
          }}
        >
          <Option value={DATATYPE.X}>x</Option>
          <Option value={DATATYPE.Y}>y</Option>
          <Option value={DATATYPE.Z}>z</Option>
        </Select>
      </Stack>
    </SelectContainer>
  )
}

const SelectContainer = styled(Stack)`
  top: 15px;
  right: 20px;
  position: absolute;
`

const Select = styled(AntSelect)`
  .ant-select-selector {
    min-width: 150px !important;
    box-shadow: 0px 1px 5px #c7c7c7 !important;
    border: 1px solid #000 !important;
  }
`

export default SensorDataSelect
