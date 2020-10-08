import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'store/rootReducer'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import { groupActiveDancerProfilesByDancerNo } from 'store/dance/selector'

import AvatarCard from './AvatarCard'

type Props = CombinedProps<typeof mapStateToProps, {}> & OwnProps

interface OwnProps {
  position: number[]
}

const CurrentPosition: React.FC<Props> = ({
  position,
  dancerProfilesByDancerNo,
}) => {
  const getDancerProfile = (index: number) => dancerProfilesByDancerNo[index]
  return (
    <Card width="60%">
      <Stack vertical gutter={Gutter.AVERAGE}>
        <Title>Current Position</Title>
        <Stack gutter={Gutter.SMALL} center>
          <AvatarCard dancerProfile={getDancerProfile(position[0])} />
          <AvatarCard dancerProfile={getDancerProfile(position[1])} />
          <AvatarCard dancerProfile={getDancerProfile(position[2])} />
        </Stack>
      </Stack>
    </Card>
  )
}

const mapStateToProps = (s: RootState) => ({
  dancerProfilesByDancerNo: groupActiveDancerProfilesByDancerNo(s),
})

export default connect(mapStateToProps)(CurrentPosition)
