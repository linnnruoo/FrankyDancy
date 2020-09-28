import React from 'react'

import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import AvatarCard from './AvatarCard'

const CurrentPosition: React.FC<{}> = () => {
  const [position, setPosition] = React.useState([0, 0, 0])

  const fetchCurrentPosition = () => {}

  React.useEffect(fetchCurrentPosition, [])

  /**
   * @todo: get the user profile photos, display them accordingly
   * @todo: get the current dance session -> dance info
   * @todo: map the position to user
   * @todo: map Dancer -> User
   */
  return (
    <Card width="60%">
      <Stack vertical gutter={Gutter.AVERAGE}>
        <Title>Current Position</Title>
        <Stack gutter={Gutter.SMALL} center>
          <AvatarCard />
          <AvatarCard />
          <AvatarCard />
        </Stack>
      </Stack>
    </Card>
  )
}

export default CurrentPosition
