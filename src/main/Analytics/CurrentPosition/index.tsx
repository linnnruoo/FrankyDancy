import React from 'react'

import Card from 'components/Card'
import Stack from 'components/Stack'

const CurrentPosition: React.FC<{}> = () => {
  const [data, setData] = React.useState({})

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    // <Stack fillParentWidth>
    <Card width="60%">TEST</Card>
    // </Stack>
  )
}

export default CurrentPosition
