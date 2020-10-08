import React from 'react'

import Card from 'components/Card'

const CurrentPositions: React.FC<{}> = () => {
  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return <Card width="30%">Correct Positions</Card>
}

export default CurrentPositions
