/**
 * @todo: layout
 */
import React from 'react'
import { Layout } from 'antd'

import socket from 'configs/socket'
import * as events from 'common/events'
import { Movement } from 'common/models'
import Navbar from 'components/Navbar'
import SidePanel from 'components/SidePanel'
import Stack, { Gutter } from 'components/Stack'

import RealTimeChart from './RealTimeChart'
import CurrentMove from './CurrentMove'
import CurrentPosition from './CurrentPosition'
import CorrectPositions from './CorrectPositions'
import CorrectMoves from './CorrectMoves'

const Analytics: React.FC<{}> = () => {
  // reset sensor data
  const [toReset, setReset] = React.useState(false)
  /**
   * @todo: set up socket connections here?
   */
  const [currPosition, setPosition] = React.useState([0, 0, 0])
  const [currMove, setMove] = React.useState<number | undefined>(undefined)
  // const [predictedPos, setPredictedPos] = React.useState([0, 0, 0])
  // const [predictedMove, setPredictedMove] = React.useState<number | undefined>(
  // undefined,
  // )

  const fetchCurrentMovement = () => {
    socket.on(events.MOVEMENT_INSERTION_EVENT, (newMovement: Movement) => {
      const { move, position } = newMovement
      setPosition(position)
      setMove(move)
    })
    return () => {
      socket.emit('disconnect')
      socket.disconnect()
      socket.close()
    }
  }

  React.useEffect(fetchCurrentMovement, [])

  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar setReset={setReset} />
      <Layout>
        <SidePanel />
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Stack gutter={Gutter.SMALL} vertical>
            <Stack gutter={Gutter.SMALL}>
              <CurrentPosition position={currPosition} />
              <CurrentMove move={currMove} />
            </Stack>
            <RealTimeChart toReset={toReset} setReset={setReset} />
            <Stack gutter={Gutter.SMALL}>
              <CorrectPositions />
              <CorrectMoves />
            </Stack>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Analytics
