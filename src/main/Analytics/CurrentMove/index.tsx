import React from 'react'
import _ from 'lodash'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Move, { getMoveName, getMoveUrl } from 'common/moves'
import { DancerProfile, Movement } from 'common/models'
import * as events from 'common/events'
import socket from 'configs/socket'
import AvatarCard from '../CurrentPosition/AvatarCard'
import Avatar from 'components/Avatar'
import { Spin } from 'antd'

interface Props {
  dancerProfiles: Dict<DancerProfile>
}

const CurrentMove: React.FC<Props> = ({ dancerProfiles }) => {
  const [currMoves, setMove] = React.useState<Move[]>()

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      setMove(newMovement.move)
    })
    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  const renderMove = () => {
    if (currMoves) {
      return _.map(currMoves, (move, index) => {
        return (
          <Stack center vertical gutter={Gutter.SMALL}>
            <Avatar
              src={dancerProfiles[index + 1].url}
              alt={dancerProfiles[index + 1].name}
              width={'50%'}
            />
            <Stack center vertical>
              <img
                src={getMoveUrl(move)}
                alt="test"
                style={{ maxHeight: 100, minHeight: 100, width: 'auto' }}
              />
              <Text>{getMoveName(move)}</Text>
            </Stack>
          </Stack>
        )
      })
    }
    return <Spin size="large" />
  }

  return (
    <Card width="45%">
      <Stack fillParentHeight vertical gutter={Gutter.AVERAGE}>
        <Title>Current Move</Title>
        <Stack fillParentHeight center>
          <Stack center gutter={Gutter.SMALL}>
            {renderMove()}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CurrentMove
