import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'

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
        <Stack center></Stack>
      </Stack>
    </Card>
  )
}

export default CurrentMove
