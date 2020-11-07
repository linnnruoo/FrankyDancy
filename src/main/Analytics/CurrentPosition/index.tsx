import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import socket from 'configs/socket'
import * as events from 'common/events'
import { DancerProfile, Movement } from 'common/models'

import AvatarCard from './AvatarCard'

interface Props {
  dancerProfiles: Dict<DancerProfile>
}

const CurrentPosition: React.FC<Props> = ({ dancerProfiles }) => {
  const [position, setPosition] = React.useState([0, 0, 0])

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      setPosition(
        newMovement.position.split(' ').map((strNum) => parseInt(strNum)),
      )
    })
    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  const getDancerProfile = (index: number) => dancerProfiles[index]
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

export default CurrentPosition
