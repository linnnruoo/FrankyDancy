import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getMinuteSecondString } from 'utilities/datetime'
import { storeWrongMovementsInfo } from 'store/dance/actions'
import Card from 'components/Card'
import Stack, { Gutter } from 'components/Stack'
import { Title } from 'components/Typography'
import socket from 'configs/socket'
import * as events from 'common/events'
import { DancerProfile, Movement } from 'common/models'

import AvatarCard from './AvatarCard'

// to keep track of the wrong positions made
let firstMovementReceived: boolean = false // indicate if the first move received
let startTime: Date

type Props = CombinedProps<() => {}, typeof mapDispatchToProps> & OwnProps

interface OwnProps {
  dancerProfiles: Dict<DancerProfile>
}

const CurrentPosition: React.FC<Props> = ({
  dancerProfiles,
  storeWrongMovementsInfo,
}) => {
  const [position, setPosition] = React.useState([0, 0, 0])

  const checkForSameMove = (newMovement: Movement, startTime: Date) => {
    // call action to store the inconsistent move
    let isSameMove = true
    const { moves, move } = newMovement
    for (let i = 0; i < 3; i++) {
      if (moves[i] !== move) {
        isSameMove = false
      }
    }
    if (isSameMove === false) {
      const inconsistentMove = {
        moves,
        type: 'move',
        syncDelay: newMovement.syncDelay,
        time: getMinuteSecondString(new Date(newMovement.date), startTime),
      }
      storeWrongMovementsInfo(inconsistentMove)
    }
  }

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      // indicate if the first move received
      if (!firstMovementReceived) {
        startTime = new Date(newMovement.date)
        firstMovementReceived = true
      }

      // edge case for wakanda logout, no correct position will be sent
      if (
        !_.isEmpty(newMovement['position']) &&
        !_.isEmpty(newMovement['correctPosition'])
      ) {
        // update positions
        const predictedPosition = newMovement.position
          .split(' ')
          .map((strNum) => parseInt(strNum))

        const correctPosition = newMovement.correctPosition
          .split(' ')
          .map((strNum) => parseInt(strNum))

        setPosition(predictedPosition)

        if (!_.isEqual(predictedPosition, correctPosition)) {
          // call an action to store the wrong positions for the sider panel
          const wrongPosition = {
            position: predictedPosition,
            correctPosition,
            syncDelay: newMovement.syncDelay,
            type: 'position',
            time: getMinuteSecondString(new Date(newMovement.date), startTime), //todo minus off the start time based on the first signal move
          }
          storeWrongMovementsInfo(wrongPosition)
        }
      }

      checkForSameMove(newMovement, startTime)
    })

    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  const getDancerProfile = (index: number) => dancerProfiles[index]

  return (
    <Card width="55%">
      <Stack vertical gutter={Gutter.AVERAGE}>
        <Title>Current Position</Title>
        <Stack gutter={Gutter.SMALL} center>
          <AvatarCard dancerProfile={getDancerProfile(position[0])} />
          <AvatarCard dancerProfile={getDancerProfile(position[1])} />
          <AvatarCard dancerProfile={getDancerProfile(position[2])} />
        </Stack>
      </Stack>
    </Card>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      storeWrongMovementsInfo: storeWrongMovementsInfo,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(CurrentPosition)
