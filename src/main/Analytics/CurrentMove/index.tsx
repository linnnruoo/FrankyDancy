import React from 'react'
import _ from 'lodash'
import { Spin } from 'antd'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Avatar from 'components/Avatar'
import Move, { getMoveName, getMoveUrl } from 'common/moves'
import { DancerProfile, Movement } from 'common/models'
import * as events from 'common/events'
import socket from 'configs/socket'

interface Props {
  dancerProfiles: Dict<DancerProfile>
}

const CurrentMove: React.FC<Props> = ({ dancerProfiles }) => {
  const [currMoves, setMoves] = React.useState<Move[]>()

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      setMoves(newMovement.moves)
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
          <Stack center vertical gutter={Gutter.MINI}>
            <Avatar
              src={dancerProfiles[index + 1].url}
              alt={dancerProfiles[index + 1].name}
              width={'50%'}
            />
            <Stack center vertical>
              <img
                width="60%"
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
