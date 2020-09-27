import React from 'react'

import Card from 'components/Card'
import Stack from 'components/Stack'

const CurrentPositions: React.FC<{}> = () => {
  const [data, setData] = React.useState({})

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    // <Stack fillParentWidth>
    <Card width="30%">Correct Positions</Card>
    // </Stack>
  )
}

export default CurrentPositions
