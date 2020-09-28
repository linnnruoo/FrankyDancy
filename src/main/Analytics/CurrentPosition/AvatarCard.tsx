import React from 'react'

import Stack, { Gutter } from 'components/Stack'
import Avatar from 'components/Avatar'
import { Text } from 'components/Typography'
import { User } from 'common/models'

interface Props {
  user?: User
}

const AvatarCard: React.FC<Props> = ({ user }) => {
  const renderUser = () => {
    if (user) {
      return (
        <>
          <Avatar src={user.url} alt={user.name} width={'80%'} />
          <Text>{user.name}</Text>
        </>
      )
    }
    return (
      <>
        <Avatar
          src="https://tinyurl.com/y2oaju7c"
          alt="placeholder"
          width={'80%'}
        />
        <Text>Loading...</Text>
      </>
    )
  }

  return (
    <Stack vertical gutter={Gutter.SMALL} center>
      {renderUser()}
    </Stack>
  )
}

export default AvatarCard
