import React from 'react'

import Card from 'components/Card'

import Chartjs from './ChartjsTest'

interface Props {}

const RealTimeChart: React.FC<Props> = () => {
  // TODO hardcode 3 datasets

  const fetchData = () => {}

  React.useEffect(fetchData, [])

  return (
    <>
      <Card width="100%">
        <Chartjs />
      </Card>
    </>
  )
}

export default RealTimeChart
