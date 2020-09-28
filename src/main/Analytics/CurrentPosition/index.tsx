import React from 'react'

import Card from 'components/Card'
import Stack from 'components/Stack'
import { Title } from 'components/Typography'

const CurrentPosition: React.FC<{}> = () => {
  const [position, setPosition] = React.useState([0, 0, 0])

  const fetchCurrentPosition = () => {}

  React.useEffect(fetchCurrentPosition, [])

  /**
   * @todo: get the user profile photos, display them accordingly
   * @todo: get the current dance session -> dance info
   * @todo: map the position to user
   */
  return (
    <Card width="60%">
      <Title>Current Position</Title>
    </Card>
  )
}

export default CurrentPosition
