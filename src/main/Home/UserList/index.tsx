import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Button, Checkbox, List } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import styled from 'styled-components'
import _ from 'lodash'

import { Dance, Dancer, User } from 'common/models'
import { RED, GREEN } from 'common/colors'
import * as routes from 'router/routes'
import Stack, { Gutter } from 'components/Stack'
import Card from 'components/Card'
import Avatar from 'components/Avatar'
import { Text } from 'components/Typography'

type Props = OwnProps & RouteComponentProps

interface OwnProps {
  users: Dict<User>
  activeDanceSession?: Dance
  activeDancers: Dict<Dancer>
  startDanceSession: (dancers: Dancer[]) => void
}

const UserList: React.FC<Props> = ({
  users,
  activeDanceSession,
  activeDancers,
  startDanceSession,
  history, // RouterProps
}) => {
  const [selectedUsers, selectUsers] = React.useState<string[]>([])

  const onCheckboxChange = (checked: boolean, userId: string) => {
    if (checked) {
      selectUsers([...selectedUsers, userId])
      return
    }
    const foundIndex = selectedUsers.findIndex((id) => id === userId)
    if (foundIndex > -1) {
      const newList = [...selectedUsers]
      newList.splice(foundIndex, 1)
      selectUsers(newList)
    }
    return
  }

  const onStartNewDanceSession = () => {
    const dancers = _.map(selectedUsers, (userId, index) => ({
      userId,
      beetleId: users[userId].beetleId,
      dancerNo: index + 1,
    }))
    startDanceSession(dancers)
    setTimeout(() => {
      history.push(routes.ANALYTICS)
    }, 1000)
  }

  const renderUserStatus = (userId: string) => {
    // Select users if no active dance section
    // If yes, display the active idle
    if (!activeDanceSession) {
      return (
        <Checkbox
          onChange={(e: CheckboxChangeEvent) =>
            onCheckboxChange(e.target.checked, userId)
          }
        />
      )
    }

    if (activeDancers[userId]) {
      return (
        <Text fontWeight="bold" color={GREEN}>
          Active
        </Text>
      )
    }
    return (
      <Text fontWeight="bold" color={RED}>
        Idle
      </Text>
    )
  }

  const renderActionButton = () => {
    if (activeDanceSession) {
      return (
        <Button onClick={() => history.push(routes.ANALYTICS)}>
          Navigate to Analytics page
        </Button>
      )
    }
    return (
      <Button
        disabled={selectedUsers.length === 0}
        onClick={onStartNewDanceSession}
      >
        Start Dancing
      </Button>
    )
  }

  return (
    <UserListCard>
      <List
        dataSource={_.values(users)}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <Stack
              fillParentWidth
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack center gutter={Gutter.REGULAR}>
                <Avatar width={32} src={user.url} alt={user.name} />
                <Text>{user.name}</Text>
              </Stack>
              {renderUserStatus(user._id)}
            </Stack>
          </List.Item>
        )}
      />
      <Stack center style={{ marginTop: 30 }}>
        {renderActionButton()}
      </Stack>
    </UserListCard>
  )
}

const UserListCard = styled(Card)`
  min-width: 400px;
`

export default withRouter(UserList)
