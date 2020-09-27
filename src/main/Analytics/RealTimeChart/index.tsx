import React from 'react'
import io from 'socket.io-client'

import Card from 'components/Card'
import Stack from 'components/Stack'

const socket = io('http://localhost:5000')

const RealTimeChart: React.FC<{}> = () => {
  const [data, setData] = React.useState({})

  const fetchData = () => {
    console.log('debug1')
    // subscribe to the server event
    // socket.on('new movement received', (data: any) => {
    //   console.log('retrieved', data)
    //   setData(data)
    // })
  }

  React.useEffect(fetchData, [])

  return <Card width="100%">TEST</Card>
}

export default RealTimeChart
