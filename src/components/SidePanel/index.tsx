import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import { RootState } from 'store/rootReducer'
import { getWrongPositionsCollection } from 'store/dance/selector'
import Stack, { Gutter } from 'components/Stack'
import Card from 'components/Card'
import { DancerProfile } from 'common/models'
import { Text, Title } from 'components/Typography'
import { RED } from 'common/colors'
import Avatar from 'components/Avatar'

const { Sider } = Layout

type Props = OwnProps & CombinedProps<typeof mapStateToProps, () => {}>

interface OwnProps {
  dancerProfiles: Dict<DancerProfile>
}

const SidePanel: React.FC<Props> = ({ dancerProfiles, wrongPositions }) => {
  const renderPositionGroup = (positions: number[]) => {
    return positions.map((dancerNo) => (
      <Avatar
        width={48}
        src={dancerProfiles[dancerNo].url}
        alt={dancerProfiles[dancerNo].name}
      />
    ))
  }
  return (
    <Sider style={{ background: '#f6f8ff', overflowY: 'auto' }} width={400}>
      <Stack style={{ margin: 20 }} vertical gutter={Gutter.REGULAR}>
        {wrongPositions.map((positionInfo) => {
          return (
            <Card>
              <Stack fillParentWidth vertical gutter={Gutter.SMALL}>
                <Stack gutter={Gutter.SMALL}>
                  <Title>Time: {positionInfo.time} - </Title>
                  <Title color={RED}>Wrong Position</Title>
                </Stack>
                <Stack alignItems="center" justifyContent="space-around">
                  <Stack alignItems="center" width="100px">
                    <Text>Correct:</Text>
                  </Stack>
                  <Stack center gutter={Gutter.EXTRA_SMALL}>
                    {renderPositionGroup(positionInfo.correctPosition)}
                  </Stack>
                </Stack>
                <Stack alignItems="center" justifyContent="space-around">
                  <Stack alignItems="center" width="100px">
                    <Text>Wrong:</Text>
                  </Stack>
                  <Stack center gutter={Gutter.EXTRA_SMALL}>
                    {renderPositionGroup(positionInfo.position)}
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </Sider>
  )
}

const mapStateToProps = (s: RootState) => ({
  wrongPositions: getWrongPositionsCollection(s),
})

export default connect(mapStateToProps)(SidePanel)
