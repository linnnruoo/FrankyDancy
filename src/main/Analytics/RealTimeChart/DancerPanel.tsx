import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import Stack, { Gutter } from 'components/Stack'
import { RootState } from 'store/rootReducer'
import { groupActiveDancerProfilesByDancerNo } from 'store/dance/selector'
import { Text } from 'components/Typography'
import { MINT, PUMPKIN, VIOLET } from 'common/colors'

type Props = CombinedProps<typeof mapStateToProps, {}>

const DancerPanel: React.FC<Props> = ({ dancerProfilesByDancerNo }) => {
  // retriece dancer info from datasets
  // map dancerNo -> fix color
  if (_.isEmpty(dancerProfilesByDancerNo)) {
    return <></>
  }

  return (
    <PanelContainer vertical gutter={Gutter.MINI}>
      <Stack gutter={Gutter.MINI} alignItems="center">
        <Legend color={MINT} />
        <Text>{_.get(dancerProfilesByDancerNo[1], 'name', '')}</Text>
      </Stack>
      <Stack gutter={Gutter.MINI} alignItems="center">
        <Legend color={VIOLET} />
        <Text>{_.get(dancerProfilesByDancerNo[2], 'name', '')}</Text>
      </Stack>
      <Stack gutter={Gutter.MINI} alignItems="center">
        <Legend color={PUMPKIN} />
        <Text>{_.get(dancerProfilesByDancerNo[3], 'name', '')}</Text>
      </Stack>
    </PanelContainer>
  )
}

const PanelContainer = styled(Stack)`
  top: 10px;
  left: 10px;
  background: #fff;
  box-shadow: 0px 1px 5px #c7c7c7;
  padding: 10px;
  border-radius: 8px;
  position: absolute;
  border: 1px solid #000;
  font-weight: 600;
`

const Legend = styled.div<{ color: string }>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: ${({ color }) => `${color}`};
`

const mapStateToProps = (s: RootState) => ({
  dancerProfilesByDancerNo: groupActiveDancerProfilesByDancerNo(s),
})

export default connect(mapStateToProps)(DancerPanel)
