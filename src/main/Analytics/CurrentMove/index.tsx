import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Text, Title } from 'components/Typography'
import { MoveUrl } from 'common/moves'

const CurrentMove: React.FC<{}> = () => {
  const [move, setMove] = React.useState()

  const fetchNewMove = () => {}

  React.useEffect(fetchNewMove, [])

  /**
   * @todo: map move number to moves png
   */
  return (
    <Card width="40%">
      <Stack vertical gutter={Gutter.AVERAGE}>
        <Title>Current Move</Title>
        <Stack center>
          <Stack vertical center gutter={Gutter.SMALL}>
            <img width="80%" src={MoveUrl.Elbowlock} alt="test" />
            <Text>Loading...</Text>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default CurrentMove
