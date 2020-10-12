import React from 'react'
import _ from 'lodash'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Move, { getMoveKeys, MoveName } from 'common/moves'
import ProgressBar from 'components/ProgressBar'

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

interface Props {
  currMove?: Move
}

const TotalMovesPanel: React.FC<Props> = ({ currMove }) => {
  const [moveCounts, setMoveCounts] = React.useState(tempMoveCounts)
  const [maxCount, setMaxCount] = React.useState(0)

  const getPercentage = (count: number) => {
    if (maxCount === 0) {
      return 0
    }
    return Math.round((count / maxCount) * 100)
  }

  const updateMoveCounts = () => {
    if (!currMove) {
      return
    }
    const moveKey = Move[currMove]
    tempMoveCounts[moveKey] = tempMoveCounts[moveKey] + 1
    setMoveCounts(tempMoveCounts)
    if (tempMoveCounts[moveKey] > maxCount) {
      setMaxCount(tempMoveCounts[moveKey])
    }
  }

  React.useEffect(updateMoveCounts, [currMove])

  return (
    <Card width="70%">
      <Stack vertical gutter={Gutter.SMALL}>
        <Title>Total Moves</Title>
        <Stack fillParentWidth justifyContent="space-around">
          <Stack fillParentWidth vertical>
            {_.map(moveKeys.slice(0, 4), (moveKey: Move) => {
              const moveName = MoveName[moveKey]
              return (
                <Stack vertical>
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
                <Stack vertical>
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
