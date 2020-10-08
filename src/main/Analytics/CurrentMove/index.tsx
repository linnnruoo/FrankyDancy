import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import Move, { getMoveName, getMoveUrl } from 'common/moves'

interface Props {
  move?: Move
}

const CurrentMove: React.FC<Props> = ({ move }) => {
  /**
   * @todo: map move number to moves png
   */
  const renderMove = () => {
    if (move) {
      return (
        <>
          <img width="80%" src={getMoveUrl(move)} alt="test" />
          <Text>{getMoveName(move)}</Text>
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
