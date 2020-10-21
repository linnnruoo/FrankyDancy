import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Move, { getMoveName, getMoveUrl } from 'common/moves'
import { Movement } from 'common/models'
import * as events from 'common/events'
import socket from 'configs/socket'

const CurrentMove: React.FC<{}> = () => {
  const [currMove, setMove] = React.useState<Move>()

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
    if (currMove) {
      return (
        <>
          <img width="80%" src={getMoveUrl(currMove)} alt="test" />
          <Text>{getMoveName(currMove)}</Text>
        </>
      )
    }
    return <Text>Loading...</Text>
  }

  return (
    <Card width="40%">
      <Stack vertical gutter={Gutter.AVERAGE}>
        <Title>Current Move</Title>
        <Stack center>
          <Stack vertical center gutter={Gutter.SMALL}>
            {renderMove()}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CurrentMove
