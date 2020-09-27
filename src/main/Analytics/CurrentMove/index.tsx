import React from 'react'

import Card from 'components/Card'
import Stack from 'components/Stack'

const CurrentMove: React.FC<{}> = () => {
  const [data, setData] = React.useState({})

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    // <Stack fillParentWidth>
    <Card width="40%">Current Move</Card>
    // </Stack>
  )
}

export default CurrentMove
