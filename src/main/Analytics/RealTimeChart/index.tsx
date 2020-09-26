import React from 'react'
import io from 'socket.io-client'

import Card from 'components/Card'
import Stack from 'components/Stack'

const socket = io('http://localhost:5000')

const RealTimeChart: React.FC<{}> = () => {
  const fetchData = () => {
    socket.on('test123', () => {
      console.log('retrieved')
    })
  }

  React.useEffect(fetchData, [])

  return (
    <Stack center>
      <Card>TEST</Card>
    </Stack>
  )
}

export default RealTimeChart
