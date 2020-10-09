import React from 'react'

import Stack, { Gutter } from 'components/Stack'
import Avatar from 'components/Avatar'
import { Text } from 'components/Typography'
import { DancerProfile } from 'common/models'

interface Props {
  dancerProfile?: DancerProfile
}

const AvatarCard: React.FC<Props> = ({ dancerProfile }) => {
  const renderUser = () => {
    if (dancerProfile) {
      return (
        <>
          <Avatar
            src={dancerProfile.url}
            alt={dancerProfile.name}
            width={'80%'}
          />
          <Text>{dancerProfile.name}</Text>
        </>
      )
    }
    return (
      <>
        <Avatar
          src="https://i.imgur.com/3MvrSRQ.jpg"
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
