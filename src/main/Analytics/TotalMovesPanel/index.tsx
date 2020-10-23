import React from 'react'
import _ from 'lodash'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Move, { getMoveKeys, MoveName } from 'common/moves'
import ProgressBar from 'components/ProgressBar'
import { Movement } from 'common/models'
import socket from 'configs/socket'
import * as events from 'common/events'

const moveKeys = getMoveKeys()

const getInitialMovesCounts = () =>
  _.reduce(
    moveKeys,
    (collection, moveKey, _) => {
      collection[moveKey] = 0
      return collection
    },
    {},
  )

let tempMoveCounts = getInitialMovesCounts()
let tempMaxCount = 0

const TotalMovesPanel: React.FC = () => {
  const [moveCounts, setMoveCounts] = React.useState(tempMoveCounts)
  const [maxCount, setMaxCount] = React.useState(tempMaxCount)

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      const moveKey = Move[newMovement.move]

      tempMoveCounts[moveKey] = tempMoveCounts[moveKey] + 1
      tempMaxCount = Math.max(tempMoveCounts[moveKey], tempMaxCount)
      setMoveCounts({
        ...moveCounts,
        [moveKey]: tempMoveCounts[moveKey],
      })
      setMaxCount(tempMaxCount)
    })

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  const getPercentage = (count: number) => {
    if (maxCount === 0) {
      return 0
    }
    return Math.round((count / maxCount) * 100)
  }

  return (
    <Card width="70%">
      <Stack vertical gutter={Gutter.SMALL}>
        <Title>Total Moves</Title>
        <Stack fillParentWidth justifyContent="space-around">
          <Stack fillParentWidth vertical>
            {_.map(moveKeys.slice(0, 4), (moveKey: Move) => {
              const moveName = MoveName[moveKey]
              return (
                <Stack key={moveKey} vertical>
                  <Text>{moveName}</Text>
                  <ProgressBar
                    percent={getPercentage(moveCounts[moveKey])}
                    count={moveCounts[moveKey]}
                  />
                </Stack>
              )
            })}
          </Stack>
          <Stack fillParentWidth vertical>
            {_.map(moveKeys.slice(4, 8), (moveKey: Move) => {
              const moveName = MoveName[moveKey]
              return (
                <Stack key={moveKey} vertical>
                  <Text>{moveName}</Text>
                  <ProgressBar
                    percent={getPercentage(moveCounts[moveKey])}
                    count={moveCounts[moveKey]}
                  />
                </Stack>
              )
            })}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default TotalMovesPanel
