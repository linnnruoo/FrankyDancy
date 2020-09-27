import React from 'react'

import Card from 'components/Card'
import Stack from 'components/Stack'

const CorrectMoves: React.FC<{}> = () => {
  const [data, setData] = React.useState({})

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return <Card width="70%">Correct Move</Card>
}

export default CorrectMoves
